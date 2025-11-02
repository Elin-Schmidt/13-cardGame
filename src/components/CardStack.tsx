import React, { useState, useEffect } from "react";
import Card from "./Card";
import { createDeck } from "../utils/deck";
import type { Card as CardType } from "../utils/deck";

interface CardStackProps {
    setCounterValue: (val: string | number) => void;
}

const CardStack: React.FC<CardStackProps> = ({ setCounterValue }) => {
    const [deck, setDeck] = useState<(CardType & { id: number })[]>([]);
    // Each drawn card carries a random angle for a natural pile look
    const [drawnCards, setDrawnCards] = useState<(CardType & { id: number; angle: number })[]>([]);

    useEffect(() => {
        const newDeck = createDeck().map((card, index) => ({
            ...card,
            id: index,
        }));
        setDeck(newDeck);
    }, []);

    const handleFlip = () => {
        if (deck.length > 0) {
            const randomIndex = Math.floor(Math.random() * deck.length);
            const drawnCard = deck[randomIndex];
            const newDeck = deck.filter((_, index) => index !== randomIndex);
            // assign a small random rotation between -8 and +8 degrees
            const angle = Math.random() * 16 - 8;
            setDrawnCards(prev => [{ ...drawnCard, angle }, ...prev]);
            setDeck(newDeck);
        }
    };

    // Counter: "Start" om inget kort dragits, annars 1-13, loopar om
    const TOTAL_PER_SUIT = 13;
    const TOTAL_CARDS = 52;
    const drawn = TOTAL_CARDS - deck.length;
    const counterValue = drawn === 0 ? "Start" : ((drawn - 1) % TOTAL_PER_SUIT) + 1;
    React.useEffect(() => {
        setCounterValue(counterValue);
    }, [counterValue, setCounterValue]);

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="relative h-40 w-28 sm:h-48 sm:w-32 md:h-56 md:w-40">
                {/* Stack av kort som inte är vända */}
                {deck.map((_, index) => (
                    <div
                        key={index}
                        className="absolute"
                        style={{
                            transform: `translate(${-index * 0.5}px, ${-index * 0.5}px)`,
                            zIndex: index
                        }}
                    >
                        <Card
                            card={{ suit: "hearts", rank: 1 }} // Dummy card för baksidan
                            isFlipped={false}
                            onClick={index === deck.length - 1 ? handleFlip : () => { }}
                            backColor="bg-blue-700"
                        />
                    </div>
                ))}

                {/* Visa alla dragna kort ovanför högen, senaste kortet överst (högst z-index) */}
                {[...drawnCards].reverse().map((card, i) => (
                    <div
                        key={card.id}
                        className="absolute left-1/2 -translate-x-1/2 transition-transform duration-500 ease-out"
                        style={{
                            bottom: '100%',
                            marginBottom: `64px`, // lift drawn cards higher above the stack
                            zIndex: deck.length + 10 + i,
                            transform: `translateX(-50%) rotate(${card.angle}deg)`
                        }}
                    >
                        <Card
                            card={card}
                            isFlipped={true}
                            onClick={() => { }}
                            backColor="bg-blue-700"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardStack;
