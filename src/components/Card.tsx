import React from "react";
import cardBack from "../assets/backs/classic.png";
import type { Card as CardType } from "../utils/deck";

interface CardProps {
    isFlipped: boolean;
    onClick: () => void;
    frontColor?: string;
    backColor?: string;
    card: CardType;
    backImage?: string;
}

const Card: React.FC<CardProps> = ({
    isFlipped,
    onClick,
    backColor = "bg-blue-700",
    backImage,
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
                        src={backImage ?? cardBack}
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
                    {/* Övre hörnet - rank och suit */}
                    <div className="self-start flex flex-col items-center leading-tight">
                        <div className="text-2xl font-bold">
                            {card.rank === 1 ? 'A' :
                                card.rank === 11 ? 'J' :
                                    card.rank === 12 ? 'Q' :
                                        card.rank === 13 ? 'K' :
                                            (card.rank === 6 || card.rank === 9
                                                ? <span className="underline decoration-2 underline-offset-2">{card.rank}</span>
                                                : card.rank)
                            }
                        </div>
                        <div className="text-2xl -mt-2.5">{getSuitSymbol(card.suit)}</div>
                    </div>

                    {/* Mitten - stor symbol */}
                    <div className="text-5xl font-bold">
                        {card.rank === 1 ? 'A' :
                            card.rank === 11 ? 'J' :
                                card.rank === 12 ? 'Q' :
                                    card.rank === 13 ? 'K' :
                                        (card.rank === 6 || card.rank === 9
                                            ? <span className="underline decoration-4 underline-offset-[6px]">{card.rank}</span>
                                            : card.rank)
                        }
                    </div>

                    {/* Nedre hörnet - rank och suit (upp och ner) */}
                    <div className="self-end flex flex-col items-center leading-tight rotate-180">
                        <div className="text-2xl font-bold">
                            {card.rank === 1 ? 'A' :
                                card.rank === 11 ? 'J' :
                                    card.rank === 12 ? 'Q' :
                                        card.rank === 13 ? 'K' :
                                            (card.rank === 6 || card.rank === 9
                                                ? <span className="underline decoration-2 underline-offset-2">{card.rank}</span>
                                                : card.rank)
                            }
                        </div>
                        <div className="text-2xl -mt-2.5">{getSuitSymbol(card.suit)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
