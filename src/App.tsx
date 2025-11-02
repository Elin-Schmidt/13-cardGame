// src/App.tsx
import React, { useState } from "react";
import CardStack from "./components/CardStack";
import PlayArea from "./components/PlayArea";
import Counter from "./components/Counter";
import Instructions from "./components/Instructions";

const App: React.FC = () => {
    const [counterValue, setCounterValue] = useState<string | number>("Start");
    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="p-6 flex flex-col min-h-screen bg-felt text-white relative">
            {/* Title in top left */}
            <h1 className="absolute top-2 left-4 text-xl font-bold text-white/70 select-none pointer-events-none">13</h1>

            {/* Question mark icon in top right */}
            <button
                className="absolute top-2 right-4 text-2xl font-bold text-black/40 hover:text-black/70 transition-colors z-20 bg-white/60 rounded-full w-9 h-9 flex items-center justify-center shadow-md backdrop-blur-sm"
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
                    <Counter value={counterValue} />
                </div>
                <div className="flex flex-1 flex-col justify-end items-center w-full">
                    <PlayArea>
                        <div className="-translate-y-2">
                            <CardStack setCounterValue={setCounterValue} />
                        </div>
                    </PlayArea>
                </div>
            </div>
        </div>
    );
};

export default App;
