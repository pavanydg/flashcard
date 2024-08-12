import React, { useEffect, useState } from "react";
import "./Ani.css";
import axios from "axios";
import NavBar from "../components/NavBar";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Home = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log(token);
        const res = await axios.get(
          `${backendUrl}/flashcards/getflashCards`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log("hi");
        setCards(res.data.flashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchData();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="">
      <NavBar/>
      <div className="mt-5 text-3xl font-bold text-center text-white">
        Your FlashCards
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className={`mt-24 border-2 border-zinc-600 rounded-md shadow-lg max-w-[600px] w-2/3 h-[400px] hover:border-[#FCEDEF] perspective-1000`}>
          {currentCard ? (
            <div
              className={`w-full h-full flex items-center justify-center cursor-pointer ${
                isFlipped ? "card-flip" : ""
              } card-container`}
              onClick={handleFlip}
            >
               <div className="card-face card-front">
                <div className="w-full h-full flex items-center justify-center p-4 text-2xl">
                  {currentCard.question}
                </div>
              </div>
              <div className="card-face card-back">
                <div className="w-full h-full flex items-center justify-center p-4 text-2xl">
                  {currentCard.answer}
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="flex gap-16 mt-5">
          <div
            className="cursor-pointer text-zinc-600 hover:text-[#FCEDEF]"
            onClick={handlePrevious}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-16"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div
            className="cursor-pointer  text-zinc-600 hover:text-[#FCEDEF]"
            onClick={handleNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-16"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
