import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";
import { setLoggedIn } from "../slices/auth";
import { initialStateValue, setUser } from "../slices/user";
const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const LogOut = () => {
        dispatch(setUser(initialStateValue));
        dispatch(setLoggedIn(false));
        // Navigate('/login');
    }
    return(
        <>
        <div className="bg-slate-300 p-3 flex">
           <p>Welcome back {user.name}</p>
           <button className="bg-green-300 mx-6 px-3 hover:bg-slate-700 hover:text-slate-50 rounded-lg" onClick={LogOut}>Log out</button>
        </div>
        </>
    );
}

export default Header