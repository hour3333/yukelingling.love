import React, { memo } from "react";

export const Promises = memo(function Promises({ promises }) {
  // Fallback if promises is still an array or object
  const letterData = Array.isArray(promises)
    ? {
        eyebrow: "YEAR TWO & BEYOND",
        date: "September 19, 2026",
        salutation: "To You, My Love,",
        title: "My Promises to You",
        body: promises.map((p) => p.vow).join("\n\n"),
        signoff: "Forever yours,",
        author: "Yuke ❤️",
      }
    : promises || {};

  const paragraphs = typeof letterData.body === "string"
    ? letterData.body.split("\n\n").filter(Boolean)
    : [];

  return (
    <section
      id="promises"
      className="py-24 sm:py-36 px-6 sm:px-10 bg-[#faf9f6] border-b border-black/[0.08]"
    >
      <div className="max-w-[720px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[#d63b50] text-[9px]">✦</span>
            <p className="text-[10px] font-sans font-semibold tracking-[0.28em] uppercase text-[#71717a]">
              {letterData.eyebrow || "YEAR TWO & BEYOND"}
            </p>
            <span className="text-[#d63b50] text-[9px]">✦</span>
          </div>
          <h2 className="font-serif font-light text-[clamp(40px,7.5vw,72px)] leading-[0.95] tracking-[-0.03em] text-[#111111]">
            MY PROMISES<br />
            <span className="font-serif italic font-normal text-[#d63b50]">TO YOU</span>
          </h2>
          <p className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-[#8e8e93] mt-4">
            {letterData.date || "September 19, 2026"}
          </p>
        </div>

        {/* Archival Vows Letter Stationery Paper */}
        <div className="bg-white p-8 sm:p-14 sm:py-18 rounded-[3px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative">
          {/* Subtle Archival Ribbon */}
          <div className="w-8 h-[1px] bg-[#d63b50] mb-8" />

          {/* Salutation */}
          <p className="font-serif italic text-[22px] sm:text-[25px] text-[#111111] mb-8">
            {letterData.salutation || "To You, My Love,"}
          </p>

          {/* Letter Body Paragraphs */}
          <div className="space-y-6 sm:space-y-7">
            {paragraphs.map((para, i) => {
              const trimmed = para.trim();
              const isHighlight = trimmed.startsWith("**") && trimmed.endsWith("**");
              const content = isHighlight ? trimmed.slice(2, -2) : para;

              if (isHighlight) {
                return (
                  <div
                    key={i}
                    className="my-8 py-5 border-y border-black/[0.08] text-center"
                  >
                    <p className="font-serif italic font-normal text-[22px] sm:text-[26px] text-[#d63b50] tracking-[-0.01em]">
                      {content}
                    </p>
                  </div>
                );
              }

              return (
                <p
                  key={i}
                  className="font-serif font-light text-[18px] sm:text-[20px] leading-[2.1] text-[#2c2c2e]"
                >
                  {content}
                </p>
              );
            })}
          </div>

          {/* Sign-off Block */}
          <div className="mt-14 pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="font-serif italic text-[18px] text-[#71717a] mb-1">
                {letterData.signoff || "Forever yours,"}
              </p>
              <p className="font-serif text-[30px] sm:text-[34px] italic font-light text-[#111111]">
                {letterData.author || "Yuke ❤️"}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block text-[10px] font-sans font-medium tracking-[0.24em] uppercase text-[#a1a1aa] border-b border-black/10 pb-1">
                19.09.2025 → Forever
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
