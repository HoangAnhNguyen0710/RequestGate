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
import { setUser } from "../slices/user";
import { setHistoryList } from "../slices/history";
import axiosClient from "../config/axiosClient";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  //pagination
  const List = useSelector((state) => state.requests.value);
  const user = useSelector((state) => state.user.value);
  const itemsPerPage = 8;
  const [pageNum, setPageNum] = useState(0);
  const newList = List.slice(
    itemsPerPage * pageNum,
    itemsPerPage * (pageNum + 1)
  );
  useEffect(()=> {
     if(user.email === ""){
      const obj = localStorage.getItem("RequestGateUser")
      const email = JSON.parse(obj);
      const req = {email: email}
      axiosClient.post(`/user`, req).then((res) => {
        dispatch(setUser({_id: res.data._id, email: res.data.email, name: res.data.name, role: res.data.role}));
      });
     }
  }, [dispatch, user.email])
  useEffect(()=>{
    console.log(localStorage.getItem("accessToken"))
    if(localStorage.getItem("accessToken") === null)
    navigate('/login');
  },[navigate])
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

  return (
    <>
      <div className="flex">
        <div className="h-screen hidden lg:w-1/6 lg:flex">
          <Sidebar />
        </div>
        <div className="lg:w-2/3 h-screen overflow-y-scroll w-full">
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
