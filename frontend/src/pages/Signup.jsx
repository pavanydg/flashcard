import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Signup = () => {
  const [username, setUsernmae] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try{
      const response = await axios.post(`${backendUrl}/admin/signup`,{
        username,
        email,
        password
      });
      alert("You have registered successfully")
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      navigate("/home")
    }catch(e){
      console.log(e);
    }
  }

  return (
      <div className="flex justify-center items-center h-svh text-white font-outfit">
        <div className="border-2 border-zinc-600 bg-[#191919] rounded-xl shadow-lg w-[400px] flex flex-col items-center">
          <div className="text-5xl font-bold mt-2 mb-5">Sign Up</div>
          <form onSubmit={handleSignUp}>
            <div class="mb-6">
              <label
                for="email"
                className="block mb-2 text-md font-medium"
              >
                Username
              </label>
              <input
                type="uname"
                id="unmae"
                className="text-white p-2 border-2 rounded-lg border-gray-800 bg-gray-900 w-64"
                placeholder="username"
                required
                onChange={(e) => {
                  setUsernmae(e.target.value)
                }}
              />
            </div>
            <div class="mb-6">
              <label
                for="email"
                className="block mb-2 text-md font-medium"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="text-white p-2 border-2 rounded-lg border-gray-800 bg-gray-900 w-full"
                placeholder="john.doe@company.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                className="block mb-2 text-md font-medium "
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
              SignUp
            </button>
          </form>
          <div className="my-5 text-center">
              Already have an account? <span className="hover:cursor-pointer text-red-400 hover:underline" onClick={(e) => {
              navigate("/signin")
            }}>Signin</span>
          </div>
        </div>
      </div>
  );
};
