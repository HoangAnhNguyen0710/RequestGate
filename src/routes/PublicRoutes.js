import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RequestDetailPage from "../pages/RequestDetailPage";
import RequestPage from "../pages/RequestPage";


const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Requests" element={<RequestPage />} />
      <Route path="/Requests/:request_id" element={<RequestDetailPage />} />
      <Route path="/Login" element={<LoginPage />} />
    </Routes>
  );
};

export default PublicRoutes;
