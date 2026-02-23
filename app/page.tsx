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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Evade logic
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isCelebration || !buttonRef.current || !isEntered) return;

    const button = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
    );

    const threshold = 150; // Distance to trigger evasion

    if (distance < threshold) {
      // Calculate new position avoiding mouse
      const moveX = (Math.random() - 0.5) * 400;
      const moveY = (Math.random() - 0.5) * 400;

      let newX = position.x + moveX;
      let newY = position.y + moveY;

      // Keep within bounds (roughly)
      const padding = 100;
      if (Math.abs(newX) > window.innerWidth / 2 - padding) newX = position.x - moveX;
      if (Math.abs(newY) > window.innerHeight / 2 - padding) newY = position.y - moveY;

      setPosition({ x: newX, y: newY });
      setMissCount(prev => prev + 1);
    }
  }, [position, isCelebration]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Timer logic
  useEffect(() => {
    if (isCelebration) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    if (seconds >= 30) {
      triggerCelebration();
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [seconds, isCelebration]);

  const triggerCelebration = () => {
    setIsCelebration(true);

    // Confetti burst
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleStartMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
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

      {/* Background Music */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder romantic-ish track
        loop
      />

      <AnimatePresence>
        {!isEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsEntered(true);
                handleStartMusic();
              }}
              className="premium-button text-white text-xl"
            >
              입장하기 (Enter the Lounge)
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isEntered && !isCelebration ? (
          <motion.div
            key="gift-view"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            className="flex flex-col items-center gap-12 z-10"
          >
            <h1 className="text-4xl md:text-6xl gold-text text-center px-4">
              당신을 위한 특별한 선물
            </h1>

            <GiftBox />

            <motion.button
              ref={buttonRef}
              animate={{ x: position.x, y: position.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              onClick={handleStartMusic} // Interaction to allow audio
              className="premium-button text-white"
            >
              열기
            </motion.button>

            <p className="text-white/40 text-sm mt-4 italic">
              마우스로 '열기'를 눌러보세요...
            </p>

            {/* Encouragement Message */}
            <AnimatePresence mode="wait">
              {missCount > 0 && (
                <motion.p
                  key={missCount}
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-red-300 text-lg font-bold mt-2"
                >
                  {getEncouragementMessage()}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="celebration-view"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-8 z-10 text-center px-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-24 h-24 text-red-500 fill-current" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl gold-text font-serif">
              당신이 나의 최고의 선물입니다
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/80 text-xl md:text-2xl mt-4"
            >
              함께하는 모든 순간이 저에겐 축복입니다.
            </motion.p>

            {/* Miss Count Display */}
            {missCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full border border-red-300/30"
              >
                <p className="text-red-200 text-lg">
                  <span className="font-bold">{missCount}번</span>의 시도 끝에 도착했네요 🎉
                </p>
                <p className="text-white/60 text-sm mt-1">
                  당신의 끈기가 우리 사랑의 증거예요
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="mt-12 glass-card p-8 rounded-2xl max-w-2xl w-full"
            >
              <h3 className="text-2xl gold-text mb-4">Portfolio of My Heart</h3>
              <p className="text-white/60 mb-6">
                저는 따뜻한 코드를 작성하고, 당신을 위한 행복을 디자인하는 개발자입니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="font-bold text-red-400">Main Skill</h4>
                  <p className="text-sm">당신을 사랑하기</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="font-bold text-red-400">Experience</h4>
                  <p className="text-sm">함께한 모든 날들</p>
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-0 -z-10 bg-red-900/20 blur-[120px] rounded-full"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Progress Bar (Subtle) */}
      {!isCelebration && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-yellow-500"
            animate={{ width: `${(seconds / 30) * 100}%` }}
          />
        </div>
      )}
    </main>
  );
}
