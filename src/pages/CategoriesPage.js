import ListCategories from "../components/ListCategories";
import Footer from "../layouts/Footer";
import Sidebar from "../layouts/Sidebar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryDetail from "../components/CategoryDetail";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCatList } from "../slices/categories";
import Pagination from "../components/Pagination";
const CategoriesPage = () => {
  const dispatch = useDispatch();
  const [onDetail, setOnDetail] = useState(false);
  const [categoryDetail, setCatDetail] = useState();
  const [update, setUpdate] = useState(false);
  const isLoggedin = useSelector((state) => state.auth.value);
  const List = useSelector((state)=>state.categories.value)
  const itemsPerPage = 8;
  const [pageNum, setPageNum] = useState(0);
  const newList = List.slice(itemsPerPage*pageNum, itemsPerPage*(pageNum+1));
  const handleChange = (e) => {
    setCatDetail({ ...categoryDetail, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedin) navigate("/Login");
  }, [isLoggedin, navigate]);
  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_URL}/categories/all`).then((res) => {
      dispatch(setCatList(res.data));
    });
  },[dispatch, update])
  return (
    <>
      {onDetail ? (
        <CategoryDetail
          setOnDetail={setOnDetail}
          categoryDetail={categoryDetail}
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
          <ListCategories
            setOnDetail={setOnDetail}
            setCatDetail={setCatDetail}
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

export default CategoriesPage;
