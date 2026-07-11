import { useRef, useState, useEffect } from "react";
import { industryImages } from "@/assets/images";

const industries = [
  { name: "Coaches", image: industryImages.coaches },
  { name: "Marketing Strategists", image: industryImages.marketingStrategists },
  { name: "Realtors", image: industryImages.realtors },
  { name: "Restaurants", image: industryImages.restaurants },
  { name: "Bakeries", image: industryImages.bakery },
  { name: "Authors", image: industryImages.authors },
  { name: "Tax Strategists", image: industryImages.taxStrategists },
  { name: "Speakers", image: industryImages.speakers },
  { name: "Entrepreneurs", image: industryImages.entrepreneurs },
  { name: "Event Planners", image: industryImages.eventPlanners },
  { name: "Hair Stylists", image: industryImages.hairStylists },
  { name: "Nail Salons", image: industryImages.nailSalons },
  { name: "Skincare", image: industryImages.skincare },
  { name: "Grant Writers", image: industryImages.grantWriters },
];

const getGridSpan = (index: number) => {
  switch (index) {
    case 0: return 'md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto'; // Large feature
    case 1: return 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto';
    case 2: return 'md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto'; // Tall
    case 3: return 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto';
    case 4: return 'md:col-span-2 md:row-span-1 aspect-[2/1] md:aspect-auto'; // Wide
    case 5: return 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto';
    case 6: return 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto';
    case 7: return 'md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto'; // Tall
    case 8: return 'md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto'; // Large feature
    case 9: return 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto';
    case 10: return 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto';
    case 11: return 'md:col-span-2 md:row-span-1 aspect-[2/1] md:aspect-auto'; // Wide
    case 12: return 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto';
    case 13: return 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto';
    default: return 'md:col-span-1 md:row-span-1 aspect-square md:aspect-auto';
  }
};

export function IndustriesSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-brand-light relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter uppercase text-brand-dark mb-12 md:mb-20 text-center">
          Trusted across <span className="text-brand-orange italic font-serif lowercase font-normal">industries</span> like:
        </h2>

        {/* The Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 md:auto-rows-[250px] lg:auto-rows-[300px]"
        >
          {industries.map((industry, index) => (
            <div 
              key={industry.name}
              className={`relative overflow-hidden rounded-3xl group ${getGridSpan(index)} transition-all duration-[1000ms] ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                transitionDelay: `${index * 50}ms`
              }}
            >
              <img 
                src={industry.image} 
                alt={industry.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                loading="lazy"
                decoding="async"
                width={1200}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h3 className="text-white font-display font-bold uppercase tracking-widest text-xl md:text-2xl leading-none">
                  {industry.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
