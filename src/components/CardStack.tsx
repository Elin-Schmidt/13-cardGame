import React, { useState } from "react";
import { createDeck, type Card as CardType } from "../utils/deck";
import Card from "./Card";

const MAX_RANK = 13;

const CardStack: React.FC = () => {
  const [deck, setDeck] = useState<CardType[]>(createDeck());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counter, setCounter] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = () => {
    if (gameOver || flipped) return;

    setFlipped(true);

    setTimeout(() => {
      const currentCard = deck[currentIndex];

      if (currentCard.rank === counter) {
        const newDeck = [...deck.slice(currentIndex + 1), ...deck.slice(0, currentIndex + 1)];
        setDeck(newDeck);
        setCurrentIndex(0);
      } else {
        if (currentIndex + 1 >= deck.length) {
          setGameOver(true);
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      }

      setCounter((counter % MAX_RANK) + 1);
      setFlipped(false);
    }, 600); // väntar på flip-animationen
  };

  const topCard = deck[currentIndex];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Räknare: {counter}</h2>
      <Card card={topCard} flipped={flipped} onClick={handleClick} />
      {gameOver && <h3>🎉 Du vann! Alla kort vända utan match 🎉</h3>}
    </div>
  );
};

export default CardStack;
