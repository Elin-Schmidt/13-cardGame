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
    const [cardsRemaining, setCardsRemaining] = useState<number>(52);

    const handleVictory = () => {
        setShowVictory(true);
    };

    const handlePlayAgain = () => {
        setShowVictory(false);
        setCounterValue("Start");
        setCardsRemaining(52);
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

            {/* Main app content */}
            <div className="flex flex-col flex-1">
                {/* Back to menu button - small, discrete in top left */}
                <button
                    onClick={onBackToMenu}
                    className="fixed top-4 left-4 z-50 text-[#ede0cd] hover:text-white transition-colors text-sm uppercase tracking-wide"
                    aria-label="Tillbaka till menyn"
                    style={{
                        fontFamily: 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif',
                        textShadow: '0 0 10px rgba(240, 165, 67, 0.5), 0 1px 2px rgba(0, 0, 0, 0.8)'
                    }}
                >
                    ← Meny
                </button>

                <div className="flex justify-center mt-4">
                    <Counter value={counterValue} total={52} />
                </div>

                {/* Logo centered on screen */}
                <div className="flex flex-1 items-center justify-center">
                    <img src="/logo.svg" alt="" className="w-48 h-auto opacity-30" draggable={false} />
                </div>

                <div className="flex flex-1 flex-col justify-end items-center w-full">
                    <div className="relative w-full max-w-md mx-auto">
                        <PlayArea>
                            {/* Kort kvar text - positioned absolutely to the left, centered on PlayArea */}
                            <div
                                className="absolute left-7 top-1/2 translate-y-11 z-10 -rotate-90 text-sm font-light tracking-widest uppercase whitespace-nowrap origin-left"
                                style={{
                                    color: '#ede0cd',
                                    fontFamily: 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif',
                                    letterSpacing: '0.15em',
                                    textShadow: '0 0 20px rgba(240, 165, 67, 0.8), 0 0 10px rgba(240, 165, 67, 0.6), 0 2px 4px rgba(0, 0, 0, 0.8)'
                                }}
                            >
                                Kort kvar: <span
                                    className="font-normal tracking-wider"
                                    style={{
                                        color: '#ede0cd',
                                        fontFamily: 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif',
                                        textShadow: '0 0 25px rgba(240, 165, 67, 1), 0 0 15px rgba(240, 165, 67, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)'
                                    }}
                                >
                                    {cardsRemaining}
                                </span>
                            </div>

                            <div className="-translate-y-2">
                                <CardStack
                                    key={gameKey}
                                    setCounterValue={setCounterValue}
                                    backImage={selectedBack}
                                    onVictory={handleVictory}
                                    setCardsRemaining={setCardsRemaining}
                                />
                            </div>
                            {/* Back selector placed inside PlayArea so it's positioned relative to it */}
                            <BackSelector selected={selectedBack} setSelected={setSelectedBack} />
                        </PlayArea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnePlayerGame;
