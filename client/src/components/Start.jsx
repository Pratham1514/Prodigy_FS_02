import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/verify").then((result) => {
      if (result.data.Status) {
        if (result.data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/employee_detail/" + id);
        }
      } 
    });
  }, []);

  return (
    <div className="w-full bg-red-100 h-screen flex flex-col items-center justify-center font-sans text-red-900">
      <div className="bg-white md:p-10 p-5 rounded-lg shadow-lg lg:w-[40%] w-[70%]">
        <h2 className="md:text-[35px] text-[25px] mb-5 font-bold text-center">
          Login As
        </h2>
        <div className="flex items-center justify-evenly mt-10 mb-2">
          <button
            type="button"
            className="md:px-5 px-2 md:py-2 py-1 font-medium text-white rounded-md bg-green-500 md:text-[20px] text-[15px] hover:scale-105 hover:shadow-lg hover:bg-green-600 transition-all ease-in-out duration-300"
            onClick={() => {
              navigate("/adminlogin");
            }}
          >
            Admin
          </button>
          <button
            type="button"
            className="md:px-5 px-2 md:py-2 py-1 font-medium text-white rounded-md bg-blue-500 md:text-[20px] text-[15px] hover:scale-105 hover:shadow-lg hover:bg-blue-600 transition-all ease-in-out duration-300"
            onClick={() => {
              navigate("/employee_login");
            }}
          >
            Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
