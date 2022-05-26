import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import RequestDetail from "../components/RequestDetail";
import { useEffect } from "react";
const RequestDetailPage = () => {
  const {request_id} = useParams();
  const navigate = useNavigate();
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
        <div className="w-5/6">
          <Header />
          {/* <p>{request_id}</p> */}
          <RequestDetail request_id={request_id}/>
        </div>
      </div>
      <Footer />
  </>
  );
};

export default RequestDetailPage;
