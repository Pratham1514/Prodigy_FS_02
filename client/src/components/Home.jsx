import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, []);

  const adminRecords = () => {
    axios.get("http://localhost:3000/auth/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      }
    });
  };

  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const employeeCount = () => {
    axios.get("http://localhost:3000/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const salaryCount = () => {
    axios.get("http://localhost:3000/auth/salary_count").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salary);
      }
    });
  };

  return (
    <div className="p-3 w-full text-red-900 font-medium">
      <div className="font-sans flex flex-row justify-evenly mt-5 w-full">
        <div className="px-3 pt-2 pb-3 shadow-md w-[30%] rounded-md">
          <div className="text-center md:text-lg text-base pb-3">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="pt-1 md:px-3 px-1 md:text-base text-sm flex justify-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 shadow-md w-[30%] rounded-md">
          <div className="text-center md:text-lg text-base pb-3">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="pt-1 md:px-3 px-1 md:text-base text-sm flex justify-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 shadow-md w-[30%] rounded-md">
          <div className="text-center md:text-lg text-base pb-3">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="pt-1 md:px-3 px-1 md:text-base text-sm flex justify-between">
            <h5>Total:</h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
      </div>

      <div className="mt-5 px-5 pt-3">
        <h3 className="md:text-[20px] text-[15px] font-medium">
          List of Admins
        </h3>
        <table className="w-full mt-2 shadow-md">
          <thead className="bg-red-200 border-b-2 border-red-300">
            <tr className="divide-x-2 divide-red-300">
              <th className="p-3 md:text-base text-sm font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="p-3 md:text-base text-sm font-semibold tracking-wide text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-200 ">
            {admins.map((a) => (
              <tr className="bg-red-50 divide-x divide-red-200">
                <td className="p-4 text-base">{a.email}</td>
                <td className="p-4 text-base flex gap-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:shadow-lg duration-500 hover:scale-105 transition-all ease-in-out">
                    Edit
                  </button>
                  <button className="px-2 py-1 rounded-md bg-red-500 text-white hover:shadow-lg duration-500 hover:scale-105 transition-all ease-in-out">
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

export default Home;
