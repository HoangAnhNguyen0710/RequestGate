import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer";
import { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import ListRequests from "../components/ListRequests";
import Filter from "../components/Filter";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setRequests } from "../slices/requests";
import Pagination from "../components/Pagination";
import HistoryRequests from "../components/HistoryRequests";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/requests/all`).then((res) => {
      const req = res.data;
      dispatch(setRequests(req));
    });
  }, [dispatch]);

  const isLoggedin = useSelector((state) => state.auth.value);
  const List = useSelector((state)=>state.requests.value)
  const itemsPerPage = 8;
  const [pageNum, setPageNum] = useState(0);
  const newList = List.slice(itemsPerPage*pageNum, itemsPerPage*(pageNum+1));
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
        <div className="w-2/3">
          <Header />
          <Filter />
          <ListRequests 
          List={newList}/>
           <Pagination
          totalPage ={List.length/itemsPerPage}
          setPageNum={setPageNum}
          />
        </div>
        <div className="w-1/6">
          <HistoryRequests/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
