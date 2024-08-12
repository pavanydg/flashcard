import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const EditComp = ({ques,ans,fid,onClose}) => {
  const [question, setQuestion] = useState(ques);
  const [answer, setAnswer] = useState(ans);
  const navigate = useNavigate();

  useEffect(() => {

  },[question,answer])

  const editCard = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken")
      const response = await axios.put(`${backendUrl}/flashcards/edit/${fid}`, {
        question,
        answer,
      },{headers: {
        "Authorization": `${token}`
      }});
      alert("Updated succesfully")
      window.location.reload();
    } catch (error) {
      alert("Can't Update")
      console.log(error)
    }
  }

  const deleteCard = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken")
      const response = await axios.delete(`${backendUrl}/flashcards/delete/${fid}`,{headers: {
        "Authorization": `${token}`
      }});
      alert("Deleted succesfully")
      window.location.reload();
    } catch (error) {
      alert("Can't Update")
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="relative card mt-24 border-2 border-zinc-600 bg-[#191919] rounded-xl shadow-lg max-w-[600px] h-[400px] flex flex-col items-center p-5">
          <div className="mt-10">
            <input
              className="text-white p-2 border-2 rounded-lg border-gray-800 w-96 bg-gray-900"
              placeholder="Question or title"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
          </div>
          <div className="mt-5">
            <textarea
              className="text-white p-2 border-2 rounded-lg border-gray-800 w-96 bg-gray-900"
              placeholder="answer or explaination"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-3">
            <div className="mt-5 bg-red-600 text-white p-2 rounded-3xl hover:bg-red-800 cursor-pointer flex justify-center items-center" onClick={editCard}>
              Edit flashcard
            </div>
            <div className="mt-5 border text-white p-2 rounded-3xl cursor-pointer hover:bg-gray-200 hover:text-black flex justify-center items-center" onClick={deleteCard}>
              Delete flashcard
            </div>
          </div>
          <div className="absolute right-1 top-1 cursor-pointer" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
