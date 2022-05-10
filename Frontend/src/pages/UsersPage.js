import ListUsers from "../components/ListUsers";
import Footer from "../layouts/Footer";
import Sidebar from "../layouts/Sidebar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetail from "../components/UserDetail";
const UsersPage = () => {
    const [onDetail, setOnDetail] = useState(false);
    const [userDetail, setUserDetail] = useState();
    const [update, setUpdate] = useState(false);
    const isLoggedin = useSelector((state) => state.auth.value);
    const handleChange = (e) => {
        setUserDetail({...userDetail, [e.target.name] : e.target.value})
    }
    let navigate = useNavigate();
    useEffect(()=> {
        if(!isLoggedin) navigate("/Login")
    },[isLoggedin, navigate]);
    return(
        <>
        {onDetail ? <UserDetail setOnDetail={setOnDetail} userDetail = {userDetail} handleChange={handleChange} update={update} setUpdate = {setUpdate}/> : <></>}
        <div className="flex">
        <div className="h-screen w-1/6">
        <Sidebar/>
        </div>
        <div className=" w-5/6">
        <ListUsers setOnDetail = {setOnDetail} setUserDetail = {setUserDetail} update={update}/>
        </div>
        </div>
        <Footer/>
        </>
    );
}

export default UsersPage;