import React, { memo } from "react";

export const AnniversaryMoment = memo(function AnniversaryMoment({
  onOpenLetter,
}) {
  return (
    <section
      id="our-memories"
      className="py-28 sm:py-36 px-6 bg-[#faf8f5] border-b border-black/[0.08] text-center relative overflow-hidden"
    >
      <div className="max-w-[680px] mx-auto">
        {/* Subtle Archival Ribbon */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="h-[1px] w-6 bg-black/15" aria-hidden="true" />
          <p className="text-[10px] font-sans font-medium tracking-[0.28em] uppercase text-[#71717a]">
            CHAPTER TWELVE &amp; BEYOND
          </p>
          <span className="h-[1px] w-6 bg-black/15" aria-hidden="true" />
        </div>

        {/* 365 DAYS · 12 MONTHS · COUNTLESS MEMORIES */}
        <div className="space-y-3 sm:space-y-4 mb-8">
          <h2 className="font-serif font-light text-[clamp(44px,8vw,88px)] leading-[0.92] tracking-[-0.03em] text-[#111111]">
            365 DAYS
          </h2>
          <h3 className="font-serif font-light text-[clamp(32px,6vw,64px)] leading-[0.95] tracking-[-0.025em] text-[#27272a]">
            12 MONTHS
          </h3>
          <h4 className="font-serif italic font-light text-[clamp(26px,4.5vw,48px)] leading-[1.0] text-[#d63b50]">
            COUNTLESS MEMORIES
          </h4>
        </div>

        {/* Divider hairline */}
        <div className="w-12 h-[1px] bg-black/15 mx-auto my-8" />

        {/* And this is only the beginning. */}
        <p className="font-serif font-light italic text-[clamp(20px,3.2vw,30px)] text-[#1c1917] leading-[1.4] mb-8">
          And this is only the beginning.
        </p>

        {/* Yuke ♡ Lingling */}
        <p className="font-serif text-[clamp(24px,3.8vw,34px)] text-[#111111] mb-2 font-normal">
          Yuke <span className="text-[#d63b50] text-[20px] mx-1">♡</span> Lingling
        </p>

        {/* 19.09.2025 — 19.09.2026 */}
        <p className="text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#71717a] mb-4">
          19.09.2025 — 19.09.2026
        </p>

        {/* Happy 1st Anniversary */}
        <p className="font-serif italic font-light text-[22px] sm:text-[26px] text-[#27272a] mb-12">
          Happy 1st Anniversary
        </p>

        {/* OPEN MY LETTER Button */}
        <div>
          <button
            onClick={onOpenLetter}
            className="group inline-flex items-center gap-3 bg-[#111111] hover:bg-[#d63b50] text-white px-8 py-4 rounded-full font-sans text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.12)] cursor-pointer"
          >
            <span>OPEN MY LETTER</span>
            <span className="transition-transform group-hover:translate-y-1 inline-block text-[13px]">
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  );
});
