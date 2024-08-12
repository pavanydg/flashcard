import React, { useState } from "react";
import { EditComp } from "./EditComp";

export const Card = ({ question, answer, fid, onEdit,onClose }) => {
    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
        setEdit(true);
      };
      const close = () => {
        setEdit(false);
      };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="relative card mt-24 border-2 border-zinc-600 bg-[#191919] rounded-xl shadow-lg w-[400px] h-[400px] flex flex-col items-center justify-center hover:border-[#FCEDEF]">
          <div>Question: {question}</div>

          <div>Answer: {answer}</div>
          <div
            className="absolute top-1 right-1 text-red-600 cursor-pointer"
            onClick={handleEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
        </div>
      </div>
      {edit ? (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <EditComp
              ques={question}
              ans={answer}
              fid={fid}
              onClose={close}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
