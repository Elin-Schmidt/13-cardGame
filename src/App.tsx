// src/App.tsx
import React from "react";
import CardStack from "./components/CardStack";

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-black">
      <h1 className="text-3xl font-bold mb-8">Flip & Don't Match - Kortspel</h1>
      <CardStack />
    </div>
  );
};

export default App;
