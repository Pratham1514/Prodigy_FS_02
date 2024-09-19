import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/auth/employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          category_id: result.data.Result[0].category_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_employee/" + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full bg-white h-auto flex flex-col items-center md:mt-5 mt-10 text-red-900 font-sans">
      <div className="bg-white p-5 rounded-lg shadow-lg lg:w-[40%] w-[80%] overflow-auto">
        <h2 className="md:text-[25px] text-[20px] mb-3">Edit Employee</h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="inputName" className="md:text-[15px] text-[12px]">
              Name
            </label>
            <input
              type="text"
              className="md:text-[12px] text-[10px] bg-red-50 px-2 py-2 rounded-md focus:outline-red-200 shadow-md border-2 border-transparent hover:border-red-200"
              id="inputName"
              value={employee.name}
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="inputEmail4" className="md:text-[15px] text-[12px]">
              Email
            </label>
            <input
              type="email"
              className="md:text-[12px] text-[10px] bg-red-50 px-2 py-2 rounded-md focus:outline-red-200 shadow-md border-2 border-transparent hover:border-red-200"
              id="inputEmail4"
              value={employee.email}
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <label htmlFor="inputSalary" className="md:text-[15px] text-[12px]">
              Salary
            </label>
            <input
              type="text"
              className="md:text-[12px] text-[10px] bg-red-50 px-2 py-2 rounded-md focus:outline-red-200 shadow-md border-2 border-transparent hover:border-red-200"
              id="inputSalary"
              value={employee.salary}
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label
              htmlFor="inputAddress"
              className="md:text-[15px] text-[12px]"
            >
              Address
            </label>
            <input
              type="text"
              className="md:text-[12px] text-[10px] bg-red-50 px-2 py-2 rounded-md focus:outline-red-200 shadow-md border-2 border-transparent hover:border-red-200"
              id="inputAddress"
              value={employee.address}
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="category" className="md:text-[15px] text-[12px]">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="md:text-[12px] text-[10px] bg-red-50 px-2 py-2 rounded-md focus:outline-red-200 shadow-md border-2 border-transparent hover:border-red-200"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-red-400 md:text-[15px] text-red-950 text-[12px] font-sans font-semibold py-2 rounded-md transition-all ease-in-out duration-500 hover:scale-105 hover:text-white hover:bg-red-400/90 hover:shadow-lg mt-3"
          >
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
