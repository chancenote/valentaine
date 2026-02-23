"use client";

import { motion } from "framer-motion";

export default function GiftBox() {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 animate-float">
      {/* Box Body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.3)]">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-800" />

        {/* Ribbon Vertical */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 md:w-12 h-full bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-300 shadow-inner" />
        {/* Ribbon Horizontal */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-10 md:h-12 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 shadow-inner" />

        {/* Heart patterns on box */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="grid grid-cols-4 gap-6 text-white text-2xl">
            {[...Array(16)].map((_, i) => (
              <span key={i}>♥</span>
            ))}
          </div>
        </div>
      </div>

      {/* Lid */}
      <motion.div
        className="absolute top-6 md:top-4 left-1/2 -translate-x-1/2 w-60 h-14 md:w-[310px] md:h-18 rounded-xl overflow-hidden shadow-xl z-10"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-700" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 md:w-14 h-full bg-gradient-to-b from-yellow-300 to-yellow-400" />
      </motion.div>

      {/* Bow */}
      <div className="absolute -top-2 md:-top-4 left-1/2 -translate-x-1/2 z-20">
        <div className="relative">
          {/* Left loop */}
          <div className="absolute -left-8 md:-left-10 top-2 w-10 h-8 md:w-12 md:h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full rotate-[-30deg] shadow-lg" />
          {/* Right loop */}
          <div className="absolute -right-8 md:-right-10 top-2 w-10 h-8 md:w-12 md:h-10 bg-gradient-to-bl from-yellow-300 to-yellow-500 rounded-full rotate-[30deg] shadow-lg" />
          {/* Center knot */}
          <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full shadow-md z-10 mx-auto" />
          {/* Tail left */}
          <div className="absolute top-6 -left-4 w-3 h-12 bg-gradient-to-b from-yellow-400 to-yellow-300 rotate-[-15deg] rounded-b-full" />
          {/* Tail right */}
          <div className="absolute top-6 -right-4 w-3 h-12 bg-gradient-to-b from-yellow-400 to-yellow-300 rotate-[15deg] rounded-b-full" />
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-red-500/20 blur-[80px] rounded-full -z-10 animate-pulse" />
    </div>
  );
}
