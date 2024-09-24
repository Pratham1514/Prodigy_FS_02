import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://employee-management-1k76.onrender.com/employee/detail/" + id)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get("https://employee-management-1k76.onrender.com/employee/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="p-2 flex justify-center items-center shadow-md">
        <h4 className="text-center font-semibold text-red-900 md:text-[25px] text-[15px]">
          Employee Management System
        </h4>
      </div>
      <div className="font-sans flex flex-col items-center mt-5 text-red-900">
        <h5 className="md:text-[23px] text-[13px]">Employee Details</h5>
        <div className="mt-3 flex flex-col items-center">
          <img
            src={`https://employee-management-1k76.onrender.com/Images/` + employee.image}
            className="md:w-[300px] w-[150px] md:h-[300px] h-[150px] rounded-[100%]"
          />
          <div className="mt-7 flex flex-col items-center gap-5">
            <h3 className="md:text-[20px] text-[15px] font-medium">
              {" "}
              <span className="font-bold">Name:</span> {employee.name}
            </h3>
            <h3 className="md:text-[20px] text-[15px] font-medium">
              {" "}
              <span className="font-bold">Email:</span> {employee.email}
            </h3>
            <h3 className="md:text-[20px] text-[15px] font-medium">
              {" "}
              <span className="font-bold">Salary:</span> ${employee.salary}
            </h3>

            <div className="flex gap-3">
              <button
                className="bg-blue-500 md:text-[20px] text-[15px] text-white px-3 py-1 rounded-md hover:shadow-lg hover:bg-blue-600 duration-500 hover:scale-105 transition-all ease-in-out"
                onClick={() =>
                  navigate("/dashboard/edit_employee/" + employee.id)
                }
              >
                Edit
              </button>
              <button
                className="px-3 py-1 rounded-md bg-red-500 text-white md:text-[20px] text-[15px] hover:shadow-lg hover:bg-red-600 duration-500 hover:scale-105 transition-all ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetail;
