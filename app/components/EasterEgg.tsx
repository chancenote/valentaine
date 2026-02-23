"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export default function EasterEgg() {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeySequence((prev) => {
        const newSequence = [...prev, e.code].slice(-10);

        // Check if konami code is completed
        if (newSequence.join(",") === KONAMI_CODE.join(",")) {
          setIsUnlocked(true);
          setShowModal(true);
          return [];
        }

        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            transition={{ type: "spring", damping: 15 }}
            className="glass-card p-8 rounded-3xl max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-yellow-400 w-8 h-8" />
              <h2 className="text-3xl gold-text font-serif">비밀 보물 발견!</h2>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-red-500/20 to-pink-500/20 p-6 rounded-2xl border border-red-300/30"
              >
                <h3 className="text-xl text-red-300 mb-3 font-bold">당신만 찾을 수 있는 메시지</h3>
                <p className="text-white/80 leading-relaxed">
                  이 숨겨진 메시지를 찾아낸 당신은 정말 특별한 사람입니다.
                  게임 속 비밀 코드처럼, 우리의 관계도 남들은 모르는 특별한 순간들로 가득하죠.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-3xl mb-2">🎮</div>
                  <h4 className="text-red-300 font-bold mb-1">첫 만남</h4>
                  <p className="text-sm text-white/60">우연처럼 필연이었던 순간</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-3xl mb-2">💝</div>
                  <h4 className="text-red-300 font-bold mb-1">첫 데이트</h4>
                  <p className="text-sm text-white/60">설렘이 가득했던 그날</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-3xl mb-2">🌟</div>
                  <h4 className="text-red-300 font-bold mb-1">특별한 약속</h4>
                  <p className="text-sm text-white/60">함께한 모든 순간들</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-3xl mb-2">♾️</div>
                  <h4 className="text-red-300 font-bold mb-1">앞으로도</h4>
                  <p className="text-sm text-white/60">계속될 우리의 이야기</p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center text-white/50 text-sm italic"
              >
                "모든 게임에는 숨겨진 보물이 있듯이, 우리 사랑에도 끝없는 놀라움이 숨어있어요."
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Subtle hint for konami code */}
      {!isUnlocked && (
        <div className="fixed bottom-4 right-4 text-white/20 text-xs z-10 font-mono">
          ↑↑↓↓←→←→BA
        </div>
      )}
    </AnimatePresence>
  );
}
