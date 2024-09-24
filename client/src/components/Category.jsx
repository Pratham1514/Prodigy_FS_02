import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState([]);
  
  useEffect(() => {
    axios
      .get("https://employee-management-1k76.onrender.com/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-5 mt-5 text-red-900 font-sans md:text-[22px] text-[18px] ">
      <div className="flex justify-center">
        <h3 className="font-semibold">Category List</h3>
      </div>
      <Link
        to="/dashboard/add_category"
        className="px-10 py-2 md:text-md text-sm bg-red-400 rounded-md hover:text-white hover:shadow-lg hover:scale-125 transition-all ease-in-out duration-500 font-medium"
      >
        Add Category
      </Link>
      <div className="mt-10 overflow-auto rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-red-200 border-b-2 border-red-300">
            <tr>
              <th className="p-3 md:text-base text-sm font-semibold tracking-wide text-left">
                Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-200">
            {category.map((c) => (
              <tr className="bg-red-50" key={c.id}>
                <td className="p-3 text-base ">{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
