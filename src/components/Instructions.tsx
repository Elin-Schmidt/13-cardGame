import React from "react";

interface InstructionsProps {
    onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onClose }) => (
    // outer overlay closes when clicked
    <div className="fixed inset-0 flex items-center justify-center z-40" onClick={onClose}>
        {/* stop clicks inside the white box from closing */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
                className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-black"
                onClick={onClose}
                aria-label="Stäng"
            >
                &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Hur spelar man 13?</h2>
            <ul className="list-disc pl-5 space-y-2 text-base text-gray-700">
                <li>Klicka på kortleken för att dra ett kort.</li>
                <li>Det dragna kortet läggs ovanpå högen.</li>
                <li>Räkna från 1 till 13, ett steg för varje draget kort.</li>
                <li>Försök undvika att dra ett kort med samma valör som det aktuella numret!</li>
            </ul>
        </div>
    </div>
);

export default Instructions;
