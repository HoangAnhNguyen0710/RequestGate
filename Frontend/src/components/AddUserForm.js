import axios from "axios";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import { useForm } from "react-hook-form";
const AddUserForm = (props) => {
  // const { register, errors } = useForm();
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
    name: "",
    ma_nv: "",
    department: "",
    role: "",
    status: "Active",
  });
  const [passwordCf, setPasswordCf] = useState("");
  const onInputChange = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signIn.password !== passwordCf)
      alert("Invalid ! Please confirm your password again !");
    else {
      if (signIn.password.length < 8)
        alert("Your password is too short, please choose another one");
      else {
        //axios request
        axios
          .post(`${process.env.REACT_APP_URL}/users`, {
            email: signIn.email,
            password: signIn.password,
            role: signIn.role,
            name: signIn.name,
            ma_nv: signIn.ma_nv,
            department: signIn.department,
            status: signIn.status,
          })
          .then((res) => {
            alert(res.data);
            props.setHasAccount(true);
          })
          .catch((err) => console.log("User đã tồn tại !"));
        props.setAddUser(false);
      }
    }
  };

  const onConfirmChange = (e) => {
    setPasswordCf(e.target.value);
  };
  return (
    <div className="border-2 p-3">
      <div className="flex items-center">
        <div className="rounded-lg p-3 font-semibold text-slate-700 w-11/12">
          Create User
        </div>
        <button
          className="w-1/12 flex justify-center"
          onClick={() => props.setAddUser(false)}
        >
          <AiOutlineCloseCircle />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={onInputChange}
          type="email"
          className="rounded-lg p-3 block border-2 w-full my-2"
          name="email"
          placeholder="Enter user Email"
          value={signIn.email}
          // {...register('email', { required: true })}
        />
        <input
          onChange={onInputChange}
          type="password"
          className="rounded-lg p-3 block border-2 w-full my-2"
          name="password"
          placeholder="Password"
          value={signIn.password}
          // {...register('password', { required: true })}
        />

        <div className="text-red-600">
          {signIn.password.length < 8 && signIn.password.length > 0
            ? "too short"
            : signIn.password.length !== 0
            ? "Ok"
            : ""}
        </div>
        <input
          onChange={onConfirmChange}
          type="password"
          className="rounded-lg p-3 block border-2 w-full my-2"
          name="password_confirm"
          placeholder="Confirm Password"
          value={passwordCf}
        />
        <input
          onChange={onInputChange}
          type="text"
          className="rounded-lg p-3 block border-2 w-full my-2"
          name="name"
          placeholder="Enter user name"
          value={signIn.name}
          // {...register('email', { required: true })}
        />
        <input
          onChange={onInputChange}
          type="text"
          className="rounded-lg p-3 block border-2 w-full my-2"
          name="ma_nv"
          placeholder="Enter employee's passcode"
          value={signIn.ma_nv}
          // {...register('email', { required: true })}
        />
        <select
          onChange={onInputChange}
          className="rounded-lg p-3 block border-2 w-full my-2"
          name="department"
          placeholder="Department"
          value={signIn.department}
        >
          <option value="HB1">HB1 </option>
          <option value="HB2">HB2 </option>
          <option value="HB3">HB3 </option>
          <option value="HB4">HB4 </option>
          <option value="BoD">BoD </option>
        </select>
        <select
          onChange={onInputChange}
          className="rounded-lg p-3 block border-2 w-full my-2"
          name="role"
          placeholder="Role"
          value={signIn.role}
          // {...register('email', { required: true })}
        >
          <option value="CBNV">CBNV </option>
          <option value="Admin">Admin </option>
        </select>
        <button
          type="submit"
          className="rounded-lg p-3 block border-2 w-full my-2  bg-green-500 font-semibold text-slate-50 self-center"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
