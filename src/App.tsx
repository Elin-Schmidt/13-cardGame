// src/App.tsx
import React, { useState } from "react";
import Menu from "./components/Menu";
import OnePlayerGame from "./components/OnePlayerGame";
import TwoPlayerGame from "./components/TwoPlayerGame";

type GameMode = 'menu' | '1-player' | '2-player';

const App: React.FC = () => {
    const [mode, setMode] = useState<GameMode>('menu');

    const handleSelectMode = (selectedMode: '1-player' | '2-player') => {
        setMode(selectedMode);
    };

    const handleBackToMenu = () => {
        setMode('menu');
    };

    if (mode === 'menu') {
        return <Menu onSelectMode={handleSelectMode} />;
    }

    if (mode === '1-player') {
        return <OnePlayerGame onBackToMenu={handleBackToMenu} />;
    }

    if (mode === '2-player') {
        return <TwoPlayerGame onBackToMenu={handleBackToMenu} />;
    }

    return null;
};

export default App;
