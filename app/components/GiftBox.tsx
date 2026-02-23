"use client";

import { motion } from "framer-motion";

export default function GiftBox() {
    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
            {/* Box Body */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 md:w-60 md:h-60 bg-red-800 rounded-lg shadow-2xl"
                initial={{ rotateY: 45 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Ribbon Vertical */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-full bg-yellow-500 shadow-inner"></div>
                {/* Ribbon Horizontal */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-10 bg-yellow-500 shadow-inner"></div>

                {/* Front Face */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-900 rounded-lg opacity-80"></div>
            </motion.div>

            {/* Lid */}
            <motion.div
                className="absolute top-10 left-1/2 -translate-x-1/2 w-52 h-12 md:w-64 md:h-16 bg-red-700 rounded-md shadow-xl z-10"
                initial={{ rotateY: 45, y: -20 }}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-yellow-400"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>

            {/* Bow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20">
                <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-500 rounded-full blur-[1px] shadow-lg flex items-center justify-center transform rotate-45">
                        <div className="w-full h-full border-4 border-yellow-300 rounded-full opacity-50"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-md z-30"></div>
                </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-red-500/20 blur-[60px] rounded-full -z-10 animate-pulse"></div>
        </div>
    );
}
