// src/components/OnePlayerGame.tsx
import React, { useState } from "react";
import CardStack from "./CardStack";
import PlayArea from "./PlayArea";
import Counter from "./Counter";
import Instructions from "./Instructions";
import BackSelector from "./BackSelector";
import classic from "../assets/backs/classic.png";

interface OnePlayerGameProps {
    onBackToMenu: () => void;
}

const OnePlayerGame: React.FC<OnePlayerGameProps> = ({ onBackToMenu }) => {
    const [counterValue, setCounterValue] = useState<string | number>("Start");
    const [showInstructions, setShowInstructions] = useState(false);
    const [selectedBack, setSelectedBack] = useState<string>(classic);

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

            {/* Question mark icon in top right */}
            <button
                className="fixed top-4 right-4 text-2xl font-bold text-black/40 hover:text-black/70 transition-colors z-50 bg-white/60 rounded-full w-9 h-9 flex items-center justify-center shadow-md backdrop-blur-sm"
                onClick={() => setShowInstructions(true)}
                aria-label="Visa instruktioner"
            >
                ?
            </button>

            {/* Blur overlay when instructions are open */}
            {showInstructions && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30" />
            )}

            {/* Instructions modal */}
            {showInstructions && (
                <Instructions onClose={() => setShowInstructions(false)} />
            )}

            {/* Main app content, blurred if instructions are open */}
            <div className={`flex flex-col flex-1 ${showInstructions ? "blur-sm pointer-events-none select-none" : ""}`}>
                <div className="flex justify-center -mt-3">
                    <Counter value={counterValue} total={52} />
                </div>
                <div className="flex flex-1 flex-col justify-end items-center w-full">
                    <PlayArea>
                        <div className="-translate-y-2">
                            <CardStack setCounterValue={setCounterValue} backImage={selectedBack} />
                        </div>
                        {/* Back selector placed inside PlayArea so it's positioned relative to it */}
                        <BackSelector selected={selectedBack} setSelected={setSelectedBack} />
                    </PlayArea>
                </div>
            </div>
        </div>
    );
};

export default OnePlayerGame;
