import { useState, useEffect } from "react";

export function useCountdown(startDateString) {
  const [timeState, setTimeState] = useState({
    days: "000",
    hours: "00",
    minutes: "00",
    seconds: "00",
    countdown: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isAnniversary: false,
      text: "",
    },
  });

  useEffect(() => {
    const origin = new Date(startDateString).getTime();
    // 1-Year Anniversary Target Date: exactly 1 year after start date (Sept 19, 2026 00:00:00)
    const startDate = new Date(startDateString);
    const anniversaryTarget = new Date(
      startDate.getFullYear() + 1,
      startDate.getMonth(),
      startDate.getDate(),
      0, 0, 0
    ).getTime();

    const tick = () => {
      const now = Date.now();

      // Elapsed time since start
      const diff = Math.max(0, now - origin);
      const days = String(Math.floor(diff / 86400000)).padStart(3, "0");
      const hours = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

      // Remaining time until 1st Anniversary (Sept 19, 2026)
      const remainingMs = anniversaryTarget - now;
      let countdown;

      if (remainingMs <= 0) {
        countdown = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isAnniversary: true,
          text: "🎉 Happy 1st Anniversary! Exactly 365 Days of Pure Love 💕",
        };
      } else {
        const remDays = Math.floor(remainingMs / 86400000);
        const remHours = Math.floor((remainingMs % 86400000) / 3600000);
        const remMins = Math.floor((remainingMs % 3600000) / 60000);
        const remSecs = Math.floor((remainingMs % 60000) / 1000);

        const parts = [];
        if (remDays > 0) parts.push(`${remDays} day${remDays > 1 ? "s" : ""}`);
        if (remHours > 0) parts.push(`${remHours} hr${remHours > 1 ? "s" : ""}`);
        parts.push(`${remMins} min${remMins > 1 ? "s" : ""}`);

        countdown = {
          days: remDays,
          hours: remHours,
          minutes: remMins,
          seconds: remSecs,
          isAnniversary: false,
          text: `Almost 365 Days! ✨ Only ${parts.join(" and ")} until September 19 💕`,
        };
      }

      setTimeState({ days, hours, minutes, seconds, countdown });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startDateString]);

  return timeState;
}
