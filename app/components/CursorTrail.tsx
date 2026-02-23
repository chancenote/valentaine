"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newParticle: Particle = {
        id: nextId,
        x: e.clientX,
        y: e.clientY,
      };

      setParticles((prev) => [...prev, newParticle]);
      setNextId((prev) => prev + 1);

      // Remove particle after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    // Throttle to avoid too many particles
    let throttleTimer: NodeJS.Timeout;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!throttleTimer) {
        handleMouseMove(e);
        throttleTimer = setTimeout(() => {
          throttleTimer = null as any;
        }, 50);
      }
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, [nextId]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute text-red-500"
            style={{
              left: particle.x - 10,
              top: particle.y - 10,
              mixBlendMode: "screen",
            }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
