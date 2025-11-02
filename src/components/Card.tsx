import React from "react";
import cardBack from "../assets/classic.png";
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
                    className={`absolute w-full h-full ${backColor} rounded-xl shadow-lg overflow-hidden`}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={cardBack}
                        alt="Kortbaksida"
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
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
                    <div className="self-start text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">{getSuitSymbol(card.suit)}</div>
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
                        {card.rank === 1 ? 'A' :
                            card.rank === 11 ? 'J' :
                                card.rank === 12 ? 'Q' :
                                    card.rank === 13 ? 'K' :
                                        (card.rank === 6 || card.rank === 9
                                            ? <span className="inline-block border-b-4 border-current pb-1">{card.rank}</span>
                                            : card.rank)
                        }
                    </div>
                    <div className="self-end text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl rotate-180">{getSuitSymbol(card.suit)}</div>
                </div>
            </div>
        </div>
    );
};

export default Card;
