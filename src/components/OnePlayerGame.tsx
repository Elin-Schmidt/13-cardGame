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
    const [showMenu, setShowMenu] = useState<boolean>(false);

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
                {/* Menu slider button - left side */}
                <button
                    onClick={() => setShowMenu(true)}
                    className="fixed left-0 top-1/2 -translate-y-1/2 z-50 text-[#ede0cd] hover:text-white transition-all bg-black/30 backdrop-blur-sm border-2 border-l-0 border-[#F0A543] rounded-r-lg p-2 hover:pr-3"
                    aria-label="Öppna meny"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Menu slider overlay */}
                {showMenu && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                            onClick={() => setShowMenu(false)}
                        />

                        {/* Slider panel */}
                        <div className="fixed left-0 top-0 bottom-0 w-64 bg-felt border-r-2 border-[#F0A543] z-50 flex flex-col p-6 shadow-2xl">
                            {/* Header with logo and close button */}
                            <div className="flex items-center justify-between mb-6">
                                <img src="/logo.svg" alt="Thirteen" className="h-16 w-auto opacity-80" draggable={false} />
                                <button
                                    onClick={() => setShowMenu(false)}
                                    className="text-[#ede0cd] hover:text-white transition-colors"
                                    aria-label="Stäng meny"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="mb-6 px-4">
                                <div className="h-px bg-gradient-to-r from-transparent via-[#F0A543] to-transparent opacity-50"></div>
                            </div>

                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    onBackToMenu();
                                }}
                                className="bg-gradient-to-br from-[#FFC870] via-[#F0A543] to-[#B8860B] text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-lg"
                                style={{
                                    fontFamily: 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif',
                                }}
                            >
                                ← Tillbaka till menyn
                            </button>
                        </div>
                    </>
                )}

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
