import React, { memo } from "react";

export const MobileNav = memo(function MobileNav({
  activeSection,
  onScrollTo,
}) {
  const items = [
    { id: "hero", label: "Cover", icon: "✦" },
    { id: "chapters", label: "Story", icon: "❧" },
    { id: "letter", label: "Letter", icon: "✉" },
    { id: "promises", label: "Promises", icon: "💍" },
  ];

  return (
    <nav
      id="mob"
      className="md:hidden fixed bottom-0 inset-x-0 bg-[#faf9f6]/95 backdrop-blur-md border-t border-black/[0.08] z-50 flex items-center py-2 pb-[calc(8px+env(safe-area-inset-bottom,0))] shadow-[0_-2px_12px_rgba(0,0,0,0.03)]"
      aria-label="Mobile Bottom Navigation"
    >
      {items.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onScrollTo(item.id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1 px-1 bg-transparent border-none cursor-pointer relative select-none"
          >
            <span
              className={`text-[15px] leading-none transition-transform duration-200 ${
                isActive ? "text-[#d63b50] scale-110" : "text-[#71717a]"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`text-[9px] font-sans font-medium tracking-[0.12em] uppercase transition-colors ${
                isActive ? "text-[#111111] font-semibold" : "text-[#8e8e93]"
              }`}
            >
              {item.label}
            </span>
            {isActive && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#d63b50]" />
            )}
          </button>
        );
      })}
    </nav>
  );
});
