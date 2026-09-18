import React, { useState, useEffect, useRef, memo } from "react";

// Helper: Calculate remaining time in days, hours, minutes, seconds
function calculateTimeRemaining(targetDate) {
  const targetTime = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (diff <= 0 || isNaN(diff)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, totalMs: diff };
}

// Helper: Automatically format unlock date in Cambodia timezone (UTC+07:00)
// Example output: "UNLOCKS · 19 SEPTEMBER 2026 · 00:00"
function formatUnlockDateDisplay(isoString) {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";

    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Phnom_Penh",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(date);

    const getPart = (type) => parts.find((p) => p.type === type)?.value || "";
    const day = getPart("day");
    const month = getPart("month").toUpperCase();
    const year = getPart("year");
    const hour = getPart("hour");
    const minute = getPart("minute");

    return `UNLOCKS · ${day} ${month} ${year} · ${hour}:${minute}`;
  } catch {
    return "";
  }
}

// Helper: Calculate countdown progress relative to 1-year horizon
function calculateProgress(targetDate) {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  if (isNaN(target)) return 100;
  const horizon = 365 * 24 * 60 * 60 * 1000;
  const start = target - horizon;
  const progress = ((now - start) / (target - start)) * 100;
  return Math.max(2, Math.min(100, Math.round(progress * 10) / 10));
}

// Single Monochrome Glass Countdown Card
const GlassCard = memo(function GlassCard({ value, label }) {
  return (
    <div className="flex-1 min-w-[72px] sm:min-w-[94px] py-3.5 px-3 sm:py-5 sm:px-4 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.85)] hover:border-white/25 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center justify-center select-none group">
      <div className="h-9 sm:h-12 flex items-center justify-center overflow-hidden">
        <span
          key={value}
          className="font-sans font-medium text-[clamp(28px,6vw,44px)] leading-none text-white tabular-nums animate-num-change transition-colors"
        >
          {value}
        </span>
      </div>
      <span className="text-[8.5px] sm:text-[9.5px] font-sans font-medium tracking-[0.24em] uppercase text-[#777777] mt-2 group-hover:text-[#b5b5b5] transition-colors">
        {label}
      </span>
    </div>
  );
});

// Custom Minimal SVG Lock Icon (Thin white lines, subtle white pulse glow)
function GeometricLockIcon({ isUnlocked, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="relative group cursor-pointer bg-transparent border-none p-0 focus:outline-none"
      title="Protected Archive"
      aria-label={isUnlocked ? "Unlocked" : "Locked"}
    >
      {/* Subtle white ambient glow */}
      <div
        className={`absolute -inset-3 rounded-full bg-white/[0.05] blur-xl transition-all duration-700 pointer-events-none ${
          isUnlocked ? "bg-white/[0.25] scale-125" : "group-hover:bg-white/[0.12]"
        }`}
      />

      <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white/[0.03] border border-white/[0.12] group-hover:border-white/30 flex items-center justify-center transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white transition-all duration-700 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        >
          {/* Shackle: Animates open with smooth translation & rotation */}
          <path
            d="M7 10V6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V10"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            style={{
              transformOrigin: "7px 6.5px",
              transform: isUnlocked
                ? "translateY(-4px) rotate(-22deg)"
                : "translateY(0) rotate(0)",
              transition: "transform 0.85s cubic-bezier(0.34, 1.45, 0.64, 1)",
            }}
          />
          {/* Lock Body */}
          <rect
            x="4.5"
            y="10"
            width="15"
            height="11.5"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.35"
            fill="rgba(10, 10, 10, 0.8)"
          />
          {/* Keyhole */}
          <circle cx="12" cy="15" r="1.15" fill="currentColor" />
          <path
            d="M12 16.15V18"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </button>
  );
}

export function CountdownLock({ unlockDate, onUnlockComplete }) {
  // Check if URL has ?preview=true or ?bypass=true to bypass lock screen
  const isBypass =
    typeof window !== "undefined" &&
    (window.location.search.includes("preview=true") ||
      window.location.search.includes("bypass=true"));

  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeRemaining(unlockDate)
  );

  // Phases: 'LOCKED' | 'STAGE_1_FADE_COUNTDOWN' | 'STAGE_2_UNLOCK_ICON' | 'STAGE_3_ITS_TIME' | 'STAGE_4_MEMORIES_READY' | 'STAGE_5_EXPAND_LIGHT' | 'STAGE_6_FADE_OUT' | 'COMPLETED'
  const [phase, setPhase] = useState(() => {
    if (isBypass) return "COMPLETED";
    const initial = calculateTimeRemaining(unlockDate);
    return initial.totalMs <= 0 ? "COMPLETED" : "LOCKED";
  });

  const [devClicks, setDevClicks] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.4 });
  const canvasRef = useRef(null);
  const hasTriggeredUnlock = useRef(false);

  // Prevent background scrolling while locked
  useEffect(() => {
    if (phase !== "COMPLETED") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Subtle interactive background glow following cursor on desktop (disabled on touch devices)
  useEffect(() => {
    if (phase === "COMPLETED") return;
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const handleMouseMove = (e) => {
      // Keep mouse movement effect minimal and soft
      const targetX = 0.45 + (e.clientX / window.innerWidth) * 0.1;
      const targetY = 0.35 + (e.clientY / window.innerHeight) * 0.1;
      setMousePos({ x: targetX, y: targetY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [phase]);

  // Countdown timer loop
  useEffect(() => {
    if (phase !== "LOCKED") return;

    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining(unlockDate);
      setTimeLeft(remaining);

      // Trigger unlock sequence when reaching 00:00:00
      if (remaining.totalMs <= 0 && !hasTriggeredUnlock.current) {
        hasTriggeredUnlock.current = true;
        clearInterval(interval);
        startCinematicUnlock();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [unlockDate, phase]);

  // Cinematic 7-Stage Monochrome Unlock Transition
  const startCinematicUnlock = () => {
    // Stage 1: Countdown numbers gently fade away
    setPhase("STAGE_1_FADE_COUNTDOWN");

    // Stage 2: Lock icon changes from locked → unlocked
    setTimeout(() => {
      setPhase("STAGE_2_UNLOCK_ICON");
    }, 800);

    // Stage 3: Show "It's time." in large white text centered on black
    setTimeout(() => {
      setPhase("STAGE_3_ITS_TIME");
    }, 1800);

    // Stage 4: After ~1.5s, "Your memories are ready." appears underneath
    setTimeout(() => {
      setPhase("STAGE_4_MEMORIES_READY");
    }, 3300);

    // Stage 5: Soft white light expanding from the center
    setTimeout(() => {
      setPhase("STAGE_5_EXPAND_LIGHT");
    }, 4900);

    // Stage 6: Fade the lock layer away
    setTimeout(() => {
      setPhase("STAGE_6_FADE_OUT");
    }, 6000);

    // Stage 7: Reveal website underneath smoothly without reload
    setTimeout(() => {
      setPhase("COMPLETED");
      if (onUnlockComplete) onUnlockComplete();
    }, 7200);
  };

  // Secret developer test trigger: Click lock 5 times to preview unlock sequence
  const handleSecretUnlock = () => {
    if (phase !== "LOCKED") return;
    const next = devClicks + 1;
    setDevClicks(next);
    if (next >= 5) {
      startCinematicUnlock();
    }
  };

  // Sparse monochrome white particles / tiny stars (only 22 lightweight particles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || phase === "COMPLETED") return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 22 pure white/gray ambient particles
    const particles = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.35 + 0.1,
      speedY: Math.random() * 0.14 + 0.04,
      pulseSpeed: Math.random() * 0.012 + 0.004,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        p.phase += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.phase) * (p.alpha * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.04, Math.min(0.55, currentAlpha))})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase]);

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
  const formattedDate = formatUnlockDateDisplay(unlockDate);
  const progressPercent = calculateProgress(unlockDate);

  if (phase === "COMPLETED") {
    return null;
  }

  const isUnlockedIcon =
    phase !== "LOCKED" && phase !== "STAGE_1_FADE_COUNTDOWN";
  const isRevealingWebsite = phase === "STAGE_6_FADE_OUT";
  const isExpandingLight =
    phase === "STAGE_5_EXPAND_LIGHT" || phase === "STAGE_6_FADE_OUT";

  return (
    <div
      id="countdown-lock-screen"
      role="dialog"
      aria-label="Unlock Countdown"
      aria-modal="true"
      className={`fixed inset-0 z-[100] h-[100dvh] w-full flex flex-col items-center justify-between px-5 sm:px-8 py-8 sm:py-12 select-none overflow-hidden transition-all duration-1000 ${
        isRevealingWebsite ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
        backgroundColor: "#000000",
        backgroundImage: `
          radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 255, 255, ${
          isExpandingLight ? "0.4" : "0.05"
        }), transparent 50%),
          radial-gradient(circle at 50% 40%, rgba(255, 255, 255, ${
            isExpandingLight ? "0.3" : "0.03"
          }), transparent 65%),
          linear-gradient(180deg, #050505 0%, #000000 100%)
        `,
      }}
    >
      {/* Background Starry Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Extremely Subtle Animated Grain/Noise Layer (Monochrome) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(#ffffff 0.75px, transparent 0.75px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      {/* Top Header Label */}
      <header className="relative z-10 text-center pt-2">
        <p className="text-[9.5px] sm:text-[10.5px] font-sans font-medium tracking-[0.34em] uppercase text-white/40 select-none">
          A LITTLE SOMETHING FOR YOU
        </p>
      </header>

      {/* Main Center Content Box */}
      <main className="relative z-10 max-w-[560px] w-full text-center my-auto flex flex-col items-center">
        {/* Custom Minimal Geometric Lock Icon */}
        <div className="mb-6 sm:mb-8">
          <GeometricLockIcon
            isUnlocked={isUnlockedIcon}
            onClick={handleSecretUnlock}
          />
        </div>

        {/* Phase: Locked Default State */}
        {phase === "LOCKED" && (
          <div className="w-full flex flex-col items-center animate-fade-up">
            {/* Headline: Serif, Pure White */}
            <h1 className="font-serif font-light text-[clamp(30px,5.5vw,48px)] text-white leading-[1.12] tracking-[-0.025em] mb-3">
              Something special is waiting.
            </h1>

            {/* Subtitle: Clean Sans-Serif, Light Gray */}
            <p className="font-sans font-normal text-[clamp(14px,2.2vw,16.5px)] text-[#a1a1aa] tracking-[0.02em] mb-8 sm:mb-10">
              Come back when the time is right.
            </p>

            {/* Modern Monochrome Countdown Cards: 2x2 on small mobile, 4-col on desktop */}
            <div className="w-full max-w-[340px] sm:max-w-[460px] grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 mx-auto">
              <GlassCard value={pad(timeLeft.days)} label="DAYS" />
              <GlassCard value={pad(timeLeft.hours)} label="HOURS" />
              <GlassCard value={pad(timeLeft.minutes)} label="MINUTES" />
              <GlassCard value={pad(timeLeft.seconds)} label="SECONDS" />
            </div>

            {/* Monochrome Progress Indicator */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto mt-8 sm:mt-10">
              <div className="h-[1.5px] w-full bg-white/[0.08] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] sm:text-[10.5px] font-sans font-light tracking-[0.24em] uppercase text-[#777777] mt-3 animate-pulse-gentle">
                WAITING FOR THE RIGHT MOMENT...
              </p>
            </div>

            {/* Formatted Unlock Date in Cambodia UTC+07:00 */}
            {formattedDate && (
              <p className="text-[9.5px] sm:text-[10.5px] font-sans font-medium tracking-[0.24em] uppercase text-white/40 mt-7">
                {formattedDate}
              </p>
            )}
          </div>
        )}

        {/* Phase: Stage 1 - Countdown numbers gently fade away */}
        {phase === "STAGE_1_FADE_COUNTDOWN" && (
          <div className="opacity-30 transition-opacity duration-700">
            <h2 className="font-serif font-light text-[clamp(30px,5.4vw,48px)] text-white/70 tracking-[-0.02em]">
              The moment has arrived...
            </h2>
          </div>
        )}

        {/* Phase: Stage 2 & 3 - "It's time." in large white text */}
        {(phase === "STAGE_2_UNLOCK_ICON" || phase === "STAGE_3_ITS_TIME") && (
          <div className="py-6 animate-fade-up">
            <h2 className="font-serif italic font-light text-[clamp(44px,8vw,76px)] text-white leading-none tracking-[-0.03em] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              It's time.
            </h2>
          </div>
        )}

        {/* Phase: Stage 4 & 5 - "Your memories are ready." */}
        {(phase === "STAGE_4_MEMORIES_READY" ||
          phase === "STAGE_5_EXPAND_LIGHT" ||
          phase === "STAGE_6_FADE_OUT") && (
          <div className="py-6 animate-fade-up flex flex-col items-center">
            <h2 className="font-serif italic font-light text-[clamp(42px,7.5vw,70px)] text-white leading-none tracking-[-0.03em] mb-4 drop-shadow-[0_0_35px_rgba(255,255,255,0.5)]">
              It's time.
            </h2>
            <p className="font-sans font-light tracking-[0.2em] uppercase text-[#b5b5b5] text-[clamp(12.5px,2.4vw,15px)] animate-fade-up">
              Your memories are ready.
            </p>
          </div>
        )}
      </main>

      {/* Bottom Message */}
      <footer className="relative z-10 text-center pb-1">
        <p className="text-[10px] sm:text-[10.5px] font-sans uppercase text-[#666666] tracking-[0.26em] opacity-80 select-none">
          A STORY WORTH WAITING FOR.
        </p>
      </footer>
    </div>
  );
}
