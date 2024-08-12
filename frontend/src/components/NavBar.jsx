import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function () {
  const [user, setUser] = useState("");
  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const user = decodedToken.username;
        setUser(user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/signin");
  };

  return (
    <div className="font-outfit bg-black">
      <nav className="bg-black border-gray-200 ml-[25px] mr-[25px]">
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <Link to="/home">
              <a className="flex items-center space-x-3">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-600">
                  LearnCardPro
                </span>
              </a>
            </Link>
          </div>

          <div className="flex justify-center items-center text-white">
            <div>
              <div
                className="flex justify-center items-center gap-1 hover:text-gray-200 w-[150px] cursor-pointer"
                onClick={() => {
                  navigate("/create");
                }}
              >
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                New Card
              </div>
            </div>
            <div>
              <div
                className="flex justify-center items-center gap-1 hover:text-gray-200 w-[150px] cursor-pointer"
                onClick={() => {
                  navigate("/edit");
                }}
              >
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Edit Cards
              </div>
            </div>
            
            <div className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black gap-5">
              <div
                className="flex justify-center items-center gap-1 hover:text-gray-300 w-[150px] cursor-pointer"
                onClick={(e) => {
                  setDrop(!drop);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <div className="flex justify-center items-center [16px]">
                  {user}
                </div>
                <div className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                {drop ? (
                  <div className="fixed mt-[80px] bg-black w-[150px] flex justify-center p-2 items-center">
                    <div
                      className="bg-red-500 flex rounded-lg w-20 text-center h-8 items-center justify-center hover:bg-red-600 text-white"
                      onClick={logout}
                    >
                      logout
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
