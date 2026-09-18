import React, { memo } from "react";
import { useCountdown } from "../hooks/useCountdown";

// Isolated component — re-renders every second, keeps Hero static
function CounterDisplay({ startDate }) {
  const { days, hours, minutes, seconds, countdown } = useCountdown(startDate);

  // If on or after September 19, 2026: automatically transition to "365 DAYS OF US"
  if (countdown?.isAnniversary) {
    return (
      <div className="my-8 py-6 px-8 rounded-[4px] border border-black/8 bg-white/80 max-w-[480px] mx-auto text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <p className="font-serif font-light text-[clamp(46px,8vw,76px)] leading-[0.92] tracking-[-0.03em] text-[#111111]">
          365 DAYS
        </p>
        <p className="font-serif italic font-light text-[clamp(32px,5.5vw,52px)] leading-none text-[#d63b50] mt-1">
          OF US
        </p>
        <p className="text-[10px] font-sans font-medium tracking-[0.25em] uppercase text-[#71717a] mt-4">
          ✦ Exactly 365 Days of Pure Love · A Lifetime to Go ✦
        </p>
      </div>
    );
  }

  // Pre-anniversary: high-end luxury editorial chronometer
  return (
    <div className="w-full max-w-[540px] mx-auto">
      <div className="border-y border-black/10 py-5 sm:py-6 flex items-center justify-center gap-3 sm:gap-7 bg-white/40 backdrop-blur-[2px] rounded-[2px]">
        {/* Days */}
        <div className="text-center min-w-[58px] sm:min-w-[76px]">
          <span className="font-serif font-light text-[clamp(30px,5.2vw,50px)] leading-none text-[#111111] block tracking-[-0.03em]">
            {days}
          </span>
          <span className="text-[8.5px] sm:text-[9px] font-sans font-medium tracking-[0.24em] uppercase text-[#8e8e93] block mt-1.5">
            Days
          </span>
        </div>

        <div className="h-6 sm:h-7 w-[1px] bg-black/10" aria-hidden="true" />

        {/* Hours */}
        <div className="text-center min-w-[58px] sm:min-w-[76px]">
          <span className="font-serif font-light text-[clamp(30px,5.2vw,50px)] leading-none text-[#111111] block tracking-[-0.03em]">
            {hours}
          </span>
          <span className="text-[8.5px] sm:text-[9px] font-sans font-medium tracking-[0.24em] uppercase text-[#8e8e93] block mt-1.5">
            Hours
          </span>
        </div>

        <div className="h-6 sm:h-7 w-[1px] bg-black/10" aria-hidden="true" />

        {/* Minutes */}
        <div className="text-center min-w-[58px] sm:min-w-[76px]">
          <span className="font-serif font-light text-[clamp(30px,5.2vw,50px)] leading-none text-[#111111] block tracking-[-0.03em]">
            {minutes}
          </span>
          <span className="text-[8.5px] sm:text-[9px] font-sans font-medium tracking-[0.24em] uppercase text-[#8e8e93] block mt-1.5">
            Mins
          </span>
        </div>

        <div className="h-6 sm:h-7 w-[1px] bg-black/10" aria-hidden="true" />

        {/* Seconds */}
        <div className="text-center min-w-[58px] sm:min-w-[76px]">
          <span className="font-serif font-light text-[clamp(30px,5.2vw,50px)] leading-none text-[#111111] block tracking-[-0.03em]">
            {seconds}
          </span>
          <span className="text-[8.5px] sm:text-[9px] font-sans font-medium tracking-[0.24em] uppercase text-[#8e8e93] block mt-1.5">
            Secs
          </span>
        </div>
      </div>

      {/* Subtle Milestone Ribbon */}
      {countdown?.text && (
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/8 bg-white/70 text-[#27272a] text-[11px] font-sans font-medium tracking-[0.02em] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span className="text-[#d63b50] text-[9px]">✦</span>
          <span>{countdown.text}</span>
        </div>
      )}
    </div>
  );
}

// Hero static frame — memoized, zero unnecessary re-renders
export const Hero = memo(function Hero({ couple, onBegin }) {
  return (
    <section
      id="hero"
      className="min-h-[94svh] sm:min-h-[98svh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-20 relative animate-fade-up"
    >
      {/* Names Eyebrow */}
      <div className="mb-4">
        <p className="font-serif italic font-light text-[clamp(24px,4vw,36px)] text-[#111111]">
          Yuke <span className="text-[#d63b50] font-normal">&amp;</span> Lingling
        </p>
      </div>

      {/* Main Title: ONE YEAR OF US */}
      <div className="mb-6">
        <h1 className="font-serif font-light text-[clamp(56px,12.5vw,132px)] leading-[0.9] tracking-[-0.03em] text-[#111111]">
          ONE YEAR<br />
          <span className="font-serif italic font-normal text-[#111111]">OF US</span>
        </h1>
      </div>

      {/* Tagline: A story written day by day. */}
      <p className="font-serif font-light italic text-[clamp(17px,2.4vw,23px)] text-[#52525b] mb-3">
        {couple.tagline}
      </p>

      {/* Date Range: 19.09.2025 — 19.09.2026 */}
      <div className="flex items-center gap-3 mb-10 sm:mb-12">
        <span className="h-[1px] w-6 bg-black/15" aria-hidden="true" />
        <p className="text-[10.5px] sm:text-[11px] font-sans font-medium tracking-[0.24em] uppercase text-[#71717a]">
          19.09.2025 — 19.09.2026
        </p>
        <span className="h-[1px] w-6 bg-black/15" aria-hidden="true" />
      </div>

      {/* Elegant Chronometer / Anniversary Display */}
      <CounterDisplay startDate={couple.startDate} />

      {/* Begin Our Story Callout */}
      <div className="mt-14 sm:mt-16">
        <button
          onClick={onBegin}
          className="group inline-flex flex-col items-center gap-2 text-[10px] font-sans font-medium tracking-[0.26em] uppercase text-[#71717a] hover:text-[#111111] transition-colors cursor-pointer bg-transparent border-none p-0"
        >
          <span className="text-[14px] leading-none transition-transform duration-300 group-hover:translate-y-1">
            ↓
          </span>
          <span>BEGIN OUR STORY</span>
          <div className="scroll-nudge w-[1px] h-7 bg-gradient-to-b from-black/25 to-transparent mt-1" />
        </button>
      </div>
    </section>
  );
});
