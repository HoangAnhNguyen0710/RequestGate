import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer";
import { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import ListRequests from "../components/ListRequests";
import Filter from "../components/Filter";
import { useDispatch } from "react-redux";
import { setRequests } from "../slices/requests";
import Pagination from "../components/Pagination";
import HistoryRequests from "../components/HistoryRequests";
import { setUserList } from "../slices/userList";
import { setCatList } from "../slices/categories";
import { setHistoryList } from "../slices/history";
import axiosClient from "../config/axiosClient";
const HomePage = () => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const isLoggedin = useSelector((state) => state.auth.value);
  //pagination
  const List = useSelector((state) => state.requests.value);
  const itemsPerPage = 8;
  const [pageNum, setPageNum] = useState(0);
  const newList = List.slice(
    itemsPerPage * pageNum,
    itemsPerPage * (pageNum + 1)
  );
  let navigate = useNavigate();
  useEffect(() => {
    axiosClient.get(`/requests/all`).then((res) => {
      const req = res.data;
      dispatch(setRequests(req));
    });
    axiosClient.get(`/users/all`).then((res) => {
      dispatch(setUserList(res.data));
    });
    axiosClient.get(`/categories/all`).then((res) => {
      dispatch(setCatList(res.data));
    });
  }, [dispatch]);

  useEffect(() => {
    axiosClient.get(`/history/all`).then((res) => {
      dispatch(setHistoryList(res.data));
    });
  }, [dispatch, update]);

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
          <div className="overflow-hidden">
          <ListRequests List={newList} setUpdate={setUpdate} update={update} />
          <Pagination
            totalPage={List.length / itemsPerPage}
            setPageNum={setPageNum}
          />
          </div>
        </div>
        <div className="w-1/6">
          <HistoryRequests />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
