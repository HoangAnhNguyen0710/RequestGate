import React from "react";
import LoginForm from "../components/LoginForm";
import Logo from "../assets/images/logo.png";

const LoginPage = () => {
    return(
        <>
          <div className="bg-slate-300 p-5 min-h-screen flex items-center flex-col">
            <div className="m-4 min-w-fit flex justify-center"><img src={Logo} alt="" className="w-1/2 max-w-sm"></img></div>
            <div className="rounded-lg p-3 bg-slate-50 min-w-fit max-w-full w-11/12 md:w-1/4 shadow-xl flex flex-col">
               <LoginForm/>
            </div>
          </div>
        </>
    );
}

export default LoginPage;
