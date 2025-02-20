import { useState, useEffect } from "react";
import { shuffle } from "lodash-es";

type MemoryGameProps = {
  images: string[];
};

type MemoryGameCard = {
  id: number;
  imageURL: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const MemoryGame = ({ images }: MemoryGameProps) => {
  const [cards, setCards] = useState<MemoryGameCard[]>(() => {
    const shuffledImages = shuffle([...images, ...images]);
    return shuffledImages.map((image, index) => ({
      id: index,
      imageURL: image,
      isFlipped: false,
      isMatched: false,
    }));
  });
  const [flippedCards, setFlippedCards] = useState<MemoryGameCard[]>([]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.imageURL === secondCard.imageURL) {
        setCards((prevCards) => {
          return prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          );
        });
      } else {
        setTimeout(() => {
          setCards((prevCards) => {
            return prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            );
          });
        }, 400); // Adjust the delay as per your preference
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  const handleCardClick = (card: MemoryGameCard) => {
    if (card.isFlipped || card.isMatched) {
      return;
    }

    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[card.id].isFlipped = true;
      return newCards;
    });

    setFlippedCards((prevFlipped) => [...prevFlipped, card]);
  };

  return (
    <div className="max-w-2xl p-8 mx-auto grid grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <img
          key={index}
          src={card.imageURL}
          onClick={() => handleCardClick(card)}
          className={`rounded-lg transition delay-100 duration-300 ${card.isFlipped ? "" : "rotate-y-180 contrast-0"}`}
        />
      ))}
    </div>
  );
};

export default MemoryGame;
