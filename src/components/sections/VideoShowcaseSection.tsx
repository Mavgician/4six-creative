/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { btsPhotoList, iPhoneFrame } from "@/assets/images";

interface VideoShowcaseSectionProps {
  reels?: string[];
}

export function VideoShowcaseSection({ reels }: VideoShowcaseSectionProps) {
  const videoSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: videoScroll } = useScroll({
    target: videoSectionRef,
    offset: ["start 75%", "start 25%"]
  });

  const topTearY = useTransform(videoScroll, [0, 1], ["0%", "-100%"]);
  const bottomTearY = useTransform(videoScroll, [0, 1], ["0%", "100%"]);

  const defaultReels = [
    "https://www.instagram.com/reel/C0hn8OGuEk5/embed/",
    "https://www.instagram.com/reel/CmMnxhTOqiZ/embed/",
    "https://www.instagram.com/reel/DVJ7qwBEjSu/embed/",
    "https://www.instagram.com/reel/DO7EsRUDejI/embed/",
    "https://www.instagram.com/reel/DX7Xn-bPKTq/embed/",
    "https://www.instagram.com/reel/DO37S78jn9Q/embed/"
  ];

  const reelsList = reels && reels.length > 0 ? reels : defaultReels;

  // BTS photos — optimized via vite-imagetools (800px wide, WebP)
  const btsPhotos = btsPhotoList;

  return (
    <section ref={videoSectionRef} className="py-24 bg-[#d0c3f1] relative">
      {/* Paper Tear Overlay */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
        {/* Top Tear */}
        <motion.div
          style={{ y: topTearY }}
          className="absolute top-0 left-0 right-0 h-1/2 bg-white"
        >
          <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }} />
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="absolute top-full left-0 w-full h-4 sm:h-6 md:h-10 lg:h-14 fill-white/60">
            <path d="M0,0 L0,22 L20,27 L40,17 L60,30 L80,20 L100,27 L120,12 L140,32 L160,22 L180,30 L200,17 L220,27 L240,14 L260,34 L280,20 L300,27 L320,12 L340,32 L360,22 L380,30 L400,17 L420,27 L440,14 L460,34 L480,20 L500,27 L520,12 L540,32 L560,22 L580,30 L600,17 L620,27 L640,14 L660,34 L680,20 L700,27 L720,12 L740,32 L760,22 L780,30 L800,17 L820,27 L840,14 L860,34 L880,20 L900,27 L920,12 L940,32 L960,22 L980,30 L1000,17 L1020,27 L1040,14 L1060,34 L1080,20 L1100,27 L1120,12 L1140,32 L1160,22 L1180,30 L1200,17 L1200,0 Z" />
          </svg>
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="absolute top-full left-0 w-full h-3 sm:h-5 md:h-8 lg:h-12 fill-white drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]">
            <path d="M0,0 L0,20 L20,25 L40,15 L60,28 L80,18 L100,25 L120,10 L140,30 L160,20 L180,28 L200,15 L220,25 L240,12 L260,32 L280,18 L300,25 L320,10 L340,30 L360,20 L380,28 L400,15 L420,25 L440,12 L460,32 L480,18 L500,25 L520,10 L540,30 L560,20 L580,28 L600,15 L620,25 L640,12 L660,32 L680,18 L700,25 L720,10 L740,30 L760,20 L780,28 L800,15 L820,25 L840,12 L860,32 L880,18 L900,25 L920,10 L940,30 L960,20 L980,28 L1000,15 L1020,25 L1040,12 L1060,32 L1080,18 L1100,25 L1120,10 L1140,30 L1160,20 L1180,28 L1200,15 L1200,0 Z" />
          </svg>
        </motion.div>

        {/* Bottom Tear */}
        <motion.div
          style={{ y: bottomTearY }}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-white"
        >
          <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }} />
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="absolute bottom-full left-0 w-full h-4 sm:h-6 md:h-10 lg:h-14 fill-white/60 rotate-180">
            <path d="M0,0 L0,22 L20,27 L40,17 L60,30 L80,20 L100,27 L120,12 L140,32 L160,22 L180,30 L200,17 L220,27 L240,14 L260,34 L280,20 L300,27 L320,12 L340,32 L360,22 L380,30 L400,17 L420,27 L440,14 L460,34 L480,20 L500,27 L520,12 L540,32 L560,22 L580,30 L600,17 L620,27 L640,14 L660,34 L680,20 L700,27 L720,12 L740,32 L760,22 L780,30 L800,17 L820,27 L840,14 L860,34 L880,20 L900,27 L920,12 L940,32 L960,22 L980,30 L1000,17 L1020,27 L1040,14 L1060,34 L1080,20 L1100,27 L1120,12 L1140,32 L1160,22 L1180,30 L1200,17 L1200,0 Z" />
          </svg>
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="absolute bottom-full left-0 w-full h-3 sm:h-5 md:h-8 lg:h-12 fill-white rotate-180 drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]">
            <path d="M0,0 L0,20 L20,25 L40,15 L60,28 L80,18 L100,25 L120,10 L140,30 L160,20 L180,28 L200,15 L220,25 L240,12 L260,32 L280,18 L300,25 L320,10 L340,30 L360,20 L380,28 L400,15 L420,25 L440,12 L460,32 L480,18 L500,25 L520,10 L540,30 L560,20 L580,28 L600,15 L620,25 L640,12 L660,32 L680,18 L700,25 L720,10 L740,30 L760,20 L780,28 L800,15 L820,25 L840,12 L860,32 L880,18 L900,25 L920,10 L940,30 L960,20 L980,28 L1000,15 L1020,25 L1040,12 L1060,32 L1080,18 L1100,25 L1120,10 L1140,30 L1160,20 L1180,28 L1200,15 L1200,0 Z" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* ── Portfolio Reel Carousel ── */}
        <Carousel opts={{ loop: true }} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] uppercase tracking-tighter font-display font-black text-brand-dark leading-none">
              Our Portfolio
            </h2>
            <div className="flex gap-4">
              <CarouselPrevious variant="ghost" className="static translate-y-0 w-14 h-14 rounded-full !bg-brand-lavender !text-brand-dark flex items-center justify-center creative-border-sm creative-border-hover cursor-pointer outline-none [&_svg]:w-6 [&_svg]:h-6 hover:!bg-brand-dark hover:!text-white transition-colors" />
              <CarouselNext variant="ghost" className="static translate-y-0 w-14 h-14 rounded-full !bg-brand-orange !text-white flex items-center justify-center creative-border-sm creative-border-hover cursor-pointer outline-none [&_svg]:w-6 [&_svg]:h-6 hover:!bg-brand-dark hover:!text-white transition-colors" />
            </div>
          </div>

          <CarouselContent className="-ml-4 pb-6">
            {reelsList.map((reelUrl, idx) => (
              <CarouselItem key={`reel-${idx}`} className="pl-4 basis-[78%] sm:basis-[300px] md:basis-[320px] shrink-0">
                <div className="relative w-full aspect-[900/1840] overflow-hidden bg-transparent">
                  {/* Screen container */}
                  <div className="absolute top-[2.3%] left-[5%] w-[90%] h-[95%] rounded-[2rem] sm:rounded-[2.2rem] overflow-hidden bg-brand-dark flex items-center justify-center">
                    <iframe
                      src={reelUrl}
                      title={`Instagram Reel Portfolio Item ${idx + 1}`}
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center mt-12">
          <Link to="/portfolio">
            <Button className="bg-brand-dark text-white hover:bg-brand-orange rounded-full px-10 py-6 text-lg font-bold uppercase tracking-widest creative-border-sm creative-border-hover transition-all flex items-center gap-2">
              View Full Portfolio <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* ══════════════════════════════════════
            Behind the Scenes Sub-Section
        ══════════════════════════════════════ */}
        <div className="mt-24 md:mt-32">

          {/* BTS Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-dark text-white creative-border-sm font-bold text-xs tracking-[0.2em] uppercase mb-5">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                Behind the Scenes
              </span>
              <h2 className="text-[clamp(2rem,5vw,4.5rem)] uppercase tracking-tighter font-display font-black text-brand-dark leading-none">
                The Making<br />
                <span className="text-brand-orange italic font-serif font-normal lowercase">of the magic</span>
              </h2>
            </div>
            <p className="text-brand-dark/70 max-w-xs text-base md:text-lg leading-relaxed pb-1">
              A glimpse into our creative process — from concept to final frame.
            </p>
          </motion.div>

          {/* BTS Main Layout: Feature video + photo mosaic */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 items-start">

            {/* Left column: Feature BTS Video Card */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden creative-border aspect-[3/4] bg-brand-dark group"
            >
              {/* Background video — Camera equipment footage */}
              <video
                src="/Camera eqpitment.mov"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-700"
              />

              {/* Gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent" />

              {/* Film strip edge decoration — left */}
              <div className="absolute left-0 top-0 bottom-0 w-7 flex flex-col justify-around items-center bg-black/70 z-10 py-3 gap-1.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-3.5 h-2.5 bg-white/15 rounded-[3px] border border-white/10 flex-shrink-0" />
                ))}
              </div>

              {/* Film strip edge decoration — right */}
              <div className="absolute right-0 top-0 bottom-0 w-7 flex flex-col justify-around items-center bg-black/70 z-10 py-3 gap-1.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-3.5 h-2.5 bg-white/15 rounded-[3px] border border-white/10 flex-shrink-0" />
                ))}
              </div>

              {/* Bottom label bar */}
              <div className="absolute bottom-0 left-7 right-7 z-20 p-5 flex items-center justify-between">
                <span className="text-white/40 font-mono text-[9px] uppercase tracking-widest">4six Creative</span>
                <span className="bg-brand-orange/90 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  In Production
                </span>
              </div>
            </motion.div>

            {/* Right column: 3×3 Photo Mosaic */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {btsPhotos.map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 + idx * 0.055,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className={`relative overflow-hidden creative-border-sm group cursor-pointer ${
                    idx === 0
                      ? "col-span-2 row-span-2 rounded-3xl aspect-square"
                      : idx === 3
                      ? "col-span-2 rounded-2xl aspect-[2/1]"
                      : "rounded-2xl aspect-square"
                  }`}
                >
                  <img
                    src={src}
                    alt={`BTS shot ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={800}
                  />
                  {/* Hover reveal overlay */}
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/55 transition-colors duration-300 flex items-end justify-start p-3">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-brand-orange text-white text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full">
                      BTS
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* BTS scrolling ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 overflow-hidden border-y-2 border-brand-dark/20 py-4"
          >
            <div
              className="flex gap-12 whitespace-nowrap"
              style={{ animation: "marquee 20s linear infinite" }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="flex items-center gap-4 text-brand-dark/35 font-display font-black uppercase text-base tracking-[0.2em] flex-shrink-0"
                >
                  Behind the Scenes
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/60 inline-block" />
                </span>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
