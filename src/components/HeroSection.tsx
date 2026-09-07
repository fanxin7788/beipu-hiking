import React, { useState } from 'react';
import { Leaf, Trees, TrendingUp, Footprints, Users, CloudSun, Wind, Droplets } from 'lucide-react';
import { HikingEvent } from '../types.ts';

interface HeroSectionProps {
  event: HikingEvent;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ event }) => {
  const [showWeatherDetail, setShowWeatherDetail] = useState(false);

  return (
    <section className="relative mx-4 rounded-xl overflow-hidden shadow-md">
      {/* Hero Background Image */}
      <div className="relative w-full h-80 bg-[#1b3b2b]">
        <img
          src={event.heroImage}
          alt="北埔山脉与绿色步道自然风景"
          className="w-full h-full object-cover"
        />

        {/* Multi-tier Gradient Scrim for atmospheric depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#032517]/95 via-[#032517]/40 to-transparent" />

        {/* Top Floating Pills on Image */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fcf9f2]/90 backdrop-blur-md text-[#032517] text-[11px] font-bold shadow-sm">
            <Trees className="w-3.5 h-3.5 text-[#032517]" />
            {event.tag1}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1b3b2b]/85 backdrop-blur-md text-[#abcfb8] text-[11px] font-semibold border border-white/10">
            <Leaf className="w-3 h-3 text-[#abcfb8]" />
            {event.tag2}
          </span>
        </div>

        {/* Hero Core Information Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-[26px] sm:text-[28px] leading-tight font-bold tracking-tight text-white mb-2 font-display">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {/* Elevation Pill */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>爬升 {event.elevationGain}</span>
            </div>

            {/* Difficulty Pill */}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fec299]/90 text-[#794e2d] text-[11px] font-bold">
              <Footprints className="w-3.5 h-3.5" />
              <span>{event.difficulty}</span>
            </div>

            {/* Group Status */}
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-[11px] font-medium">
              <Users className="w-3.5 h-3.5" />
              <span>{event.groupSize}人小队</span>
            </div>

            {/* Weather Quick Badge Toggle */}
            <button
              onClick={() => setShowWeatherDetail(!showWeatherDetail)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-[11px] hover:bg-white/25 transition-all"
            >
              <CloudSun className="w-3.5 h-3.5 text-amber-200" />
              <span>22°C 晴间多云</span>
            </button>
          </div>

          {/* Expanded Weather Drawer */}
          {showWeatherDetail && (
            <div className="mt-3 p-2.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-[12px] flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-amber-300" />
                <span>气温 19°C~25°C</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-300" />
                <span>湿度 68%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-emerald-300" />
                <span>微风 2级 (适宜徒步)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
