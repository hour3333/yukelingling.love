import React, { memo } from "react";

export const Letter = memo(function Letter({
  letter,
  onOpenPromises,
}) {
  // Split paragraphs cleanly
  const paragraphs = typeof letter.body === "string"
    ? letter.body.split("\n\n").filter(Boolean)
    : [letter.body];

  return (
    <section
      id="letter"
      className="py-24 sm:py-36 px-6 sm:px-10 bg-[#faf9f6] border-b border-black/[0.08]"
    >
      <div className="max-w-[720px] mx-auto">
        {/* Letter Head */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[10px] font-sans font-semibold tracking-[0.28em] uppercase text-[#d63b50] mb-3">
            ANNIVERSARY CORRESPONDENCE
          </p>
          <h2 className="font-serif font-light text-[clamp(40px,7.5vw,72px)] leading-[0.95] tracking-[-0.03em] text-[#111111]">
            A LETTER<br />
            <span className="font-serif italic font-normal text-[#111111]">TO YOU</span>
          </h2>
          <p className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-[#8e8e93] mt-4">
            {letter.date}
          </p>
        </div>

        {/* Archival Letter Stationery Paper */}
        <div className="bg-white p-8 sm:p-14 sm:py-18 rounded-[3px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative">
          {/* Subtle archival ribbon */}
          <div className="w-8 h-[1px] bg-[#d63b50] mb-8" />

          {/* Salutation: Dear Lingling, */}
          <p className="font-serif italic text-[22px] sm:text-[25px] text-[#111111] mb-8">
            Dear Lingling,
          </p>

          {/* Letter Body Paragraphs */}
          <div className="space-y-6 sm:space-y-7">
            {paragraphs.map((para, i) => {
              const trimmed = para.trim();
              const isBold = trimmed.startsWith("**") && trimmed.endsWith("**");
              const content = isBold ? trimmed.slice(2, -2) : para;

              return (
                <p
                  key={i}
                  className={`font-serif leading-[2.1] ${
                    isBold
                      ? "font-normal italic text-[20px] sm:text-[23px] text-[#111111] pt-3 tracking-[-0.01em]"
                      : "font-light text-[18px] sm:text-[20px] text-[#2c2c2e]"
                  }`}
                >
                  {content}
                </p>
              );
            })}
          </div>

          {/* Sign-off Block: With love, Yuke */}
          <div className="mt-14 pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="font-serif italic text-[18px] text-[#71717a] mb-1">
                With love,
              </p>
              <p className="font-serif text-[30px] sm:text-[34px] italic font-light text-[#111111]">
                Yuke ❤️
              </p>
            </div>

            {onOpenPromises && (
              <button
                onClick={onOpenPromises}
                className="group inline-flex items-center gap-2.5 text-[11px] font-sans font-semibold tracking-[0.14em] uppercase text-[#111111] hover:text-[#d63b50] transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                <span>Read My Promises To You</span>
                <span className="transition-transform group-hover:translate-x-1 inline-block">
                  →
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
