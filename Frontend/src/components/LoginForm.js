import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../slices/auth";
import { setUser } from "../slices/user";
import { useNavigate } from "react-router-dom";
const LoginForm = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_URL}/users/login`, {
            email: login.email,
            password: login.password
        }).then(
        (res) => {
            console.log(res.data)
            dispatch(setUser({_id: res.data._id, email: res.data.email, name: res.data.name, role: res.data.role}))
            dispatch(setLoggedIn(true));
            navigate("/");
        } 
        ).catch((err) => alert(err.response.data));
    }
    return(
        <>
            <div className="rounded-lg p-3 font-semibold text-slate-700 self-center">Login</div>
            <form onSubmit={handleSubmit}>
                <input value={login.email} type="email" className="rounded-lg p-3 block border-2 w-full my-2" onChange={handleChange} name="email" placeholder="Email"/>
                <input value={login.password} type="password" className="rounded-lg p-3 block border-2 w-full my-2" onChange={handleChange} name="password" placeholder="Password"/>
                <button type="submit" className="rounded-lg p-3 block border-2 w-full my-2 bg-blue-500 font-semibold text-slate-50">Login</button>
            </form>
        </>
       
    );
}

export default LoginForm;