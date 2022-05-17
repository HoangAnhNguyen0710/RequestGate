import { Routes, Route } from "react-router-dom";
import CategoriesPage from "../pages/CategoriesPage";
import UsersPage from "../pages/UsersPage";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/Categories" element={<CategoriesPage />} />
      <Route path="/Users" element={<UsersPage />} />
    </Routes>
  );
};

export default PrivateRoutes;
