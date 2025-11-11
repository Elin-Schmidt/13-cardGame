// src/components/TwoPlayerGame.tsx
import React from "react";

interface TwoPlayerGameProps {
    onBackToMenu: () => void;
}

const TwoPlayerGame: React.FC<TwoPlayerGameProps> = ({ onBackToMenu }) => {
    return (
        <div className="p-6 flex flex-col min-h-screen bg-felt text-white relative">
            {/* Logo in top-left (fixed to viewport) - clickable to return to menu */}
            <button
                onClick={onBackToMenu}
                className="fixed top-0 left-2 z-50 hover:opacity-80 transition-opacity"
                aria-label="Tillbaka till menyn"
            >
                <img src="/logo.svg" alt="Thirteen" className="h-20 w-auto" draggable={false} />
            </button>

            {/* Main content */}
            <div className="flex flex-col flex-1 items-center justify-center">
                <h2 className="text-4xl font-bold mb-4">2 Spelare</h2>
                <p className="text-xl opacity-70">Kommer snart...</p>
            </div>
        </div>
    );
};

export default TwoPlayerGame;
