import ListUsers from "../components/ListUsers";
import Footer from "../layouts/Footer";
import Sidebar from "../layouts/Sidebar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetail from "../components/UserDetail";
import { useDispatch } from "react-redux";
import { setUserList } from "../slices/userList"; 
import Pagination from "../components/Pagination";
import axiosClient from "../config/axiosClient";
const UsersPage = () => {
  const dispatch = useDispatch();
  const [onDetail, setOnDetail] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const [update, setUpdate] = useState(false);
  const isLoggedin = useSelector((state) => state.auth.value);
  const List = useSelector((state)=>state.userList.value)
  const itemsPerPage = 8;
  const handleChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const [pageNum, setPageNum] = useState(0);
  const newList = List.slice(itemsPerPage*pageNum, itemsPerPage*(pageNum+1));
  useEffect(()=> {
    axiosClient.get(`/users/all`).then((res) => {
      dispatch(setUserList(res.data));
    });
  },[dispatch, update])

  useEffect(() => {
    if (!isLoggedin) navigate("/Login");
  }, [isLoggedin, navigate]);
  return (
    <>
      {onDetail ? (
        <UserDetail
          setOnDetail={setOnDetail}
          userDetail={userDetail}
          handleChange={handleChange}
          update={update}
          setUpdate={setUpdate}
        />
      ) : (
        <></>
      )}
      <div className="flex">
        <div className="h-screen w-1/6">
          <Sidebar />
        </div>
        <div className=" w-5/6">
          <ListUsers
            setOnDetail={setOnDetail}
            setUserDetail={setUserDetail}
            update={update}
            setUpdate={setUpdate}
            List={newList}
          />
          <Pagination 
          totalPage ={List.length/itemsPerPage}
          setPageNum={setPageNum}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UsersPage;
