// src/App.tsx
import React from "react";
import CardStack from "./components/CardStack";
import Counter from "./components/Counter";

const App: React.FC = () => {
    // Counter-värde måste beräknas här, så vi skickar ner det till Counter
    // Vi hämtar CardStack:s counterValue via en prop-funktion
    const [counterValue, setCounterValue] = React.useState<string | number>("Start");

    return (
        <div className="p-6 flex flex-col min-h-screen bg-red-100 text-black">
            <h1 className="text-3xl font-bold mb-8 text-center">13</h1>
            <div className="flex justify-center">
                <Counter value={counterValue} />
            </div>
            <div className="flex flex-1 flex-col justify-end items-center mb-20">
                <CardStack setCounterValue={setCounterValue} />
            </div>
        </div>
    );
};

export default App;
