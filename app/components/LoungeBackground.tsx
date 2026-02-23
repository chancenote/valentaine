"use client";

export default function LoungeBackground() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-[#050510]">
            {/* Central Park View (Window) */}
            <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#0a0a20] to-[#1a1a3a] flex justify-center">
                {/* Subtle Park Highlights */}
                <div className="absolute bottom-10 w-[120vw] h-40 bg-green-900/10 blur-[100px] rounded-full central-park-glow"></div>
                {/* Distant City Lights */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-yellow-200/40 blur-[1px]"
                        style={{
                            top: `${Math.random() * 40}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            boxShadow: '0 0 10px rgba(253, 224, 71, 0.4)'
                        }}
                    ></div>
                ))}
            </div>

            {/* Hotel Lounge Interior Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>

            {/* Window Frames */}
            <div className="absolute inset-0 flex">
                <div className="w-1 bg-white/5 h-full ml-[25%] shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
                <div className="w-1 bg-white/5 h-full ml-[25%] shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
                <div className="w-1 bg-white/5 h-full ml-[25%] shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
            </div>

            {/* Decorative Golden Orbs (Interior Lights) */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-600/10 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-600/10 blur-[100px] rounded-full"></div>

            {/* Ambient Floor Reflection */}
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        </div>
    );
}
