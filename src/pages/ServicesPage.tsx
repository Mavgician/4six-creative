import Navbar from '@/layout/Navbar';
import Footer from '@/layout/Footer';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Globe, BarChart3, Target, Video, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Feature {
  description: string;
  price: string;
}

interface Plan {
  name: string;
  description: string;
  features: Feature[];
  color: string;
  featured?: boolean;
}

const services = [
  {
    icon: Globe,
    title: 'Full-Service Management',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi.',
    tag: 'Most Popular',
    color: 'bg-brand-lavender',
  },
  {
    icon: Sparkles,
    title: 'Visual Design',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi.',
    tag: 'Creative',
    color: 'bg-brand-peach',
  },
  // {
  //   icon: BarChart3,
  //   title: 'Performance Ads',
  //   description: 'Optimized Meta and TikTok ad campaigns designed to turn impressions into revenue and scale your ROI.',
  //   tag: 'Growth',
  //   color: 'bg-brand-green',
  // },
  {
    icon: Target,
    title: 'Content Strategy',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    tag: 'Strategy',
    color: 'bg-brand-orange',
  },
  {
    icon: Video,
    title: 'Reels & Short-Form Video',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    tag: 'Video',
    color: 'bg-brand-lavender',
  },
  // {
  //   icon: Users,
  //   title: 'Influencer Outreach',
  //   description: 'Connecting your brand with the right creators to amplify your message and grow your audience authentically.',
  //   tag: 'Outreach',
  //   color: 'bg-brand-peach',
  // },
];

const plans = [
  {
    name: 'Freebie',
    description: 'Lead magnets like checklists, mini guides, templates, or short trainings.',
    features: [
      { description: 'The Consistency Cure Ebook', price: '$0' },
    ],
    color: 'bg-brand-lavender',
  },
  {
    name: 'Low Ticket',
    description: 'Tripwires, mini courses, templates, ebooks, and small digital products.',
    features: [
      { description: 'Camera Confidence Training', price: '$17' },
      { description: 'Social School Community (Monthly)', price: '$47/mo' },
      { description: 'Social School Community (Annual)', price: '$397/yr' },
      { description: 'SS Lifetime Access (Launch Week)', price: '$327' },
    ],
    color: 'bg-brand-orange',
  },
  {
    name: 'Mid Ticket',
    description: 'Signature courses, group programs, challenges, and short-term coaching containers.',
    features: [
      { description: 'DIY Social Media Management', price: '$197' },
      { description: '4-Hour VIP Content Day', price: '$997' },
    ],
    color: 'bg-brand-green',
    featured: true,
  },
  {
    name: 'High Ticket',
    description: 'Masterminds, 1:1 coaching, done-for-you services, certifications, and intensive group programs.',
    features: [
      { description: 'Social Media Management', price: 'From $2,500/mo' },
      { description: 'On-Site Content Day', price: 'From $1,997' },
      { description: 'Business / Brand Content Day', price: 'Included' },
      { description: 'Event Coverage Content Day', price: 'Included' },
      { description: 'BTS Content Day', price: 'Included' },
    ],
    color: 'bg-brand-blue',
  },
  {
    name: 'Premium',
    description: 'VIP days, year-long masterminds, retainer agency work, high-level consulting.',
    features: [
      { description: 'TBD', price: 'TBD' },
    ],
    color: 'bg-brand-gold',
  },
];

function getStartingPrice(features: Feature[]): string {
  const parsed = features
    .map((f) => {
      const match = f.price.match(/[\d,]+(\.\d+)?/);
      if (!match) return null; // catches 'Included', 'TBD'
      return {
        value: parseFloat(match[0].replace(/,/g, '')),
        raw: f.price,
      };
    })
    .filter((p): p is { value: number; raw: string } => p !== null);

  if (parsed.length === 0) return 'TBD';

  const lowest = parsed.reduce((min, curr) => (curr.value < min.value ? curr : min));
  
  const regex = new RegExp('/From/i')

  const hasFrom = regex.test(lowest.raw);

  console.log(hasFrom);

  return lowest.value === 0 ? 'Free' : `Starting at $${lowest.value}`;
}

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className='min-h-screen bg-brand-light'>
      <Navbar />

      {/* Hero */}
      <section className='pt-32 md:pt-40 pb-24 px-6 bg-brand-light relative overflow-hidden'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className='inline-block bg-brand-lavender text-brand-dark border-2 border-brand-dark px-4 py-1 rounded-full font-bold mb-8 text-sm tracking-widest uppercase shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'>
              What We Do
            </div>
            <h1 className='text-[clamp(2rem,7vw,7rem)] font-display font-black uppercase tracking-tighter text-brand-dark leading-none mb-6'>
              Our Creative <br /><span className='text-brand-orange italic'>Arsenal</span>
            </h1>            <p className='text-xl text-brand-dark/70 max-w-2xl leading-relaxed'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna liqua.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className='py-24 bg-white px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className='relative rounded-3xl creative-border p-8 flex flex-col gap-4 bg-white group cursor-pointer'
                >
                  <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center creative-border-sm`}>
                    <Icon className='w-7 h-7 text-brand-dark' />
                  </div>
                  <div className='inline-block bg-brand-dark text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit'>
                    {service.tag}
                  </div>
                  <h3 className='text-2xl font-display font-bold uppercase tracking-tight text-brand-dark'>
                    {service.title}
                  </h3>
                  <p className='text-brand-dark/70 leading-relaxed flex-1'>
                    {service.description}
                  </p>
                  <Link
                    to='/contact#work-with-us'
                    className='inline-flex items-center gap-2 text-brand-orange font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all'
                  >
                    Apply Now <ArrowRight className='w-4 h-4' />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className='py-24 bg-brand-light px-6 grid-bg'>
        <div className='mx-auto relative z-10'>
          <div className='text-center mb-16'>
            <h2 className='text-[clamp(2.5rem,6vw,5rem)] font-display font-black uppercase tracking-tighter text-brand-dark leading-none mb-4'>
              Simple <span className='text-brand-orange italic'>Pricing</span>
            </h2>
            <p className='text-xl text-brand-dark/60 max-w-xl mx-auto'>
              Pick your entry point. Every tier is built to grow with you.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch'>
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ delay: idx * 0.15 }}
                className={`relative rounded-3xl p-8 flex flex-col gap-6 creative-border ${plan.featured ? 'bg-brand-dark text-white md:-translate-y-6' : 'bg-white text-brand-dark'}`}
              >
                {plan.featured && (
                  <div className='absolute top-11 right-10 inline-block bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit'>
                    Most Popular
                  </div>
                )}
                <div className={`w-12 h-12 rounded-2xl ${plan.color} creative-border-sm`} />
                <div className={'h-35'}>
                  <h3 className='text-3xl font-display font-black uppercase tracking-tight mb-2'>
                    {plan.name}
                  </h3>
                  <p className={`text-sm leading-relaxed ${plan.featured ? 'text-white/60' : 'text-brand-dark/60'}`}>
                    {plan.description}
                  </p>
                </div>
                <div className='text-xl font-display font-black text-brand-orange'>
                  {getStartingPrice(plan.features)}
                </div>
                <ul className='flex flex-col gap-3'>
                  {plan.features.map((f, i) => (
                    <li key={i} className={`flex items-center gap-3 text-sm font-medium ${plan.featured ? 'text-white/80' : 'text-brand-dark/80'}`}>
                      <div className={`w-5 h-5 rounded-full ${plan.color} creative-border-sm shrink-0`} />
                      {f.description}
                    </li>
                  ))}
                </ul>
                <div className='py-5'>
                  <Link className={`absolute bottom-5 left-0 w-full px-10`} to='/contact#work-with-us'>
                    <Button className={`relative w-full rounded-full py-6 font-bold uppercase tracking-widest creative-border-sm creative-border-hover ${plan.featured ? 'bg-brand-orange text-white hover:bg-brand-lavender' : 'bg-brand-dark text-white hover:bg-brand-orange'}`}>
                      Get Started
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className='py-24 bg-brand-orange px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
          >
            <h2 className='text-[clamp(2.5rem,6vw,5rem)] font-display font-black uppercase tracking-tighter text-white leading-none mb-6'>
              Ready to Make <br />It Pop?
            </h2>
            <p className='text-white/80 text-xl mb-10 max-w-xl mx-auto'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor u.
            </p>
            <Link to='/contact#work-with-us'>
              <Button className='bg-white text-brand-orange hover:bg-brand-dark hover:text-white rounded-full px-10 py-6 text-lg font-bold uppercase tracking-widest creative-border creative-border-hover transition-colors'>
                Apply Now <ArrowRight className='ml-2 w-5 h-5 inline' />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
