// src/components/TwoPlayerGame.tsx
import React, { useState, useEffect } from "react";
import { createDeck, type Card } from "../utils/deck";
import CardComponent from "./Card";
import classic from "../assets/backs/classic.png";

interface TwoPlayerGameProps {
    onBackToMenu: () => void;
}

const TwoPlayerGame: React.FC<TwoPlayerGameProps> = ({ onBackToMenu }) => {
    const [player1Cards, setPlayer1Cards] = useState<Card[]>([]);
    const [player2Cards, setPlayer2Cards] = useState<Card[]>([]);
    const [middlePile, setMiddlePile] = useState<(Card & { angle: number })[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [counterValue, setCounterValue] = useState<number | "Start" | "">("Start");
    const [winner, setWinner] = useState<1 | 2 | null>(null);
    const [selectedBack] = useState<string>(classic);
    const [isMatched, setIsMatched] = useState<boolean>(false);

    // Dela ut korten vid start
    useEffect(() => {
        const deck = createDeck();
        setPlayer1Cards(deck.slice(0, 26));
        setPlayer2Cards(deck.slice(26, 52));
    }, []);

    // Kolla vinstvillkor
    useEffect(() => {
        if (player1Cards.length === 0 && middlePile.length > 0) {
            setWinner(1);
        } else if (player2Cards.length === 0 && middlePile.length > 0) {
            setWinner(2);
        }
    }, [player1Cards.length, player2Cards.length, middlePile.length]);

    const playCard = (player: 1 | 2) => {
        if (currentPlayer !== player || winner) return;

        const cards = player === 1 ? player1Cards : player2Cards;
        if (cards.length === 0) return;

        // Om det finns en match, samla in korten med animation
        if (isMatched) {
            const cardsToCollect = middlePile.map(({ angle: _angle, ...card }) => card);

            // Animera borttagning av korten från mittenhögen
            setTimeout(() => {
                if (player === 1) {
                    setPlayer1Cards(prev => [...prev, ...cardsToCollect]);
                } else {
                    setPlayer2Cards(prev => [...prev, ...cardsToCollect]);
                }
                setMiddlePile([]);
                setIsMatched(false);
                // Nollställ countern när korten samlas in
                setCounterValue("");
                // Byt tur efter att ha samlat in kort
                setCurrentPlayer(player === 1 ? 2 : 1);
            }, 300);
            return;
        }

        const playedCard = cards[cards.length - 1]; // Ta översta kortet
        const remainingCards = cards.slice(0, -1);
        const angle = Math.random() * 20 - 10; // Slumpmässig vinkel -10 till +10 grader

        // Uppdatera spelarens kort
        if (player === 1) {
            setPlayer1Cards(remainingCards);
        } else {
            setPlayer2Cards(remainingCards);
        }

        // Lägg kortet i mittenhögen med vinkel
        const newPile = [...middlePile, { ...playedCard, angle }];
        setMiddlePile(newPile);

        // Uppdatera counter (Start/"" -> 1 -> 2 -> ... -> 13 -> 1)
        const currentCount = (counterValue === "Start" || counterValue === "") ? 0 : counterValue;
        const nextCounter = (currentCount % 13) + 1;
        setCounterValue(nextCounter);

        // Kolla om kortet matchar counter-värdet (card.rank är 1-13)
        if (counterValue !== "Start" && counterValue !== "" && playedCard.rank === nextCounter) {
            // Markera att det finns en match - spelaren måste klicka igen för att samla
            setIsMatched(true);
            // Tur stannar hos samma spelare
        } else {
            // Byt tur om ingen match
            setCurrentPlayer(player === 1 ? 2 : 1);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-felt text-white relative overflow-hidden">

            {/* Spelare 1 - Upptill (roterad 180°) */}
            <div className="flex items-start justify-center rotate-180">
                <div className="relative w-full max-w-md mx-auto">
                    {/* Counter för spelare 1 (roterad 180°) - precis ovanför PlayArea */}
                    <div
                        className={`absolute -top-20 z-40 transition-all duration-700 ease-out ${(counterValue === "Start" || counterValue === "")
                            ? 'left-1/2 -translate-x-1/2'
                            : 'left-4'
                            }`}
                    >
                        <span
                            className="text-4xl font-bold text-white/30 tabular-nums select-none"
                            style={{
                                fontFamily: 'monospace',
                                fontWeight: 900,
                                letterSpacing: '-0.05em'
                            }}
                        >
                            {counterValue}
                        </span>
                    </div>

                    <div
                        className="rounded-3xl bg-amber-900/10 p-2 shadow-lg"
                        style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(255,255,255,0.02))" }}
                    >
                        <div className="rounded-2xl bg-felt p-3 flex flex-col items-center justify-center gap-2">
                            <div
                                className={`relative h-48 w-32 ${currentPlayer === 1 && !winner && player1Cards.length > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                                onClick={currentPlayer === 1 && !winner && player1Cards.length > 0 ? () => playCard(1) : undefined}
                            >
                                {/* Stack av kort */}
                                {player1Cards.length > 0 ? (
                                    player1Cards.slice(0, Math.min(10, player1Cards.length)).map((card, index) => (
                                        <div
                                            key={index}
                                            className="absolute top-0"
                                            style={{
                                                transform: `translate(${-index * 0.5}px, ${index * 0.5}px)`,
                                                zIndex: index
                                            }}
                                        >
                                            <CardComponent
                                                card={card}
                                                isFlipped={false}
                                                onClick={() => { }}
                                                backImage={selectedBack}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-32 h-48 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
                                        <span className="text-white/30 text-sm">Slut</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-white/70 text-sm">
                                Antal kort: {player1Cards.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skiljelinje i mitten - med gap för mittenhögen */}
            <div className="absolute top-1/2 left-0 right-0 z-20 flex items-center">
                {/* Vänster del av linjen */}
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-white/10 mr-4"></div>
                {/* Gap för mittenhögen */}
                <div className="w-32"></div>
                {/* Höger del av linjen */}
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/20 to-white/10 ml-4"></div>
            </div>

            {/* Mittenhög med uppvända kort */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="relative" style={{ width: '160px', height: '240px' }}>
                    {middlePile.length > 0 ? (
                        middlePile.map((card, index) => (
                            <div
                                key={index}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${card.angle}deg)`,
                                    zIndex: index
                                }}
                            >
                                <CardComponent
                                    card={card}
                                    isFlipped={true}
                                    onClick={() => { }}
                                    backImage={selectedBack}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-48 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
                            <span className="text-white/30 text-sm">Tom</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Vinstmeddelande */}
            {winner && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 text-center max-w-md">
                        <h2 className="text-4xl font-bold text-green-600 mb-4">🎉 Spelare {winner} vinner! 🎉</h2>
                        <p className="text-gray-700 mb-6">Grattis! Du blev först av med alla dina kort.</p>
                        <button
                            onClick={onBackToMenu}
                            className="bg-gradient-to-br from-[#FFC870] via-[#F0A543] to-[#B8860B] text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all"
                        >
                            Tillbaka till menyn
                        </button>
                    </div>
                </div>
            )}

            {/* Spelare 2 - Nertill */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                {/* Counter för spelare 2 - precis ovanför PlayArea */}
                <div
                    className={`absolute -top-20 z-40 transition-all duration-700 ease-out ${(counterValue === "Start" || counterValue === "")
                        ? 'left-1/2 -translate-x-1/2'
                        : 'left-4'
                        }`}
                >
                    <span
                        className="text-4xl font-bold text-white/30 tabular-nums select-none"
                        style={{
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            letterSpacing: '-0.05em'
                        }}
                    >
                        {counterValue}
                    </span>
                </div>

                <div className="relative w-full max-w-md mx-auto">
                    <div
                        className="rounded-3xl bg-amber-900/10 p-2 shadow-lg"
                        style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(255,255,255,0.02))" }}
                    >
                        <div className="rounded-2xl bg-felt p-3 flex flex-col items-center justify-center gap-1">
                            <div
                                className={`relative h-48 w-32 ${currentPlayer === 2 && !winner && player2Cards.length > 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                                onClick={currentPlayer === 2 && !winner && player2Cards.length > 0 ? () => playCard(2) : undefined}
                            >
                                {/* Stack av kort */}
                                {player2Cards.length > 0 ? (
                                    player2Cards.slice(0, Math.min(10, player2Cards.length)).map((card, index) => (
                                        <div
                                            key={index}
                                            className="absolute top-0"
                                            style={{
                                                transform: `translate(${-index * 0.5}px, ${-index * 0.5}px)`,
                                                zIndex: index
                                            }}
                                        >
                                            <CardComponent
                                                card={card}
                                                isFlipped={false}
                                                onClick={() => { }}
                                                backImage={selectedBack}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-32 h-48 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
                                        <span className="text-white/30 text-sm">Slut</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-white/70 text-sm">
                                Antal kort: {player2Cards.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoPlayerGame;
