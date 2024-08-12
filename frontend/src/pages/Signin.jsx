import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Signin = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("")
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/admin/signin`, {
        username,
        password,
      });
      const { token } = response.data;
      // Store the token in localStorage
      localStorage.setItem('jwtToken', token);
      // Redirect to a protected route or handle post-login logic
      navigate("/home")
    } catch (error) {
      alert("Incorrect credentials")
      console.log(error)
    }
  }

  return (
    <div className="text-white font-outfit">
      <div className="flex justify-center items-center h-svh -mt-16">
        <div className="border-2 border-zinc-600 bg-[#191919] rounded-xl shadow-lg w-[400px] h-[400px] flex flex-col items-center">
          <div className="text-5xl font-bold mt-2 mb-5">Log in</div>
          <form onSubmit={handleSignIn}>
          <div class="mb-6">
              <label
                for="email"
                className="block mb-2 text-md font-medium"
              >
                Username
              </label>
              <input
                type="username"
                id="username"
                className="text-white p-2 border-2 rounded-lg border-gray-800 w-64 bg-gray-900"
                placeholder="john.doe@company.com"
                required
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-md font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="text-white p-2 border-2 rounded-lg border-gray-800 bg-gray-900 w-full"
                placeholder="•••••••••"
                required
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
          <div className="mt-10 text-center">
              Don't have an account? Create an <span className="hover:cursor-pointer text-red-400 hover:underline" onClick={(e) => {
              navigate("/signup")}}>account</span>
          </div>
        </div>
      </div>
    </div>
  );
};
