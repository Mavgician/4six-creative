import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Film, HelpCircle } from 'lucide-react';
import Navbar from '@/layout/Navbar';
import Footer from '@/layout/Footer';
import { Button } from '@/components/ui/button';
import { stripHtmlAndDecode } from '@/lib/utils';
import { iPhoneFrame } from '@/assets/images';

export default function PortfolioDetailPage() {
  const { slug } = useParams();
  const [clientData, setClientData] = useState<any>(null);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!slug) return;

    fetch(`https://public-api.wordpress.com/rest/v1.1/sites/4sixcreativevercel.wordpress.com/posts/slug:${slug}`)
      .then(res => res.json())
      .then(post => {
        if (post && post.ID) {
          // Parse video URLs from post content
          const plainTextContent = post.content.replace(/<\/p>/g, "\n").replace(/<br\s*\/?>/g, "\n");
          const matches = plainTextContent.match(/https?:\/\/[^\s<"']+/g) || [];
          
          const formattedUrls = matches
            .map((url: string) => {
              let cleanUrl = url.replace(/<\/?[^>]+(>|$)/g, "").trim();
              if (cleanUrl.includes('instagram.com')) {
                if (cleanUrl.includes('?')) {
                  cleanUrl = cleanUrl.split('?')[0];
                }
                cleanUrl = cleanUrl.replace('/reels/', '/reel/');
                if (!cleanUrl.endsWith('embed/')) {
                  if (!cleanUrl.endsWith('/')) {
                    cleanUrl += '/';
                  }
                  cleanUrl += 'embed/';
                }
              }
              return cleanUrl;
            })
            .filter((url: string) => url.length > 0);

          // Deduplicate URLs
          const uniqueUrls = [...new Set(formattedUrls)] as string[];
          setVideoUrls(uniqueUrls);

          // Clean HTML content to remove raw URLs and their enclosing tags
          let cleanHtml = post.content;
          matches.forEach((url: string) => {
            const escapedUrl = url.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            // Target the <a> link wrapper, <figure> wrapper, or raw URL text
            const regex = new RegExp(`<a[^>]*>(?:(?!<\\/a>)[\\s\\S])*?${escapedUrl}[\\s\\S]*?<\\/a>|<figure[^>]*>(?:(?!<\\/figure>)[\\s\\S])*?${escapedUrl}[\\s\\S]*?<\\/figure>|${escapedUrl}`, 'g');
            cleanHtml = cleanHtml.replace(regex, '');
          });
          // Clean up trailing break tags and empty wrappers
          cleanHtml = cleanHtml.replace(/(?:<br\s*\/?>\s*)+<\/p>/gi, '</p>')
                               .replace(/<p>\s*<\/p>/g, '')
                               .replace(/<figure[^>]*>\s*<\/figure>/g, '');

          setClientData({
            ...post,
            content: cleanHtml
          });
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching client details:", err);
        setIsLoading(false);
      });
  }, [slug]);

  // Extract client industry from post categories
  const getIndustry = () => {
    if (!clientData || !clientData.categories) return 'Case Study';
    const validIndustries = [
      'Coaching & Education',
      'Beauty & Wellness',
      'Food & Hospitality',
      'Real Estate & Finance',
      'Professional Services',
      'Creative & Publishing'
    ];
    const found = Object.keys(clientData.categories).find(catName => {
      const decodedCat = catName.replace(/&amp;/g, '&');
      return validIndustries.some(vi => vi.toLowerCase() === decodedCat.toLowerCase());
    });
    if (found) {
      const decodedFound = found.replace(/&amp;/g, '&');
      return validIndustries.find(vi => vi.toLowerCase() === decodedFound.toLowerCase())!;
    }
    return 'Case Study';
  };

  return (
    <div className='min-h-screen bg-brand-light overflow-x-hidden relative'>
      {/* Global Paper Texture Overlay */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none opacity-40 mix-blend-multiply"
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}
      />
      
      <Navbar />

      <section className='pt-40 pb-16 px-6 bg-brand-light'>
        <div className='max-w-7xl mx-auto'>
          <Link to="/portfolio" className="inline-flex items-center gap-2 font-display font-bold uppercase text-sm tracking-widest text-brand-dark/60 hover:text-brand-orange transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back To Portfolio
          </Link>

          {isLoading ? (
            <div className="animate-pulse space-y-6 max-w-4xl">
              <div className="h-8 w-40 bg-brand-dark/10 rounded-full" />
              <div className="h-24 w-full bg-brand-dark/10 rounded-3xl" />
              <div className="h-12 w-2/3 bg-brand-dark/10 rounded-3xl" />
            </div>
          ) : !clientData ? (
            <div className="text-center py-24 bg-white creative-border rounded-[2.5rem] flex flex-col items-center justify-center gap-4">
              <HelpCircle className="w-16 h-16 text-brand-dark/20" />
              <h2 className="text-3xl font-display font-black uppercase text-brand-dark">Client Not Found</h2>
              <p className="text-brand-dark/50 font-bold uppercase tracking-widest">We couldn't retrieve this client project details.</p>
              <Link to="/portfolio">
                <Button className="creative-border-sm creative-border-hover mt-4">Return to Portfolio</Button>
              </Link>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className='max-w-7xl'
            >
              <div className='inline-block bg-brand-peach text-brand-dark border-2 border-brand-dark px-4 py-1 rounded-full font-bold mb-8 text-sm tracking-widest uppercase shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'>
                {getIndustry()}
              </div>
              <h1 className='text-[clamp(2.5rem,8vw,5.5rem)] font-display font-black uppercase tracking-tighter text-brand-dark leading-none mb-8'>
                {stripHtmlAndDecode(clientData.title)}
              </h1>
              <div 
                className='text-xl md:text-2xl text-brand-dark/70 leading-relaxed max-w-4xl font-sans mb-16 [&_p]:mb-4' 
                dangerouslySetInnerHTML={{ __html: clientData.content }} 
              />

              <h2 className="text-3xl font-display font-black uppercase text-brand-dark mb-8 tracking-tight">
                Project Showcase
              </h2>

              {videoUrls.length === 0 ? (
                <div className="text-center py-16 bg-white creative-border rounded-[2rem] flex flex-col items-center gap-4">
                  <Film className="w-12 h-12 text-brand-dark/20" />
                  <p className="text-brand-dark/40 font-bold uppercase tracking-widest">No showcase videos loaded yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videoUrls.map((url, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                      className="relative w-full max-w-[280px] mx-auto aspect-[900/1840] overflow-hidden bg-transparent"
                    >
                      {/* Screen container */}
                      <div className="absolute top-[2.3%] left-[5%] w-[90%] h-[95%] rounded-[2rem] sm:rounded-[2.2rem] overflow-hidden bg-brand-dark flex items-center justify-center">
                        <iframe
                          src={url}
                          title={`${stripHtmlAndDecode(clientData.title)} Video Showcase ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full border-none scale-[1.8] -translate-y-[-20%]"
                          scrolling="no"
                          allow="encrypted-media"
                        ></iframe>
                      </div>
                      {/* iPhone Frame PNG */}
                      <img
                        src={iPhoneFrame}
                        alt="iPhone Frame"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={1228}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
