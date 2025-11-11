import React from "react";

interface MenuProps {
    onSelectMode: (mode: '1-player' | '2-player') => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectMode }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen h-full bg-felt text-black p-6 relative">
            <img src="/logo.svg" alt="Thirteen" className="h-64 w-auto mb-12" draggable={false} />

            <div className="flex flex-row gap-6">
                <button
                    onClick={() => onSelectMode('1-player')}
                    className="w-[150px] aspect-square bg-gradient-to-br from-[#FFC870] via-[#F0A543] to-[#B8860B] text-black font-bold text-xl rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5),0_6px_10px_rgba(0,0,0,0.3),0_3px_5px_rgba(0,0,0,0.2),inset_0_2px_1px_rgba(255,255,255,0.9),inset_0_-2px_3px_rgba(0,0,0,0.3),inset_-2px_0_3px_rgba(0,0,0,0.2),inset_2px_0_3px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.6),0_8px_14px_rgba(0,0,0,0.4),0_4px_7px_rgba(0,0,0,0.3),inset_0_2px_1px_rgba(255,255,255,0.9),inset_0_-2px_3px_rgba(0,0,0,0.3),inset_-2px_0_3px_rgba(0,0,0,0.2),inset_2px_0_3px_rgba(255,255,255,0.4),inset_0_0_25px_rgba(255,215,0,0.4)] hover:scale-105 hover:brightness-110 transition-all duration-200 flex flex-col items-center justify-center gap-2 border-2 border-[#D4A449] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
                >
                    <svg className="w-12 h-12 relative z-10 opacity-70" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="relative z-10 opacity-80">1 Spelare</span>
                </button>

                <button
                    onClick={() => onSelectMode('2-player')}
                    className="w-[150px] aspect-square bg-gradient-to-br from-[#FFC870] via-[#F0A543] to-[#B8860B] text-black font-bold text-xl rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5),0_6px_10px_rgba(0,0,0,0.3),0_3px_5px_rgba(0,0,0,0.2),inset_0_2px_1px_rgba(255,255,255,0.9),inset_0_-2px_3px_rgba(0,0,0,0.3),inset_-2px_0_3px_rgba(0,0,0,0.2),inset_2px_0_3px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.6),0_8px_14px_rgba(0,0,0,0.4),0_4px_7px_rgba(0,0,0,0.3),inset_0_2px_1px_rgba(255,255,255,0.9),inset_0_-2px_3px_rgba(0,0,0,0.3),inset_-2px_0_3px_rgba(0,0,0,0.2),inset_2px_0_3px_rgba(255,255,255,0.4),inset_0_0_25px_rgba(255,215,0,0.4)] hover:scale-105 hover:brightness-110 transition-all duration-200 flex flex-col items-center justify-center gap-2 border-2 border-[#D4A449] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
                >
                    <svg className="w-12 h-12 relative z-10 opacity-70" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                    <span className="relative z-10 opacity-80">2 Spelare</span>
                </button>
            </div>
        </div>
    );
};

export default Menu;
