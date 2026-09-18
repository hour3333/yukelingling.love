import React, { memo } from "react";

// Format uppercase strings into elegant literary Title Case
function toTitleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const ChapterSection = memo(function ChapterSection({
  month,
  totalMonths,
  prevMonth,
  nextMonth,
  onPrev,
  onNext,
}) {
  const displayTitle = toTitleCase(month.title);

  // Separate paragraphs cleanly to allow drop-cap on opening
  const paragraphs = typeof month.story === "string"
    ? month.story.split("\n\n").filter(Boolean)
    : [month.story];

  return (
    <article
      id={`month-${month.id}`}
      data-chapter-id={month.id}
      className="max-w-[760px] mx-auto px-5 sm:px-8 py-20 sm:py-28 border-b border-black/[0.07]"
    >
      {/* 1. Chapter Eyebrow & Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-[9.5px] font-sans font-semibold tracking-[0.28em] uppercase text-[#d63b50]">
            {month.chapterRoman || `CHAPTER ${month.num}`}
          </span>
          <span className="text-[9px] text-black/20">/</span>
          <span className="text-[10px] font-sans font-medium tracking-[0.18em] uppercase text-[#71717a]">
            {month.monthYear || month.date}
          </span>
        </div>

        <span className="text-[10.5px] font-serif italic text-black/35 select-none">
          {month.num.includes("–") ? `Parts ${month.num} of 12` : `Part ${month.num} of 12`}
        </span>
      </div>

      {/* 2. Main Chapter Title (In Elegant Literary Serif) */}
      <div className="mb-6">
        <h2 className="font-serif font-light text-[clamp(34px,5.8vw,60px)] leading-[1.04] tracking-[-0.025em] text-[#111111]">
          {displayTitle}
        </h2>
      </div>

      {/* 3. Editorial Pull Quote — Centered Literary Frame */}
      {month.pull && (
        <figure className="my-8 sm:my-11 py-6 sm:py-7 border-y border-black/[0.07] text-center max-w-[640px] mx-auto">
          <blockquote className="font-serif italic font-light text-[clamp(17.5px,2.5vw,22px)] text-[#18181b] leading-[1.6] px-3">
            “{month.pull}”
          </blockquote>
        </figure>
      )}

      {/* 4. The Story Text (With Editorial Drop-Cap) */}
      <div className="space-y-6 text-[#2c2c2e] my-8 sm:my-10">
        {paragraphs.map((para, idx) => (
          <p
            key={idx}
            className={`font-serif font-light text-[17.5px] sm:text-[19px] leading-[2.0] ${
              idx === 0 ? "drop-cap" : ""
            }`}
          >
            {para}
          </p>
        ))}
      </div>

      {/* 5. WHAT I REMEMBER (Minimalist Archival Note) */}
      {month.memory && (
        <aside className="my-10 sm:my-12 p-6 sm:p-7 rounded-[2px] border border-[#e5e0d8] bg-[#faf8f5] max-w-[560px] shadow-[0_1px_4px_rgba(0,0,0,0.015)]">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d63b50]" />
              <span className="text-[9px] font-sans font-semibold tracking-[0.25em] uppercase text-[#71717a]">
                WHAT I REMEMBER
              </span>
            </div>
            <span className="text-[10px] font-serif italic text-black/30">
              Note
            </span>
          </div>
          <p className="font-serif italic font-light text-[17px] sm:text-[18.5px] text-[#1c1917] leading-[1.65]">
            "{month.memory}"
          </p>
        </aside>
      )}

      {/* 6. NEXT CHAPTER / PREVIOUS CHAPTER Footer */}
      <footer className="flex items-center justify-between mt-16 sm:mt-20 pt-6 border-t border-black/[0.07]">
        <button
          onClick={onPrev}
          disabled={!prevMonth}
          className="group inline-flex items-center gap-2 text-[10.5px] font-sans font-medium tracking-[0.14em] uppercase text-[#71717a] hover:text-[#111111] disabled:opacity-20 disabled:cursor-default transition-colors cursor-pointer bg-transparent border-none p-0"
        >
          <span className="transition-transform group-hover:-translate-x-1 inline-block">←</span>
          <span>{prevMonth ? (prevMonth.num.includes("–") ? `Chapters ${prevMonth.num}` : `Chapter ${prevMonth.num}`) : "Cover"}</span>
        </button>

        <div className="flex items-center gap-1.5 text-[9.5px] font-sans font-medium tracking-[0.2em] uppercase text-[#a1a1aa]">
          <span>{month.num}</span>
          <span className="text-[8px] text-black/20">/</span>
          <span>12</span>
        </div>

        <button
          onClick={onNext}
          className="group inline-flex items-center gap-2 text-[10.5px] font-sans font-semibold tracking-[0.14em] uppercase text-[#111111] hover:text-[#d63b50] transition-colors cursor-pointer bg-transparent border-none p-0"
        >
          <span>{nextMonth ? (nextMonth.num.includes("–") ? `Chapters ${nextMonth.num}` : `Chapter ${nextMonth.num}`) : "Our Memories"}</span>
          <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
        </button>
      </footer>
    </article>
  );
});
