"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import GiftBox from "./components/GiftBox";
import LoungeBackground from "./components/LoungeBackground";

export default function ValentinePage() {
  const [isEntered, setIsEntered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [seconds, setSeconds] = useState(0);
  const [isCelebration, setIsCelebration] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Balanced Evade logic
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isCelebration || !buttonRef.current || !isEntered) return;

    const button = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
    );

    const threshold = 180;

    if (distance < threshold) {
      // Move away from mouse
      const angle = Math.atan2(buttonCenterY - e.clientY, buttonCenterX - e.clientX);
      const moveDistance = 250;

      let newX = position.x + Math.cos(angle) * moveDistance;
      let newY = position.y + Math.sin(angle) * moveDistance;

      // Symmetrical bounds
      const padding = 120;
      const maxX = window.innerWidth / 2 - padding;
      const maxY = window.innerHeight / 2 - padding;

      if (Math.abs(newX) > maxX) newX = -Math.sign(newX) * (maxX * 0.5);
      if (Math.abs(newY) > maxY) newY = -Math.sign(newY) * (maxY * 0.5);

      setPosition({ x: newX, y: newY });
    }
  }, [position, isCelebration, isEntered]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (!isEntered || isCelebration) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= 29) {
          triggerCelebration();
          clearInterval(timer);
          return 30;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isEntered, isCelebration]);

  const triggerCelebration = () => {
    setIsCelebration(true);

    const end = Date.now() + 15 * 1000;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d6d', '#ffb3c1', '#d4af37', '#ffffff']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4d6d', '#ffb3c1', '#d4af37', '#ffffff']
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleStart = () => {
    setIsEntered(true);
    if (audioRef.current) audioRef.current.play().catch(() => { });
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black selection:bg-rose-500/30">
      <LoungeBackground />

      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
      />

      <AnimatePresence>
        {!isEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-12"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-4xl"
              >
                💌
              </motion.span>
              <h1 className="text-2xl md:text-3xl text-white/90 font-light tracking-[0.2em] uppercase">
                당신을 위한 특별한 선물이 있어요.
              </h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(225, 29, 72, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="premium-button text-white px-16 py-4 tracking-widest text-lg border-white/10"
            >
              입장하기
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isEntered && !isCelebration ? (
          <motion.div
            key="gift-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex flex-col items-center justify-center w-full h-full"
          >
            <div className="mb-20 scale-90 md:scale-100">
              <GiftBox />
            </div>

            <motion.button
              ref={buttonRef}
              animate={{ x: position.x, y: position.y }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="relative flex items-center justify-center p-8 select-none"
            >
              {/* Perfectly Balanced Symmetrical Wings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Left Wing */}
                <div className="absolute -left-16 w-20 h-16 opacity-90 animate-flap-left origin-right">
                  <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                    <path
                      d="M100,30 C100,30 60,0 10,10 C-10,20 20,50 60,50 C80,50 100,30 100,30"
                      className="fill-white/40 stroke-white/60 stroke-1"
                    />
                  </svg>
                </div>
                {/* Right Wing (Perfect Mirror) */}
                <div className="absolute -right-16 w-20 h-16 opacity-90 animate-flap-right origin-left scale-x-[-1]">
                  <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                    <path
                      d="M100,30 C100,30 60,0 10,10 C-10,20 20,50 60,50 C80,50 100,30 100,30"
                      className="fill-white/40 stroke-white/60 stroke-1"
                    />
                  </svg>
                </div>
              </div>

              <div className="premium-button text-white whitespace-nowrap px-12 py-4 text-xl font-bold bg-gradient-to-r from-rose-600 to-rose-800 shadow-[0_10px_40px_rgba(225,29,72,0.4)] border-white/20">
                선물 열기
              </div>
            </motion.button>

            {/* Subtle Tracking Progress */}
            <div className="fixed bottom-12 w-64 h-1 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-500"
                animate={{ width: `${(seconds / 30) * 100}%` }}
              />
            </div>
          </motion.div>
        ) : isCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-50 flex flex-col items-center text-center gap-12"
          >
            <motion.h2
              animate={{ textShadow: ["0 0 20px rgba(212,175,55,0.2)", "0 0 50px rgba(212,175,55,0.5)", "0 0 20px rgba(212,175,55,0.2)"] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-6xl md:text-9xl gold-text font-serif leading-tight px-4"
            >
              당신이 나의<br />최고의 선물입니다.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/40 text-xl md:text-2xl font-extralight tracking-[0.5em] uppercase"
            >
              Forever With You
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
