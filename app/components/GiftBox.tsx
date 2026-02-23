"use client";

import { motion } from "framer-motion";

export default function GiftBox() {
  return (
    <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] animate-float flex items-center justify-center" style={{ perspective: '1200px' }}>

      {/* 3D Gift Box Structure */}
      <motion.div
        className="relative w-64 h-64 md:w-80 md:h-80"
        style={{ transformStyle: 'preserve-3d', rotateX: -20, rotateY: 35 }}
        animate={{ rotateY: [35, 45, 35] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-red-700 border border-red-800 shadow-inner" style={{ transform: 'translateZ(160px)' }}>
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-full bg-yellow-500 shadow-lg" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-red-900" style={{ transform: 'rotateY(180deg) translateZ(160px)' }} />

        {/* Right */}
        <div className="absolute inset-0 bg-red-800" style={{ transform: 'rotateY(90deg) translateZ(160px)' }}>
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-full bg-yellow-600 shadow-lg" />
        </div>

        {/* Left */}
        <div className="absolute inset-0 bg-red-800" style={{ transform: 'rotateY(-90deg) translateZ(160px)' }}>
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-full bg-yellow-600 shadow-lg" />
        </div>

        {/* Top (Lid) */}
        <div className="absolute inset-0 bg-red-600 shadow-2xl" style={{ transform: 'rotateX(90deg) translateZ(160px)', height: '320px', width: '320px', left: '-1px', top: '-1px' }}>
          <div className="absolute left-1/2 -translate-x-1/2 w-14 h-full bg-yellow-400 shadow-xl" />
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-14 bg-yellow-400 shadow-xl" />

          {/* Detailed Bow Knot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-500 rounded-lg shadow-2xl border-2 border-yellow-300 transform rotate-45 z-20" />
        </div>

        {/* Bottom */}
        <div className="absolute inset-0 bg-red-950" style={{ transform: 'rotateX(-90deg) translateZ(160px)' }} />
      </motion.div>

      {/* Floating Sparkles around the box */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-200 rounded-full blur-[2px]"
          animate={{
            y: [0, -40, 0],
            x: [0, (i % 2 === 0 ? 40 : -40), 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Extreme Glow */}
      <div className="absolute inset-0 bg-rose-500/10 blur-[150px] rounded-full -z-10 animate-pulse" />
    </div>
  );
}
