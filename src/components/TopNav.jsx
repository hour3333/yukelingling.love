import React, { memo } from "react";

export const TopNav = memo(function TopNav({
  months,
  activeMonth,
  activeSection,
  onScrollTo,
}) {
  return (
    <header
      id="topnav"
      className="sticky top-0 z-50 bg-[#faf9f6]/92 backdrop-blur-md border-b border-black/[0.07] transition-colors"
      aria-label="Site Navigation"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand Monogram */}
        <button
          onClick={() => onScrollTo("hero")}
          className="font-serif italic font-light text-[21px] text-[#111111] hover:text-[#d63b50] transition-colors cursor-pointer bg-transparent border-none p-0 shrink-0 select-none"
          title="Yuke & Lingling — Return to Cover"
        >
          Y<span className="text-[#d63b50] font-normal">&amp;</span>L
        </button>

        {/* Center: Interactive Chapter Timeline (Hidden on small mobile, visible on tablet/desktop) */}
        <nav
          aria-label="Story Timeline"
          className="hidden md:flex items-center gap-1 scrollbar-none px-3 py-1 rounded-full border border-black/[0.06] bg-black/[0.02]"
        >
          {months.map((m) => {
            const isTimelineSection = activeSection === "chapters" || !["hero", "our-memories", "letter", "promises"].includes(activeSection);
            const isActive = isTimelineSection && activeMonth === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onScrollTo(`month-${m.id}`)}
                title={`${m.chapterRoman || `Month ${m.num}`}: ${m.title}`}
                className={`text-[11px] font-sans transition-all px-2.5 py-0.5 rounded-full cursor-pointer relative select-none ${
                  isActive
                    ? "text-[#d63b50] font-semibold bg-[#d63b50]/8"
                    : "text-[#71717a] hover:text-[#111111] hover:bg-black/[0.03]"
                }`}
              >
                {m.num}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d63b50]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Primary Sections (OUR STORY · LETTER · PROMISES) */}
        <div className="flex items-center gap-5 sm:gap-7">
          <button
            onClick={() => onScrollTo("chapters")}
            className={`text-[10px] sm:text-[10.5px] font-sans font-medium tracking-[0.2em] uppercase transition-colors cursor-pointer bg-transparent border-none p-0 ${
              activeSection === "chapters"
                ? "text-[#d63b50] font-semibold"
                : "text-[#71717a] hover:text-[#111111]"
            }`}
          >
            OUR STORY
          </button>

          <button
            onClick={() => onScrollTo("letter")}
            className={`text-[10px] sm:text-[10.5px] font-sans font-medium tracking-[0.2em] uppercase transition-colors cursor-pointer bg-transparent border-none p-0 ${
              activeSection === "letter"
                ? "text-[#d63b50] font-semibold"
                : "text-[#71717a] hover:text-[#111111]"
            }`}
          >
            LETTER
          </button>

          <button
            onClick={() => onScrollTo("promises")}
            className={`text-[10px] sm:text-[10.5px] font-sans font-medium tracking-[0.2em] uppercase transition-colors cursor-pointer bg-transparent border-none p-0 ${
              activeSection === "promises"
                ? "text-[#d63b50] font-semibold"
                : "text-[#71717a] hover:text-[#111111]"
            }`}
          >
            PROMISES
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Chapter Scroller (Subtle timeline visible on mobile under the header) */}
      <div className="md:hidden border-t border-black/[0.05] bg-[#faf9f6]/95 px-3 py-1.5 overflow-x-auto scrollbar-none scroll-mask-x flex items-center gap-1.5">
        <span className="text-[9px] font-sans font-medium tracking-[0.2em] uppercase text-[#a1a1aa] shrink-0 pl-1 pr-2">
          CH:
        </span>
        {months.map((m) => {
          const isActive = activeSection === "chapters" && activeMonth === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onScrollTo(`month-${m.id}`)}
              className={`text-[11px] font-sans py-0.5 px-2 rounded-full shrink-0 cursor-pointer transition-colors ${
                isActive
                  ? "text-[#d63b50] font-semibold bg-[#d63b50]/10"
                  : "text-[#71717a] hover:text-[#111111]"
              }`}
            >
              {m.num}
            </button>
          );
        })}
      </div>
    </header>
  );
});
