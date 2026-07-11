/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Routes, Route, Link } from 'react-router-dom';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import FAQPage from './pages/FAQPage';
import Footer from '@/layout/Footer';
import Navbar from "@/layout/Navbar";
import { HeroSection } from '@/components/sections/HeroSection';
import { ServiceOverviewSection } from '@/components/sections/ServiceOverviewSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
// import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { VideoShowcaseSection } from '@/components/sections/VideoShowcaseSection';
import { CEOSection } from '@/components/sections/CEOSection';
import { TestimonialsSection, type TestimonialItem } from '@/components/sections/TestimonialsSection';
// import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { logoBlack } from '@/assets/images';
import {
  ArrowRight,
  Sparkles,
  Target,
  Send,
  Star,
  Smile,
  Globe,
  Rocket
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { stripHtmlAndDecode } from '@/lib/utils';

const Marquee = ({ items, speed = 20, reverse = false }: { items: string[], speed?: number, reverse?: boolean }) => {
  return (
    <div className="marquee-container bg-brand-dark py-4 border-y-4 border-brand-dark">
      <div className={`marquee-content ${reverse ? 'flex-row-reverse' : ''}`} style={{ animationDuration: `${speed}s` }}>
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="text-white font-display font-bold text-2xl uppercase tracking-widest">{item}</span>
            <Star className="ml-8 text-brand-orange fill-brand-orange w-6 h-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const defaultReels = [
    'https://www.instagram.com/reel/C0hn8OGuEk5/embed/',
    'https://www.instagram.com/reel/CmMnxhTOqiZ/embed/',
    'https://www.instagram.com/reel/DVJ7qwBEjSu/embed/',
    'https://www.instagram.com/reel/DO7EsRUDejI/embed/'
  ];
  const [portfolioReels, setPortfolioReels] = useState<string[]>(defaultReels);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch reels
    fetch('https://public-api.wordpress.com/rest/v1.1/sites/4sixcreativevercel.wordpress.com/posts?category=portfolio&tag=featured')
      .then(res => res.json())
      .then(data => {
        if (data.posts && data.posts.length > 0) {
          const urls = data.posts
            .map((post: any) => {
              // Extract URLs from the HTML post content
              const match = post.content.match(/https?:\/\/[^\s<"']+/);
              if (match) {
                let url = match[0];
                url = url.replace(/<\/?[?^>]+(>|$)/g, ""); // strip any html tags
                if (url.includes('instagram.com')) {
                  if (url.includes('?')) {
                    url = url.split('?')[0];
                  }
                  url = url.replace('/reels/', '/reel/');
                  if (!url.endsWith('embed/')) {
                    if (!url.endsWith('/')) {
                      url += '/';
                    }
                    url += 'embed/';
                  }
                }
                return url;
              }
              return null;
            })
            .filter((url: string | null) => url !== null);

          if (urls.length > 0) {
            setPortfolioReels(urls);
          }
        }
      })
      .catch(err => console.error("Error fetching reels from WordPress:", err));

    // Fetch testimonials
    fetch('https://public-api.wordpress.com/rest/v1.1/sites/4sixcreativevercel.wordpress.com/posts?category=testimonials')
      .then(res => res.json())
      .then(data => {
        if (data.posts && data.posts.length > 0) {
          const items = data.posts.map((post: any) => {
            // Strip HTML tags from excerpt for handle and role (e.g. "@handle | Role")
            const excerptText = stripHtmlAndDecode(post.excerpt);
            const parts = excerptText.split('|');
            const handle = parts[0]?.trim() || '';
            const role = parts.slice(1).map(p => p.trim()).filter(Boolean).join(' | ');
            // Strip HTML tags from content for the testimonial text
            const quoteText = stripHtmlAndDecode(post.content);

            return {
              name: stripHtmlAndDecode(post.title),
              handle: handle,
              role: role,
              quote: quoteText
            };
          });
          setTestimonials(items);
        }
      })
      .catch(err => console.error("Error fetching testimonials from WordPress:", err));
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white relative bg-brand-light overflow-x-hidden">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-brand-light flex items-center justify-center"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={logoBlack}
              alt="4SIX CREATIVE"
              className="w-[80%] max-w-2xl object-contain"
              fetchPriority="high"
              decoding="async"
              width={400}
              height={134}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Paper Texture Overlay */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none opacity-40 mix-blend-multiply"
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-brand-orange z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Floating CTA for Mobile */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <Link to="/contact#work-with-us">
            <Button
              className="rounded-full w-16 h-16 bg-brand-orange text-white creative-border shadow-xl flex items-center justify-center p-0"
            >
              <Send className="w-7 h-7" />
            </Button>
          </Link>
        </motion.div>
      </AnimatePresence>

      <Navbar onContactClick={scrollToContact} />

      <HeroSection onContactClick={scrollToContact} />

      {/* Marquee */}
      <Marquee items={["Social Media Management", "Influencer Marketing", "Content Strategy", "Visual Design", "Community Reviews", "Organic Marketing"]} speed={45} />

      {/* Trusted Industries Section */}
      <IndustriesSection />

      {/* Services Section - Bento Grid */}
      <section id="services" className="pt-24 pb-12 md:pb-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] mb-6 uppercase leading-none">Our Creative <br /><span className="text-brand-orange italic">Arsenal</span></h2>
              <p className="text-base sm:text-lg md:text-xl text-brand-dark/80">
                Lorem ipsum dolor sit. Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="bg-brand-lavender p-6 rounded-2xl creative-border-sm rotate-3 hidden md:block">
              <Rocket className="w-12 h-12 text-brand-dark" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Large Card: Full-Service Management */}
            <motion.a
              href="https://stan.store/troyiamonay"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-brand-lavender p-10 rounded-3xl creative-border relative overflow-hidden group block cursor-pointer"
            >
              <div className="relative z-10">
                <Badge className="bg-white text-brand-dark border-brand-dark mb-6">Most Popular</Badge>
                <h3 className="text-2xl md:text-5xl mb-6 uppercase">Full-Service <br />Management</h3>
                <p className="text-lg mb-8 max-w-md">Lorem ipsum dolor sit amet, consectetur adipiscing. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Button className="bg-brand-dark text-white creative-border-sm pointer-events-none">Get Started</Button>
              </div>
              <Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-brand-dark/10 group-hover:rotate-12 transition-transform duration-500" />
            </motion.a>

            {/* Card 2 - Social Media Marketing */}
            <motion.a
              href="https://stan.store/troyiamonay"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="bg-brand-peach p-10 rounded-3xl creative-border flex flex-col justify-between block cursor-pointer"
            >
              <div>
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 creative-border-sm">
                  <Smile className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-3xl mb-4 uppercase">Social Media <br />Marketing</h3>
                <p className="text-brand-dark/70">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
              </div>
              <ArrowRight className="mt-8 w-8 h-8 self-end" />
            </motion.a>

            {/* Card 3 - Content Creation */}
            <motion.a
              href="https://stan.store/troyiamonay"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="bg-brand-green p-10 rounded-3xl creative-border flex flex-col justify-between block cursor-pointer"
            >
              <div>
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 creative-border-sm">
                  <Sparkles className="w-7 h-7 text-brand-green" />
                </div>
                <h3 className="text-3xl mb-4 uppercase">Content <br />Creation</h3>
                <p className="text-brand-dark/70">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
              </div>
              <ArrowRight className="mt-8 w-8 h-8 self-end" />
            </motion.a>

            {/* Card 4 - Content Strategy */}
            <motion.a
              href="https://stan.store/troyiamonay"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="bg-brand-orange p-10 rounded-3xl creative-border text-white flex flex-col justify-between block cursor-pointer"
            >
              <div>
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 creative-border-sm">
                  <Target className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-3xl mb-4 uppercase">Content <br />Strategy</h3>
                <p className="text-white/80">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.</p>
              </div>
              <ArrowRight className="mt-8 w-8 h-8 self-end text-white" />
            </motion.a>

            {/* Card 5 - Marketing Campaigns */}
            <motion.a
              href="https://stan.store/troyiamonay"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="bg-brand-lavender p-10 rounded-3xl creative-border flex flex-col justify-between block cursor-pointer"
            >
              <div>
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 creative-border-sm">
                  <Rocket className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-3xl mb-4 uppercase">Marketing <br />Campaigns</h3>
                <p className="text-brand-dark/70">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
              </div>
              <ArrowRight className="mt-8 w-8 h-8 self-end" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* What We Do section CTA */}
      <ServiceOverviewSection />

      {/* <PortfolioSection /> */}

      <ProcessSection />

      <VideoShowcaseSection reels={portfolioReels} />

      <CEOSection />

      {testimonials.length > 0 ? (
        <TestimonialsSection testimonials={testimonials} />
      ) : (
        <TestimonialsSection />
      )}

      {/* Work With Us CTA Section */}
      <section className="py-16 md:py-24 bg-brand-light relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-brand-dark rounded-[2.5rem] creative-border p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden"
          >
            {/* Background design elements to look extremely premium */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-lavender/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl text-center lg:text-left">
              <span className="font-accent text-brand-orange uppercase tracking-widest text-sm font-semibold mb-3 block">
                Next Steps
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-white mb-6 leading-tight">
                Ready to make some <br className="hidden md:inline" />
                <span className="text-brand-orange italic font-serif lowercase font-normal">noise?</span>
              </h2>
              <p className="text-white/70 text-base md:text-lg max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <Link
                to="/contact#work-with-us"
                className="inline-flex items-center gap-3 bg-brand-orange text-white hover:bg-white hover:text-brand-dark font-display font-bold uppercase px-8 py-5 rounded-2xl creative-border-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 text-base md:text-lg shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
              >
                Work With Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/services' element={<ServicesPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/portfolio' element={<PortfolioPage />} />
      <Route path='/portfolio/:slug' element={<PortfolioDetailPage />} />
      <Route path='/blog' element={<BlogPage />} />
      <Route path='/blog/:slug' element={<BlogDetailPage />} />
      <Route path='/faq' element={<FAQPage />} />
    </Routes>
  );
}
