import React, { useState, useEffect } from "react";
import Card from "./Card";
import { createDeck } from "../utils/deck";
import type { Card as CardType } from "../utils/deck";

interface CardStackProps {
    setCounterValue: (val: string | number) => void;
}

const CardStack: React.FC<CardStackProps> = ({ setCounterValue }) => {
    const [deck, setDeck] = useState<(CardType & { id: number })[]>([]);
    const [currentCard, setCurrentCard] = useState<(CardType & { id: number }) | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const newDeck = createDeck().map((card, index) => ({
            ...card,
            id: index,
        }));
        setDeck(newDeck);
    }, []);

    const handleFlip = () => {
        if (!isFlipped && deck.length > 0) {
            const randomIndex = Math.floor(Math.random() * deck.length);
            const drawnCard = deck[randomIndex];
            const newDeck = deck.filter((_, index) => index !== randomIndex);

            setCurrentCard(drawnCard);
            setDeck(newDeck);
            setIsFlipped(true);
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
            <div className="relative h-48 w-32">
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

                {/* Visar det aktiva kortet ovanför högen */}
                {currentCard && (
                    <div
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{
                            bottom: '100%',
                            marginBottom: '48px', // Större avstånd mellan högen och draget kort
                            zIndex: deck.length + 10
                        }}
                    >
                        <Card
                            card={currentCard}
                            isFlipped={isFlipped}
                            onClick={() => { }}
                            backColor="bg-blue-700"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardStack;
