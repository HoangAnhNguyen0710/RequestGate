import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initialStateValue, setUser } from "../slices/user";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const LogOut = () => {
    dispatch(setUser(initialStateValue));
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <>
      <div className="bg-slate-300 p-3 flex">
        <p>Welcome back {user.name}</p>
        <button
          className="bg-green-300 mx-6 px-3 hover:bg-slate-700 hover:text-slate-50 rounded-lg"
          onClick={LogOut}
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default Header;
