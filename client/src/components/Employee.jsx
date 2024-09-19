import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          console.log(result.data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-5 text-red-950 font-sans w-auto">
      <div className="flex justify-center mb-5 md:text-[22px] text-[18px] font-semibold text-red-900">
        <h3>Employee List</h3>
      </div>
      <Link
        to="/dashboard/add_employee"
        className="px-10 py-2 md:text-md text-sm bg-red-400 rounded-md hover:text-white hover:shadow-lg hover:scale-125 transition-all ease-in-out duration-500 font-medium"
      >
        Add Employee
      </Link>
      <div className="mt-10 overflow-auto rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-red-200 border-b-2 border-red-300">
            <tr className="divide-x-2 divide-red-300">
              <th className="p-3 md:text-base text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className="p-3 md:text-base text-sm font-semibold tracking-wide text-left">
                Image
              </th>
              <th className="p-3 md:text-base text-sm font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="p-3 md:text-base text-sm font-semibold tracking-wide text-left">
                Address
              </th>
              <th className="p-3 md:text-base text-sm font-semibold tracking-wide text-left">
                Salary
              </th>
              <th className="p-3 md:text-base text-sm font-semibold tracking-wide text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-200 ">
            {employee.map((e) => (
              <tr className="bg-red-50 divide-x divide-red-200" key={e.id}>
                <td className="p-3 text-base">{e.name}</td>
                <td className="p-3 text-base ">
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="w-10 h-10 rounded-[50%]"
                  />
                </td>
                <td className="p-3 text-base ">{e.email}</td>
                <td className="p-3 text-base ">{e.address}</td>
                <td className="p-3 text-base ">{e.salary}</td>
                <td className="p-4 text-base flex gap-2">
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:shadow-lg duration-500 hover:scale-105 transition-all ease-in-out"
                  >
                    Edit
                  </Link>
                  <button
                    className="px-2 py-1 rounded-md bg-red-500 text-white hover:shadow-lg duration-500 hover:scale-105 transition-all ease-in-out"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
