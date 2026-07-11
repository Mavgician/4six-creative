/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { meetTroyia } from "@/assets/images";

export function CEOSection() {
  return (
    <section className="py-20 md:py-32 bg-brand-light relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image Column */}
          <div className="relative max-w-[260px] sm:max-w-sm md:max-w-md mx-auto lg:max-w-none w-full">
            {/* Main Image */}
            <div className="rounded-t-[8rem] sm:rounded-t-[10rem] md:rounded-t-[12rem] rounded-b-[1.5rem] md:rounded-b-[2rem] overflow-hidden creative-border aspect-[3/4] relative z-10 bg-white">
              <img
                src={meetTroyia}
                alt="Meet Troyia"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={1067}
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-black text-brand-dark tracking-tighter mb-4 md:mb-8 leading-none">
              Meet <span className="italic">Troyia</span>
            </h2>
            <div className="space-y-4 md:space-y-6 text-base sm:text-lg md:text-xl text-brand-dark/90 leading-relaxed font-medium text-left">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                <strong className="text-brand-dark font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</strong> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
