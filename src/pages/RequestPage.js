import Sidebar from "../layouts/Sidebar";
import Footer from "../layouts/Footer";
import RequestForm from "../components/RequestForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const RequestPage = () => {
    const isLoggedin = useSelector((state) => state.auth.value);
    let navigate = useNavigate();
    useEffect(()=> {
        if(!isLoggedin) navigate("/Login")
    },[isLoggedin, navigate]);
    return(
        <>
        <div className="flex">
        <div className="h-screen w-1/6">
        <Sidebar/>
        </div>
        <div className=" w-5/6">
        {/* <p>Requests :</p> */}
        <RequestForm/>
        </div>
        </div>
        <Footer/>
        </>
    );
}

export default RequestPage;