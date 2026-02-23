"use client";

import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function LoungeBackground() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-gradient-to-b from-[#1a0011] via-[#0d0008] to-[#050005]">
      {/* Romantic gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/10 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-900/8 blur-[200px] rounded-full" />

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ♥
        </div>
      ))}

      {/* Sparkle dots */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute rounded-full bg-pink-200/30 animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  );
}
