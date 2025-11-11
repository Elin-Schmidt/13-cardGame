import React, { useState, useEffect } from "react";
import Card from "./Card";
import { createDeck } from "../utils/deck";
import type { Card as CardType } from "../utils/deck";

interface CardStackProps {
    setCounterValue: (val: string | number) => void;
    backImage?: string;
}

const CardStack: React.FC<CardStackProps> = ({ setCounterValue, backImage }) => {
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

    // (shuffle helper removed — not used currently)

    const [pendingReturn, setPendingReturn] = useState(false);
    const [returnStage, setReturnStage] = useState<'idle' | 'flip' | 'move'>('idle');

    const handleFlip = () => {
        if (returnStage !== 'idle') return; // block draws while returning animation runs
        if (pendingReturn) {
            // user clicked to confirm return: start flip then move animation
            const FLIP_MS = 350;
            const MOVE_MS = 600;

            setReturnStage('flip');
            // after flip, start move
            setTimeout(() => setReturnStage('move'), FLIP_MS);

            // after flip+move, merge cards back into deck and clear
            const cardsToReturn = drawnCards.map(card => ({ suit: card.suit, rank: card.rank, id: card.id } as CardType & { id: number }));
            setTimeout(() => {
                // put returned cards under the rest of the deck (append to end)
                const mergedUnder = [...deck, ...cardsToReturn];
                setDeck(mergedUnder);
                setDrawnCards([]);
                setReturnStage('idle');
                setPendingReturn(false);
            }, FLIP_MS + MOVE_MS);

            return;
        }
        if (deck.length > 0) {
            const randomIndex = Math.floor(Math.random() * deck.length);
            const drawnCard = deck[randomIndex];
            const newDeck = deck.filter((_, index) => index !== randomIndex);
            // assign a small random rotation between -8 and +8 degrees
            const angle = Math.random() * 16 - 8;

            // prepare new drawn list (the newly drawn card sits on top)
            const newDrawn = [{ ...drawnCard, angle }, ...drawnCards];

            // compute what the counter would be after this draw
            const TOTAL_PER_SUIT = 13;
            const TOTAL_CARDS = 52;
            const drawnCountAfter = TOTAL_CARDS - newDeck.length; // includes the just-drawn card
            // matchCounter is the 1..13 value used when comparing against card ranks
            const matchCounterAfter = drawnCountAfter === 0 ? "Start" : ((drawnCountAfter - 1) % TOTAL_PER_SUIT) + 1;

            // if the drawn card's rank equals the match counter after the draw, mark for return on next click
            if (typeof matchCounterAfter === "number" && drawnCard.rank === matchCounterAfter) {
                // place the card on the table and set pendingReturn so the next click triggers the return animation
                setDrawnCards(newDrawn);
                setDeck(newDeck);
                setPendingReturn(true);
            } else {
                // normal case: place the card on the table
                setDrawnCards(newDrawn);
                setDeck(newDeck);
            }
        }
    };

    // Counter: "Start" om inget kort dragits, annars antal utlagda kort (1..52)
    const TOTAL_CARDS = 52;
    const drawn = TOTAL_CARDS - deck.length;
    const counterValue = drawn === 0 ? "Start" : drawn;
    React.useEffect(() => {
        setCounterValue(counterValue);
    }, [counterValue, setCounterValue]);

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="relative h-40 w-28">
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
                            backImage={backImage}
                        />
                    </div>
                ))}

                {/* Visa alla dragna kort ovanför högen, senaste kortet överst (högst z-index) */}
                {[...drawnCards].reverse().map((card, i) => {
                    const baseTransform = `translateX(-50%) rotate(${card.angle}deg)`;
                    const moveTransform = `translateX(-50%) translateY(80px) rotate(0deg) scale(0.75)`;
                    const isMoving = returnStage === 'move';
                    // When moving back under the deck we hide the cards (opacity:0)
                    // so they don't visibly stick out under the deck during the animation.
                    return (
                        <div
                            key={card.id}
                            className="absolute left-1/2 -translate-x-1/2 transition-all duration-600 ease-out"
                            style={{
                                bottom: isMoving ? '0%' : '100%',
                                marginBottom: isMoving ? `8px` : `64px`, // lift drawn cards higher above the stack normally, return to near deck when moving
                                zIndex: isMoving ? 0 : deck.length + 10 + i,
                                transform: isMoving ? moveTransform : baseTransform,
                                opacity: isMoving ? 0 : 1,
                                pointerEvents: isMoving ? 'none' : 'auto'
                            }}
                        >
                            <Card
                                card={card}
                                // show front only when not returning; during flip/move show back
                                isFlipped={returnStage === 'idle'}
                                onClick={() => { }}
                                backColor="bg-blue-700"
                                backImage={backImage}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardStack;
