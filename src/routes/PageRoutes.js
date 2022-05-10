import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RequestPage from "../pages/RequestPage";
import UsersPage from "../pages/UsersPage";

const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/Requests" element={<RequestPage/>} />
        <Route path="/Login" element={<LoginPage/>} />
        <Route path="/Users" element={<UsersPage/>} />
      </Routes>
    </>
  );
};

export default PageRoutes;