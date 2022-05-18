import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer";
import { useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import ListRequests from "../components/ListRequests";
import Filter from "../components/Filter";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setRequests } from "../slices/requests";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/requests/all`).then((res) => {
      const req = res.data;
      dispatch(setRequests(req));
    });
  }, [dispatch]);

  const isLoggedin = useSelector((state) => state.auth.value);
  let navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedin) navigate("/Login");
  }, [isLoggedin, navigate]);

  return (
    <>
      <div className="flex">
        <div className="h-screen w-1/6">
          <Sidebar />
        </div>
        <div className=" w-5/6">
          <Header />
          <Filter />
          <ListRequests />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
