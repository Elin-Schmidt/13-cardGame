import React from "react";
import type { Card as CardType } from "../utils/deck";

interface CardProps {
    isFlipped: boolean;
    onClick: () => void;
    frontColor?: string;
    backColor?: string;
    card: CardType;
}

const Card: React.FC<CardProps> = ({
    isFlipped,
    onClick,
    backColor = "bg-blue-700",
    card,
}) => {
    const getSuitSymbol = (suit: CardType["suit"]) => {
        switch (suit) {
            case "hearts": return "♥";
            case "diamonds": return "♦";
            case "clubs": return "♣";
            case "spades": return "♠";
        }
    };
    return (
        <div
            className="relative w-32 h-48 cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={onClick}
        >
            <div
                className={`absolute w-full h-full transition-transform duration-500 ease-in-out`}
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : ""
                }}
            >
                {/* Baksida */}
                <div
                    className={`absolute w-full h-full ${backColor} rounded-xl shadow-lg flex items-center justify-center text-white text-lg`}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    🂠
                </div>

                {/* Framsida */}
                <div
                    className={`absolute w-full h-full ${card.suit === "hearts" || card.suit === "diamonds"
                            ? "bg-white text-red-600"
                            : "bg-white text-black"
                        } rounded-xl shadow-lg flex flex-col items-center justify-between p-2`}
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden"
                    }}
                >
                    <div className="self-start text-xl">{getSuitSymbol(card.suit)}</div>
                    <div className="text-3xl font-bold">
                        {card.rank === 1 ? 'A' :
                            card.rank === 11 ? 'J' :
                                card.rank === 12 ? 'Q' :
                                    card.rank === 13 ? 'K' :
                                        card.rank}
                    </div>
                    <div className="self-end text-xl rotate-180">{getSuitSymbol(card.suit)}</div>
                </div>
            </div>
        </div>
    );
};

export default Card;
