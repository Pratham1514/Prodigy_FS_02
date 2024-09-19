import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import sidebarControl from "../assets/control.png";
import logo from "../assets/Artboard 2.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const Menus = [
    { title: "dashboard", lnk: "/dashboard", cls: "fs-4 bi-speedometer2 ms-1" },
    {
      title: "Manage Employees",
      lnk: "/dashboard/employee",
      cls: "fs-4 bi-people ms-1",
    },
    {
      title: "Category",
      lnk: "/dashboard/category",
      cls: "fs-4 bi-columns ms-1",
    },
    // {
    //   title: "Profile",
    //   lnk: "/dashboard/profile",
    //   cls: "fs-4 bi-person ms-1",
    // },
  ];

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="flex font-sans">
        <div
          className={`${
            open ? "w-72" : "w-20"
          } h-screen bg-red-200/80 relative transition-all ease-in-out duration-500 p-5 pt-8 shadow-2xl ${
            !open && "shadow-xl"
          }`}
        >
          <img
            src={sidebarControl}
            alt={sidebarControl}
            className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-red-400 ${
              !open && "rotate-180"
            } duration-500 hover:scale-110`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex md:gap-x-4 gap-x-2 items-center">
            <img
              src={logo}
              alt={logo}
              className={`w-12 cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-red-950 origin-left font-medium md:text-xl text-lg duration-500 ${
                !open && "scale-0"
              }`}
            >
              <Link to="/dashboard">LifeArtz</Link>
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((menu, i) => (
              <li
                key={i}
                className={`text-red-950 md:text-md text-sm cursor-pointer p-2 hover:bg-red-300 hover:text-white rounded-md ${
                  menu.gap ? "mt-9" : "mt-2"
                } ${i === 0 && "bg-red-400"} flex items-center`}
              >
                <Link to={menu.lnk} className="flex gap-x-4 items-center">
                  <i className={menu.cls}></i>
                  <span
                    className={`${!open && "hidden"} origin-left duration-500`}
                  >
                    {menu.title}
                  </span>
                </Link>
              </li>
            ))}
            <li
              className={`text-red-950 md:text-md text-sm cursor-pointer p-2 hover:bg-red-300 hover:text-white rounded-md flex items-center mt-10`}
              onClick={handleLogout}
            >
              <Link className="flex gap-x-4 items-center">
                <i className="fs-4 bi-power ms-1"></i>
                <span
                  className={`${!open && "hidden"} origin-left duration-500`}
                >
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={`w-full flex flex-col p-0 m-0`}>
          <div className="p-2 flex justify-center items-center shadow-md text-wrap">
            <h4 className="text-center font-semibold text-red-900 md:text-[25px] text-[15px]">
              Employee Management System
            </h4>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
