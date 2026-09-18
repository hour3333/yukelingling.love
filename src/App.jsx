// =========================================================================
// ===== COUNTDOWN SETTINGS =====
// Change the unlock date and time below (Cambodia Time UTC+7).
// Format: "YYYY-MM-DDTHH:MM:SS+07:00"
export const UNLOCK_DATE = "2026-09-19T00:15:00+07:00";
// =========================================================================

import React, { useState, useEffect, useCallback } from "react";
import { STORY } from "./data/storyData";
import { CountdownLock } from "./components/CountdownLock";
import { Hero } from "./components/Hero";
import { TopNav } from "./components/TopNav";
import { ChapterSection } from "./components/ChapterSection";
import { AnniversaryMoment } from "./components/AnniversaryMoment";
import { Letter } from "./components/Letter";
import { Promises } from "./components/Promises";
import { SecretVault } from "./components/SecretVault";
import { MobileNav } from "./components/MobileNav";

export default function App() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [isSiteUnlocked, setIsSiteUnlocked] = useState(() => {
    if (
      typeof window !== "undefined" &&
      (window.location.search.includes("preview=true") ||
        window.location.search.includes("bypass=true"))
    ) {
      return true;
    }
    return new Date(UNLOCK_DATE).getTime() - Date.now() <= 0;
  });

  // Smooth scroll handler
  const handleScrollTo = useCallback((elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // ScrollSpy for Monthly Chapters (00 through 12)
  useEffect(() => {
    const chapterEls = document.querySelectorAll("[data-chapter-id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveMonth(Number(visible.target.getAttribute("data-chapter-id")));
        }
      },
      { threshold: 0.15, rootMargin: "-10% 0px -55% 0px" }
    );

    chapterEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Section Observer for TopNav & MobileNav indicators
  useEffect(() => {
    const sectionIds = ["hero", "chapters", "our-memories", "letter", "promises"];
    const sectionEls = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-10% 0px -50% 0px" }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#18181b] max-md:pb-16 selection:bg-[#d63b50]/15 selection:text-[#d63b50]">
      {/* 0. Countdown Lock Screen Overlay */}
      <CountdownLock
        unlockDate={UNLOCK_DATE}
        onUnlockComplete={() => setIsSiteUnlocked(true)}
      />

      {/* Main Website Content (Inert and invisible while locked) */}
      <div
        inert={!isSiteUnlocked}
        className={`transition-opacity duration-1000 ${
          !isSiteUnlocked ? "opacity-0 select-none pointer-events-none" : "opacity-100"
        }`}
      >
        {/* 1. Sticky Navigation with Timeline & Section Shortcuts */}
        <TopNav
          months={STORY.months}
          activeMonth={activeMonth}
          activeSection={activeSection}
          onScrollTo={handleScrollTo}
        />

        <main>
          {/* 2. Cover / Hero Section: ONE YEAR OF US */}
          <Hero
            couple={STORY.couple}
            onBegin={() => handleScrollTo("month-0")}
          />

          {/* 3. Monthly Chapters */}
          <section id="chapters" aria-label="Our Story Chapters">
            {STORY.months.map((month, idx) => {
              const prevMonth = idx > 0 ? STORY.months[idx - 1] : null;
              const nextMonth = idx < STORY.months.length - 1 ? STORY.months[idx + 1] : null;

              return (
                <ChapterSection
                  key={month.id}
                  month={month}
                  totalMonths={STORY.months.length}
                  prevMonth={prevMonth}
                  nextMonth={nextMonth}
                  onPrev={() =>
                    handleScrollTo(prevMonth ? `month-${prevMonth.id}` : "hero")
                  }
                  onNext={() =>
                    handleScrollTo(nextMonth ? `month-${nextMonth.id}` : "our-memories")
                  }
                />
              );
            })}
          </section>

          {/* 4. Final Anniversary Moment (After Month 12) */}
          <AnniversaryMoment
            onOpenLetter={() => handleScrollTo("letter")}
          />

          {/* 5. Dedicated Letter Section: A LETTER TO YOU */}
          <Letter
            letter={STORY.letter}
            onOpenPromises={() => handleScrollTo("promises")}
          />

          {/* 6. Dedicated Promises Section: PROMISES */}
          <Promises
            promises={STORY.promises}
          />
        </main>

        {/* 7. Secret Vault & Footer (Passcode: 1909) */}
        <SecretVault />

        {/* 8. Mobile Bottom Navigation Dock */}
        <MobileNav
          activeSection={activeSection}
          onScrollTo={handleScrollTo}
        />
      </div>
    </div>
  );
}
