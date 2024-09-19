import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminlogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full bg-red-100 h-screen flex flex-col items-center justify-center font-sans">
      <div className="bg-white md:p-10 p-5 rounded-lg shadow-lg">
        <h2 className="md:text-[40px] text-[30px] mb-5">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-3 md:w-[400px] w-auto">
            <label htmlFor="email" className="md:text-[20px] text-[16px]">
              <strong>Email</strong>
            </label>
            <input
              className="md:text-[18px] text-[13px] border-2 border-red-100 hover:border-red-300 focus:outline-red-300 rounded-md px-3 py-2 hover:shadow-md"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="password" className="md:text-[20px] text-[16px]">
              <strong>Password</strong>
            </label>
            <input
              className="md:text-[18px] text-[13px] border-2 border-red-100 hover:border-red-300 focus:outline-red-300 rounded-md px-3 py-2 hover:shadow-md"
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <div className="text-red-600">{error && error}</div>
          </div>
          <button
            type="submit"
            className="w-full bg-red-400 md:text-[20px] text-[16px] font-sans font-semibold py-2 rounded-md transition-all ease-in-out duration-500 hover:scale-105 hover:text-white hover:bg-red-400/90 hover:shadow-lg mt-3"
          >
            Log in
          </button>
          <div className="mt-3 flex gap-3 items-center md:text-[13px] text-[10px]">
            <input type="checkbox" name="tick" id="tick" />
            <label htmlFor="password">
              You are Agree with terms & conditions
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
