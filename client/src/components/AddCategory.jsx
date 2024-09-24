import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://employee-management-1k76.onrender.com/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full bg-white h-auto flex flex-col items-center mt-20 text-red-900 font-sans">
      <div className="bg-white md:p-10 p-5 rounded-lg shadow-lg">
        <h2 className="md:text-[30px] text-[20px] mb-5">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-3 md:w-[400px] w-auto">
            <label htmlFor="category" className="md:text-[18px] text-[13px]">
              <strong>Category</strong>
            </label>
            <input
              className="md:text-[17px] text-[12px] border-2 border-red-100 hover:border-red-300 focus:outline-red-300 rounded-md px-3 py-2 hover:shadow-md"
              type="text"
              name="category"
              autoComplete="off"
              placeholder="Enter Category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-400 md:text-[18px] text-red-950 text-[13px] font-sans font-semibold py-2 rounded-md transition-all ease-in-out duration-500 hover:scale-105 hover:text-white hover:bg-red-400/90 hover:shadow-lg mt-3"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
