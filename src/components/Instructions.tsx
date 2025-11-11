import React from "react";

interface InstructionsProps {
    onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onClose }) => (
    // outer overlay closes when clicked
    <div className="fixed inset-0 flex items-start justify-center z-40 px-2" onClick={onClose}>
        {/* stop clicks inside the white box from closing */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto mt-2" onClick={(e) => e.stopPropagation()}>
            <button
                className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-black"
                onClick={onClose}
                aria-label="Stäng"
            >
                &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-left text-black">Hur spelar man 13?</h2>

            <div className="space-y-6 text-gray-700">
                <div>
                    <h3 className="font-bold text-lg mb-2 text-black">Grundregler</h3>
                    <ul className="list-disc pl-5 space-y-1 text-base">
                        <li>Räkna från 1 till 13 (Ess till Kung), ett steg för varje draget kort.</li>
                        <li>Om kortet matchar räknaren - du förlorar!</li>
                        <li>Målet är att ta sig igenom hela leken utan att matcha.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2 text-black">1 Spelare</h3>
                    <ul className="list-disc pl-5 space-y-1 text-base">
                        <li>Klicka på kortleken för att dra ett kort.</li>
                        <li>Det dragna kortet läggs i mittenhögen.</li>
                        <li>Undvik att dra ett kort som matchar räknaren!</li>
                        <li>Varje 13:e kort får en guldkant som indikator.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2 text-black">2 Spelare</h3>
                    <ul className="list-disc pl-5 space-y-1 text-base">
                        <li>Korten delas lika mellan spelarna (26 var).</li>
                        <li>Turas om att lägga kort i mittenhögen.</li>
                        <li>Om kortet matchar räknaren - klicka för att samla alla kort i mitten!</li>
                        <li>Första spelaren som blir av med alla kort vinner.</li>
                        <li>Använd växlingsikonen för att välja kortbaksida.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

export default Instructions;
