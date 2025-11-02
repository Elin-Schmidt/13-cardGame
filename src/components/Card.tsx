// src/components/Card.tsx
import React from "react";
import { motion } from "framer-motion";
import { type Card as CardType } from "../utils/deck";

interface Props {
  card: CardType;
  flipped: boolean;
  onClick: () => void;
}

const Card: React.FC<Props> = ({ card, flipped, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      style={{
        width: "100px",
        height: "150px",
        perspective: 1000,
        cursor: "pointer",
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Baksidan */}
        <div
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: "blue",
            color: "white",
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            borderRadius: "8px",
          }}
        >
          Kort
        </div>

        {/* Framsidan */}
        <div
          style={{
            backfaceVisibility: "hidden",
            backgroundColor: "white",
            color: "black",
            width: "100%",
            height: "100%",
            position: "absolute",
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            borderRadius: "8px",
          }}
        >
          {card.rank} {card.suit}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
