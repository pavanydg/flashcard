import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { EditComp } from "../components/EditComp";
import NavBar from "../components/NavBar";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const EditPage = () => {
  const [cards, setCards] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };
  const close = () => {
    setEdit(false);
  };

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
        setCards(res.data.flashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="text-white font-outfit">
      <NavBar/>
      <div>
        <div className="mt-5 text-3xl font-bold text-center text-white ">
          Edit FlashCards
        </div>
        <div>{console.log(edit)}</div>
        <div className="flex justify-center">
          <div className="xl:grid grid-cols-3 gap-x-16 max-w-[1200px]">
            {cards.map((card) => {
              return (
                <div key={card.fid}>
                  <Card
                    question={card.question}
                    answer={card.answer}
                    fid={card.fid}
                    onEdit={handleEdit}
                    onClose={close}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
