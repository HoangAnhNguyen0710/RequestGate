import React from "react";
import { useState, useRef, useEffect } from "react";
import { setUser } from "../slices/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosClient from "../config/axiosClient";
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
   
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const [remember, setRemember] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  useEffect(()=> {
      userRef.current.focus();
  },[])

  useEffect(()=>{
      setErrMsg('');
  }, [login])

  useEffect(()=>{
      const user = localStorage.getItem("RequestGateLoginUser");
      if(user) {
          const obj = JSON.parse(user);
          setLogin({email: obj, password: ""});
      }
  }, [])

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(remember){
        const saveLogin = JSON.stringify(login.email);
        localStorage.setItem("RequestGateLoginUser", saveLogin);
    }
    axiosClient.post(`/users/login`, {
        email: login.email,
        password: login.password
    }).then(
    (res) => {
        console.log(res.data)
        const user = res.data.user;
        //lưu thông tin user hiện tại vào localstorage
        const saveUser = JSON.stringify(user.email);
        localStorage.setItem("RequestGateUser", saveUser);
        //save token
        const accessToken = res?.data?.accessToken;
        localStorage.setItem("accessToken", accessToken);
        //
        dispatch(setUser({_id: user._id, email: user.email, name: user.name, role: user.role}))
        navigate("/");
    } 
    ).catch((err) => {
        if(!err?.response){
            setErrMsg('No server response');
        } else if(err.response?.status === 400) {
            setErrMsg("Missing Email or Password")
        } else if(err.response?.status === 401)
            setErrMsg("Unauthorized")
        else{
            setErrMsg(err.response.data)
        }
    }
    );
  }
  return (
    <div>
        <div className="rounded-lg p-3 font-semibold text-slate-700 self-center text-xl text-center">Login</div>
        <p ref={errRef} className={errMsg ? "bg-red-300  p-3" : ""}>{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <input id="email" value={login.email} type="email" className="rounded-lg p-3 block border-2 w-full my-2" onChange={handleChange} name="email" placeholder="Email" ref={userRef} autoComplete="off" required/>
                <input id="password" value={login.password} type="password" className="rounded-lg p-3 block border-2 w-full my-2" onChange={handleChange} name="password" placeholder="Password" required/>
                <div className="flex items-center">
                    <input type="checkbox" className="w-5 h-5" value={remember} onChange = {()=>setRemember(!remember)}/><label className="px-5">Remember me</label>
                </div>

                <button type="submit" className="rounded-lg p-3 block border-2 w-full my-2 bg-blue-500 font-semibold text-slate-50">Login</button>
            </form>
    </div>
  );
 
};

export default Login;
