import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { MdLibraryAdd } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleSignOut = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

   
    navigate("/");
  };

  return (
    <div
      className={`sidebar bg-cover bg-slate-900 fixed left-0 top-0 ${
        open ? "w-80" : "w-24"
      } duration-0 h-full p-1`}
    >
      <div
        className={`rounded-full flex bg-opacity-60 justify-center items-center  mx-8 my-8 bg-white text-blue-800 font-bold text-2xl sm:flex-col sm:w-10 sm:mx-auto md:w-1/2 lg:flex-row lg:justify-start lg:w-60 ${
          !open ? "lg:w-20 md:p-3" : "p-4"
        }`}
      >
        <button onClick={toggleSidebar}>
          <TiThMenu className="inline-block w-8 h-8 mr-6 " />
        </button>
        <span className={`sm:text-xl lg:text-2xl ${!open && "hidden"}`}>
          Quick Quize
        </span>
      </div>

      <div className="mt-20">
        <hr />
        <ul className="mt-4  text-white font-2xl">
          <li className="mb-2 ml-8 rounded p-2   ">
            <LuLayoutDashboard className="inline-block w-8 h-8 mr-6 text-orange-400" />
            <Link to="/admin-dashboard/dashboard" className={!open && "hidden"}>
              Dashboard
            </Link>
          </li>
          <hr />
          <div className="rounded mx-6 hover:shadow hover:bg-white  hover:text-black">
            <li className="my-4   py-1 px-6">
              <MdLibraryAdd className="inline-block w-8 h-8 mr-6  " />
              <Link
                to="/admin-dashboard/add-quiz"
                className={!open && "hidden"}
              >
                Add Quiz
              </Link>
            </li>
          </div>
          <hr />
          <div className="rounded mx-6 hover:shadow hover:bg-white  hover:text-black">
            <li className="my-4  rounded hover:shadow hover:bg-white  hover:text-black py-1 px-6">
              <FaThList className="inline-block w-8 h-8 mr-6 " />
              <Link
                to="/admin-dashboard/show-quiz"
                className={!open && "hidden"}
              >
                Show Quiz
              </Link>
            </li>
          </div>
          <hr />
          <div className="rounded mx-6 hover:shadow hover:bg-white  hover:text-black">
            <li className="my-4  rounded hover:shadow hover:bg-white  hover:text-black py-1 px-6">
              <FaNoteSticky className="inline-block w-8 h-8 mr-6 " />
              <Link
                to="/admin-dashboard/show-usertest"
                className={!open && "hidden"}
              >
                Test
              </Link>
            </li>
          </div>
          <hr />
          <li className="my-9 rounded mt-44 ml-20  py-1 px-6">
            <button onClick={handleSignOut} className={!open && "hidden"}>
              <LiaSignOutAltSolid className="w-8 h-8 ml-4 text-white " />
              Sign Out
            </button>
          </li>
        </ul>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
