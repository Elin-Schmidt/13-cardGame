import React, { useState, useEffect } from "react";
import Card from "./Card";
import { createDeck } from "../utils/deck";
import type { Card as CardType } from "../utils/deck";

const CardStack: React.FC = () => {
    const [cards, setCards] = useState<(CardType & { id: number })[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);

    useEffect(() => {
        const deck = createDeck().map((card, index) => ({
            ...card,
            id: index,
        }));
        setCards(deck);
    }, []);

    const handleFlip = (id: number) => {
        if (flippedCards.includes(id)) return;
        setFlippedCards([...flippedCards, id]);
    };

    return (
        <div className="flex flex-col items-center gap-4 bg-white p-10 rounded-xl">
            <div className="flex flex-wrap gap-2 max-w-4xl justify-center">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="relative"
                    >
                        <Card
                            card={card}
                            isFlipped={flippedCards.includes(card.id)}
                            onClick={() => handleFlip(card.id)}
                            backColor="bg-blue-700"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardStack;
