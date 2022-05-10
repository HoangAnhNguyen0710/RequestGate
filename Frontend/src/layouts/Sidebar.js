import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import {useSelector} from "react-redux"
function Sidebar(props) {
    const user = useSelector((state) => state.user.value);
    return(
        <>
   
        <div className="flex flex-col space-x-4 bg-slate-600  z-50 p-3 py-1 h-screen items-center">

        <div className="flex-col flex text-lg">
            {user.role === "CBNV" ? <></> : <NavLink exact to="/users" className="flex justify-center items-center text-xl px-3 py-2 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-900 no-underline"><AiOutlineUser/> Users</NavLink>}
            <NavLink exact to="/"  className=" text-xl text-center px-3 py-2 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-900 no-underline">Home</NavLink>
            <NavLink exact to="/Requests" className=" text-xl text-center px-3 py-2 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-900 no-underline">Requests</NavLink>
            
            {/* <a href="/Login" className=" text-xl px-3 py-2 text-slate-50 rounded-lg hover:bg-slate-100 hover:text-slate-900 no-underline">Login</a> */}
        </div>
        {/* <div className="w-1/6  px-3 py-2 font-medium text-right">
        </div> */}
        </div>

  
        </>
        
    );
}

export default Sidebar;