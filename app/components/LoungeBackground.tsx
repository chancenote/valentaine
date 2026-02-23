"use client";

import { useEffect, useState } from "react";

export default function LoungeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-black -z-20" />;

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-[#0a0505]">
      {/* High-quality background image (Luxury Hotel Lounge) */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.35] blur-[2px]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000')`,
          transition: 'filter 2s ease-in-out'
        }}
      />

      {/* Central Park Simulation (Outside lights) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* High-end interior lighting simulation */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-amber-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-rose-900/10 blur-[150px] rounded-full" />

      {/* Floating dust/sparkles for atmosphere */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 blur-[1px] animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  );
}
