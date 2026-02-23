"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import GiftBox from "./components/GiftBox";
import LoungeBackground from "./components/LoungeBackground";
import CursorTrail from "./components/CursorTrail";
import EasterEgg from "./components/EasterEgg";
import { Heart } from "lucide-react";

export default function ValentinePage() {
  const [isEntered, setIsEntered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [seconds, setSeconds] = useState(0);
  const [isCelebration, setIsCelebration] = useState(false);
  const [missCount, setMissCount] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Button evade logic
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isCelebration || !buttonRef.current || !isEntered) return;

      const button = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = button.left + button.width / 2;
      const buttonCenterY = button.top + button.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) +
          Math.pow(e.clientY - buttonCenterY, 2)
      );

      const threshold = 150;

      if (distance < threshold) {
        const moveX = (Math.random() - 0.5) * 400;
        const moveY = (Math.random() - 0.5) * 300;

        let newX = position.x + moveX;
        let newY = position.y + moveY;

        const padding = 100;
        if (Math.abs(newX) > window.innerWidth / 2 - padding)
          newX = position.x - moveX;
        if (Math.abs(newY) > window.innerHeight / 2 - padding)
          newY = position.y - moveY;

        setPosition({ x: newX, y: newY });
        setMissCount((prev) => prev + 1);
      }
    },
    [position, isCelebration, isEntered]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Timer - 30 seconds then celebration
  useEffect(() => {
    if (!isEntered || isCelebration) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev + 1 >= 30) {
          triggerCelebration();
          clearInterval(timer);
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isEntered, isCelebration]);

  const triggerCelebration = () => {
    setIsCelebration(true);

    // Confetti burst
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff4d6d", "#ff85a1", "#fbb1bd", "#d4af37", "#fff"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff4d6d", "#ff85a1", "#fbb1bd", "#d4af37", "#fff"],
      });
    }, 250);

    // Show final message last with delay
    setTimeout(() => {
      setShowFinalMessage(true);
    }, 3000);
  };

  const handleStartMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const getEncouragementMessage = () => {
    if (missCount === 0) return "";
    if (missCount < 5) return `${missCount}번 놓쳤어요 😅`;
    if (missCount < 10) return `${missCount}번... 조금만 더!`;
    if (missCount < 20) return `${missCount}번... 포기하지 마세요! 💪`;
    if (missCount < 30) return `${missCount}번... 당신의 끈기가 놀라워요!`;
    return `${missCount}번... 당신의 끈기가 바로 사랑입니다 ❤️`;
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <LoungeBackground />
      <CursorTrail />
      <EasterEgg />

      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
      />

      {/* Entry Screen */}
      <AnimatePresence>
        {!isEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-gradient-to-b from-[#1a0011] to-black flex flex-col items-center justify-center gap-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl"
            >
              🎁
            </motion.div>
            <h1 className="text-3xl md:text-5xl gold-text font-serif text-center px-4">
              Special Gift For You
            </h1>
            <p className="text-white/50 text-sm">당신을 위한 특별한 선물이 있어요</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsEntered(true);
                handleStartMusic();
              }}
              className="premium-button text-white text-lg mt-4"
            >
              입장하기
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {isEntered && !isCelebration && (
          <motion.div
            key="gift-view"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            className="flex flex-col items-center gap-6 z-10"
          >
            <h2 className="text-2xl md:text-4xl text-white/80 font-serif text-center px-4">
              당신을 위한 선물이 도착했어요
            </h2>

            {/* Gift Box - stays in center */}
            <GiftBox />

            {/* Evading Button */}
            <motion.button
              ref={buttonRef}
              animate={{ x: position.x, y: position.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="premium-button text-white text-lg z-20"
            >
              🎀 박스 열기
            </motion.button>

            <p className="text-white/30 text-sm italic">
              버튼을 눌러서 선물을 열어보세요...
            </p>

            {/* Encouragement Message */}
            <AnimatePresence mode="wait">
              {missCount > 0 && (
                <motion.p
                  key={getEncouragementMessage()}
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-pink-300 text-lg font-bold"
                >
                  {getEncouragementMessage()}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Celebration View */}
        {isCelebration && (
          <motion.div
            key="celebration-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-6 z-10 text-center px-6"
          >
            {/* Animated Heart */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-20 h-20 text-red-500 fill-current" />
            </motion.div>

            {/* Miss Count */}
            {missCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="px-6 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full border border-pink-300/30"
              >
                <p className="text-pink-200 text-lg">
                  <span className="font-bold">{missCount}번</span>의 시도 끝에 도착했네요 🎉
                </p>
              </motion.div>
            )}

            {/* Portfolio Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="glass-card p-8 rounded-2xl max-w-2xl w-full"
            >
              <h3 className="text-2xl gold-text mb-4 font-serif">
                Portfolio of My Heart
              </h3>
              <p className="text-white/60 mb-6">
                저는 따뜻한 코드를 작성하고, 당신을 위한 행복을 디자인하는 개발자입니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-pink-300/10">
                  <h4 className="font-bold text-pink-400">Main Skill</h4>
                  <p className="text-sm text-white/60">당신을 사랑하기</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-pink-300/10">
                  <h4 className="font-bold text-pink-400">Experience</h4>
                  <p className="text-sm text-white/60">함께한 모든 날들</p>
                </div>
              </div>
            </motion.div>

            {/* FINAL MESSAGE - appears last */}
            <AnimatePresence>
              {showFinalMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="mt-8"
                >
                  <motion.h2
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(212,175,55,0.3)",
                        "0 0 40px rgba(212,175,55,0.6)",
                        "0 0 20px rgba(212,175,55,0.3)",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="text-4xl md:text-6xl gold-text font-serif leading-tight"
                  >
                    당신이 나의<br />최고의 선물입니다
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-white/60 text-xl mt-6"
                  >
                    함께하는 모든 순간이 저에겐 축복입니다.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 -z-10 bg-red-900/20 blur-[120px] rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      {isEntered && !isCelebration && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"
            animate={{ width: `${(seconds / 30) * 100}%` }}
          />
        </div>
      )}
    </main>
  );
}
