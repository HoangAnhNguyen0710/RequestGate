import Sidebar from "../layouts/Sidebar";
import Footer from "../layouts/Footer";
import RequestForm from "../components/RequestForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const RequestPage = () => {
  let navigate = useNavigate();
  useEffect(()=>{
    console.log(localStorage.getItem("accessToken"))
    if(localStorage.getItem("accessToken") === null)
    navigate('/login');
  },[navigate])
  return (
    <>
      <div className="flex">
        <div className="h-screen w-1/6">
          <Sidebar />
        </div>
        <div className=" w-5/6">
          <RequestForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RequestPage;
