import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
function Sidebar(props) {
  const user = useSelector((state) => state.user.value);
  return (
    <>
      <div className="flex flex-col space-x-4 bg-slate-600  p-3 py-1 items-center h-screen">
        <div className="flex-col flex text-lg">
          {user.role === "CBNV" ? (
            <></>
          ) : (
            <NavLink
            
              to="/users"
              className="flex justify-center items-center text-xl px-3 py-2 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-900 no-underline"
            >
              <AiOutlineUser /> Users
            </NavLink>
          )}
          {user.role === "CBNV" ? (
            <></>
          ) : (
            <NavLink
              
              to="/categories"
              className="flex justify-center items-center text-xl px-3 py-2 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-900 no-underline"
            >
              Categories
            </NavLink>
          )}
          <NavLink
            
            to="/"
            className=" text-xl text-center px-3 py-2 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-900 no-underline"
          >
            Home
          </NavLink>
          <NavLink
            
            to="/requests"
            className=" text-xl text-center px-3 py-2 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-900 no-underline"
          >
            Requests
          </NavLink>
        </div>
        {/* <div className=" h-max"></div> */}
      </div>
    </>
  );
}

export default Sidebar;
