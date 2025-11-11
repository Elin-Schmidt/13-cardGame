import React from "react";

interface VictoryScreenProps {
    onPlayAgain: () => void;
    onBackToMenu: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ onPlayAgain, onBackToMenu }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-4xl font-bold text-black mb-4">🎉 Grattis! 🎉</h1>
                <p className="text-xl text-gray-700 mb-8">Du klarade alla 52 kort!</p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={onPlayAgain}
                        className="w-full py-3 bg-gradient-to-br from-[#FFC870] via-[#F0A543] to-[#B8860B] text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-[#D4A449]"
                    >
                        Spela igen
                    </button>

                    <button
                        onClick={onBackToMenu}
                        className="w-full py-3 bg-white/60 text-black/70 font-semibold text-lg rounded-xl shadow-md hover:bg-white/80 hover:text-black transition-all duration-200 border-2 border-gray-300"
                    >
                        Tillbaka till menyn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VictoryScreen;
