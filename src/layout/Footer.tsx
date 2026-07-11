import { Instagram, Youtube, Mail } from 'lucide-react';
import { logoWhite } from '@/assets/images';

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-16 md:py-24 border-t-8 border-brand-orange">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 md:mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6 md:mb-8 h-16">
              <img src={logoWhite} alt="4SIX CREATIVE" className="h-full object-contain" loading="lazy" decoding="async" width={400} height={134} />
            </div>
            <p className="text-white/80 text-lg md:text-xl max-w-md mb-8 md:mb-10 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.
            </p>
            <div className="flex gap-4 md:gap-6">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/troyiamonay/" },
                { Icon: Youtube, href: "https://www.youtube.com/@TroyiaMonayy" },
                { Icon: TiktokIcon, href: "https://www.tiktok.com/@iamtroyiamonayy" },
                { Icon: Mail, href: "mailto:mgmt@troyiamonay.com" }
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border-4 border-white/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:scale-110 transition-all">
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg md:text-xl mb-6 md:mb-8 uppercase tracking-widest text-brand-orange">Explore</h4>
            <ul className="space-y-4 md:space-y-6 text-white/60 text-base md:text-lg font-bold uppercase tracking-tight">
              <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg md:text-xl mb-6 md:mb-8 uppercase tracking-widest text-brand-orange">Connect</h4>
            <ul className="space-y-4 md:space-y-6 text-white/60 text-base md:text-lg">
              <li><a href="mailto:mgmt@troyiamonay.com" className="hover:text-white transition-colors">mgmt@troyiamonay.com</a></li>
              <li>+1 (555) 000-4646</li>
              <li>123 Creative Lane, <br />Design District, NY</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 md:pt-12 border-t-4 border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-xs sm:text-sm font-bold uppercase tracking-widest text-center md:text-left">
          <p>© 2024 4SIX CREATIVE. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
