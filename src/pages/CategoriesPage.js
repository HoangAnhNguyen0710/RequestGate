import ListCategories from "../components/ListCategories";
import Footer from "../layouts/Footer";
import Sidebar from "../layouts/Sidebar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryDetail from "../components/CategoryDetail";
const CategoriesPage = () => {
  const [onDetail, setOnDetail] = useState(false);
  const [categoryDetail, setCatDetail] = useState();
  const [update, setUpdate] = useState(false);
  const isLoggedin = useSelector((state) => state.auth.value);
  const handleChange = (e) => {
    setCatDetail({ ...categoryDetail, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedin) navigate("/Login");
  }, [isLoggedin, navigate]);
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
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoriesPage;
