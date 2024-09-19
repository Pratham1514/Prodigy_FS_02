import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("address", employee.address);
    formData.append("salary", employee.salary);
    formData.append("image", employee.image);
    formData.append("category_id", employee.category_id);

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data)
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
        <h2 className="md:text-[25px] text-[20px] mb-3">Add Employee</h2>
        <form className="flex flex-col gap-2" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-0.5">
            <label htmlFor="inputName" className="md:text-[15px] text-[12px]">
              Name
            </label>
            <input
              type="text"
              className="md:text-[12px] text-[10px] bg-red-50 px-2 py-2 rounded-md focus:outline-red-200 shadow-md border-2 border-transparent hover:border-red-200"
              id="inputName"
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
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <label
              htmlFor="inputPassword4"
              className="md:text-[15px] text-[12px]"
            >
              Password
            </label>
            <input
              type="password"
              className="md:text-[12px] text-[10px] bg-red-50 px-2 py-2 rounded-md focus:outline-red-200 shadow-md border-2 border-transparent hover:border-red-200"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
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
          <div className="flex flex-col gap-0.5">
            <label
              className="md:text-[15px] text-[12px]"
              htmlFor="inputGroupFile01"
            >
              Select Image
            </label>
            <input
              type="file"
              name="image"
              className="md:text-[15px] text-[12px] bg-red-50 rounded-md file:mr-3 file:border-0 hover:file:bg-red-300 file:bg-red-200 file:rounded-sm file:py-1.5 file:px-4 shadow-md border-2 border-transparent hover:border-red-200"
              id="inputGroupFile01"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-400 md:text-[15px] text-red-950 text-[12px] font-sans font-semibold py-2 rounded-md transition-all ease-in-out duration-500 hover:scale-105 hover:text-white hover:bg-red-400/90 hover:shadow-lg mt-3"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
