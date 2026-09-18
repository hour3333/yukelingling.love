import React, { useState, useEffect } from "react";
import { STORY } from "../data/storyData";

export function SecretVault() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const CORRECT_CODES = ["1909", "0919", "190925"];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setCode("");
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handlePress = (num) => {
    if (code.length < 6) {
      const newCode = code + num;
      setCode(newCode);

      if (newCode.length === 4) {
        verifyCode(newCode);
      }
    }
  };

  const handleBackspace = () => {
    setCode((prev) => prev.slice(0, -1));
  };

  const verifyCode = (enteredCode) => {
    if (CORRECT_CODES.includes(enteredCode)) {
      setIsUnlocked(true);
    } else {
      setErrorShake(true);
      setTimeout(() => {
        setErrorShake(false);
        setCode("");
      }, 700);
    }
  };

  return (
    <>
      {/* Discreet Secret Trigger in the Footer */}
      <footer className="border-t border-[#e5e5e5] py-9 px-6 text-center text-[11px] text-[#aaaaaa] tracking-[0.08em] flex items-center justify-center gap-2 select-none">
        <span>Year One &nbsp;·&nbsp; 365 Days &nbsp;·&nbsp; Made with love</span>
        <button
          onClick={() => {
            setIsOpen(true);
            setIsUnlocked(false);
            setCode("");
            setShowHint(false);
          }}
          className="opacity-40 hover:opacity-100 transition-opacity text-[#2a2a2a] cursor-pointer bg-transparent border-none p-0 text-[11px] leading-none"
          title="Classified"
          aria-label="Secret Vault"
        >
          🔒
        </button>
      </footer>

      {/* Secret Safe Modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#0c0c0f] text-white ${
              isUnlocked
                ? "max-w-[640px] max-h-[86vh] overflow-y-auto"
                : "max-w-[420px]"
            } w-full rounded-[8px] p-6 sm:p-9 relative shadow-[0_30px_100px_rgba(0,0,0,0.92)] border border-white/[0.12] transition-all duration-300 scrollbar-none`}
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="sticky top-0 float-right z-10 text-[16px] text-white/40 hover:text-white transition-colors cursor-pointer bg-black/40 backdrop-blur-md rounded-full border border-white/10 p-1.5 leading-none"
              title="Close Vault"
            >
              ✕
            </button>

            {!isUnlocked ? (
              <div className="text-center select-none">
                <div className="w-11 h-11 mx-auto mb-4 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[18px]">
                  🔒
                </div>

                <p className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#d63b50] mb-1.5">
                  PRIVATE ARCHIVES
                </p>
                <h3 className="font-serif font-light text-[26px] sm:text-[28px] text-white mb-6">
                  Enter Passcode
                </h3>

                {/* Pin Display */}
                <div
                  className={`flex justify-center items-center gap-3.5 mb-6 py-3.5 px-6 rounded-md bg-white/[0.03] border border-white/[0.08] transition-transform ${
                    errorShake ? "animate-shake border-red-500/60 bg-red-500/10" : ""
                  }`}
                >
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                        code.length > i
                          ? "bg-[#d63b50] border-[#d63b50] scale-110 shadow-[0_0_10px_rgba(214,59,80,0.7)]"
                          : "border-white/20 bg-transparent"
                      }`}
                    />
                  ))}
                </div>

                {errorShake && (
                  <p className="text-[11px] text-red-400 mb-3 -mt-2">
                    Access Denied · Incorrect Code
                  </p>
                )}

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto mb-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handlePress(num)}
                      className="h-12 rounded-[6px] bg-white/[0.04] hover:bg-white/[0.1] active:scale-95 border border-white/[0.08] text-[20px] font-serif font-light text-white transition-colors cursor-pointer"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="h-12 rounded-[6px] bg-white/[0.03] hover:bg-white/[0.08] text-[9.5px] font-medium tracking-[0.16em] uppercase text-white/50 border border-white/[0.08] transition-colors cursor-pointer"
                  >
                    Hint
                  </button>
                  <button
                    onClick={() => handlePress(0)}
                    className="h-12 rounded-[6px] bg-white/[0.04] hover:bg-white/[0.1] active:scale-95 border border-white/[0.08] text-[20px] font-serif font-light text-white transition-colors cursor-pointer"
                  >
                    0
                  </button>
                  <button
                    onClick={handleBackspace}
                    className="h-12 rounded-[6px] bg-white/[0.03] hover:bg-white/[0.08] text-[15px] text-white/60 border border-white/[0.08] transition-colors cursor-pointer"
                  >
                    ⌫
                  </button>
                </div>

                {showHint && (
                  <div className="text-[11px] text-white/60 italic bg-white/[0.03] p-3 rounded-[4px] border border-white/[0.08]">
                    💡 Hint: The date our universe aligned... (DDMM)
                  </div>
                )}
              </div>
            ) : (
              /* Unlocked Secret Letter */
              <div className="text-left py-2 select-text">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[12px] text-[#d63b50]">✦</span>
                  <p className="text-[9.5px] font-semibold tracking-[0.26em] uppercase text-[#d63b50]">
                    {STORY.secretLetter.eyebrow}
                  </p>
                </div>

                <h3 className="font-serif font-light text-[clamp(28px,5.5vw,40px)] text-white mb-2 leading-tight tracking-[-0.02em]">
                  {STORY.secretLetter.title}
                </h3>

                <p className="font-serif italic font-light text-[15.5px] text-white/50 mb-6 pb-4 border-b border-white/[0.08]">
                  {STORY.secretLetter.intro}
                </p>

                <div className="font-serif font-light text-[16.5px] sm:text-[18px] leading-[2.0] text-white/90 space-y-5 my-6">
                  {STORY.secretLetter.body.split("\n\n").map((para, idx) => {
                    const trimmed = para.trim();
                    const isHighlight = trimmed.startsWith("**") && trimmed.endsWith("**");
                    const content = isHighlight ? trimmed.slice(2, -2) : para;

                    if (isHighlight) {
                      return (
                        <div
                          key={idx}
                          className="my-5 py-3 px-4 rounded-[3px] bg-white/[0.04] border-l-2 border-[#d63b50]"
                        >
                          <p className="font-serif italic font-normal text-[18px] sm:text-[20px] text-[#d63b50]">
                            {content}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <p key={idx} className="text-white/85">
                        {content}
                      </p>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="font-serif italic text-[15px] text-white/50 mb-1">
                      {STORY.secretLetter.signoff}
                    </p>
                    <p className="font-serif text-[24px] italic font-light text-white">
                      {STORY.secretLetter.author}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[10.5px] font-sans font-semibold tracking-[0.16em] uppercase text-white/60 hover:text-white transition-colors bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 px-4 py-2 rounded-full cursor-pointer"
                  >
                    Close Vault
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
