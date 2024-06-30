import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { MdOutlineNotificationsNone } from "react-icons/md";

const Navbar = ({ open }) => {
  const getCurrentDate = () => {
    const date = new Date();
    return date.toDateString();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-[82%] navbar position-fix w-[calc(100vw - 256px)] ${
        !open ? "w-[calc(100vw - 80px)] ml-80" : "ml-64"
      } bg-cover bg-slate-900`}
    >
      <div className="flex items-center px-4 py-6 text-white">
        <div className="rounded-lg flex bg-opacity-60 p-2 m-2 ml-10 ">
          <div className="hidden md:flex items-center ml-auto md:mx-auto font-semibold text-xl text-center">
            {getCurrentDate()}
          </div>
        </div>

        <div className="flex items-center ml-auto mr-10">
          <MdOutlineMarkUnreadChatAlt className="h-8 w-8 mr-4 md:mr-8" />
          <MdOutlineNotificationsNone className="h-8 w-8 mr-4 md:mr-8" />
          <LuUserCircle2 className="h-8 w-8 mr-2" />
          <span className="ml-2 text-lg">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
