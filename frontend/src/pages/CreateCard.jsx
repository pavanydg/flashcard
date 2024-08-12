import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const CreateCard = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate()

  const create = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken")
      const response = await axios.post(
        `${backendUrl}/flashcards/create`,{question,answer},{headers: {
          'Authorization':`${token}`
        }}
      );
      alert("Flashcard created successfully")
      navigate("/home");
    } catch (error) {
      alert("Incorrect format");
      console.log(error);
    }
  };

  return (
    <div className="font-outfit">
      <NavBar/>
      <div className="mt-5 text-3xl font-bold text-center text-white ">Create FlashCards</div>
      <div className="flex flex-col justify-center items-center">
        <div className="mt-24 border-2 border-zinc-600 bg-[#191919] rounded-xl shadow-lg max-w-[600px] w-2/3 h-[400px] flex flex-col items-center">
            <div className="mt-10">
              <input
                className="text-white p-2 border-2 rounded-lg border-gray-800 w-96 bg-gray-900"
                placeholder="Question or title"
                onChange={(e) => {
                  setQuestion(e.target.value)
                }}
              />
            </div>
            <div className="mt-5">
              <textarea
                className="text-white p-2 border-2 rounded-lg border-gray-800 w-96 bg-gray-900"
                placeholder="answer or explaination"
                onChange={(e) => {
                  setAnswer(e.target.value)
                }}
              />
            </div>
            <div className="mt-5 bg-red-600 text-white p-2 rounded-3xl hover:bg-red-800 cursor-pointer" onClick={create}>
              Add Flashcard
            </div>
        </div>
      </div>
    </div>
  );
};
