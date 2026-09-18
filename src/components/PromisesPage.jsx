import React, { memo } from "react";

export const PromisesPage = memo(function PromisesPage({ promises, onBack }) {
  return (
    <div className="min-h-screen bg-white text-[#2a2a2a] py-16 sm:py-24 px-6 pb-28">
      <div className="max-w-[840px] mx-auto">
        {/* Top Back Navigation */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[#737373] hover:text-[#0f0f0f] transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <span className="transition-transform group-hover:-translate-x-1 inline-block">←</span>
            <span>Return to Our Story</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-16 border-b border-black/[0.08] pb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#d63b50] text-[10px]">✦</span>
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#737373]">
              VOLUME II · YEAR TWO &amp; FOREVER
            </p>
          </div>
          <h1 className="font-serif font-light text-[clamp(44px,8vw,80px)] leading-[0.94] tracking-[-0.025em] text-[#0f0f0f] mb-6">
            My Promises<br />To You
          </h1>
          <p className="font-serif font-light italic text-[clamp(17px,2.4vw,22px)] text-[#5c5c5c] max-w-[620px] leading-[1.55]">
            Six sacred vows written with all my heart for you, Lingling. As we step into our second year, these are the promises I will keep every single day.
          </p>
        </div>

        {/* Promises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 my-14">
          {promises.map((p) => (
            <div
              key={p.id}
              className="p-8 sm:p-10 rounded-[4px] border border-black/[0.08] bg-[#faf8f5]/80 hover:bg-[#faf8f5] hover:border-black/15 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9.5px] font-semibold tracking-[0.22em] uppercase text-[#d63b50]">
                    VOW {p.num}
                  </span>
                  <span className="text-[10px] text-black/25">✦</span>
                </div>

                <h3 className="font-serif font-normal text-[22px] sm:text-[24px] text-[#0f0f0f] leading-[1.25] mb-5">
                  {p.title}
                </h3>

                <p className="font-serif font-light italic text-[16.5px] sm:text-[17.5px] text-[#3a3a3a] leading-[1.8] pl-4 border-l-2 border-[#d63b50]">
                  "{p.vow}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[10px] font-medium tracking-[0.16em] uppercase text-[#999999]">
                <span>To Lingling</span>
                <span>Forever Kept</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Signature & Back Action */}
        <div className="mt-20 pt-12 border-t border-black/[0.08] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="font-serif text-[28px] sm:text-[32px] italic font-light text-[#0f0f0f]">
              Forever your Lyhour ❤️
            </p>
            <p className="text-[10.5px] text-[#8e8e93] tracking-[0.1em] uppercase mt-1">
              Written for Lingling · September 19, 2026
            </p>
          </div>

          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 bg-[#0f0f0f] hover:bg-[#d63b50] text-white font-sans text-[11px] font-semibold tracking-[0.12em] uppercase py-3.5 px-7 rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1 inline-block">←</span>
            <span>Return to Our Story</span>
          </button>
        </div>
      </div>
    </div>
  );
});
