// src/components/OnePlayerGame.tsx
import React, { useState } from "react";
import CardStack from "./CardStack";
import PlayArea from "./PlayArea";
import Counter from "./Counter";
import BackSelector from "./BackSelector";
import VictoryScreen from "./VictoryScreen";
import classic from "../assets/backs/classic.png";

interface OnePlayerGameProps {
    onBackToMenu: () => void;
}

const OnePlayerGame: React.FC<OnePlayerGameProps> = ({ onBackToMenu }) => {
    const [counterValue, setCounterValue] = useState<string | number>("Start");
    const [selectedBack, setSelectedBack] = useState<string>(classic);
    const [showVictory, setShowVictory] = useState(false);
    const [gameKey, setGameKey] = useState(0);

    const handleVictory = () => {
        setShowVictory(true);
    };

    const handlePlayAgain = () => {
        setShowVictory(false);
        setCounterValue("Start");
        setGameKey(prev => prev + 1); // Force CardStack to remount and reset
    };

    return (
        <div className="p-6 flex flex-col min-h-screen bg-felt text-white relative">
            {/* Victory Screen */}
            {showVictory && (
                <VictoryScreen
                    onPlayAgain={handlePlayAgain}
                    onBackToMenu={onBackToMenu}
                />
            )}

            {/* Logo in top-left (fixed to viewport) - clickable to return to menu */}
            <button
                onClick={onBackToMenu}
                className="fixed top-0 left-2 z-50 hover:opacity-80 transition-opacity"
                aria-label="Tillbaka till menyn"
            >
                <img src="/logo.svg" alt="Thirteen" className="h-20 w-auto" draggable={false} />
            </button>

            {/* Main app content */}
            <div className="flex flex-col flex-1">
                <div className="flex justify-center -mt-3">
                    <Counter value={counterValue} total={52} />
                </div>
                <div className="flex flex-1 flex-col justify-end items-center w-full">
                    <PlayArea>
                        <div className="-translate-y-2">
                            <CardStack
                                key={gameKey}
                                setCounterValue={setCounterValue}
                                backImage={selectedBack}
                                onVictory={handleVictory}
                            />
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
