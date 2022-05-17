import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import { useForm } from "react-hook-form";
const AddCategory = (props) => {
  // const { register, errors } = useForm();
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState({
    cat_name: "",
    assignee: "",
    status: "Enable",
  });
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_URL}/users/all`)
    .then((res)=> setUsers(res.data))
    .catch((err)=>console.log(err));
    
  },[])
  const onInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        //axios request
        axios
          .post(`${process.env.REACT_APP_URL}/categories`, {
            cat_name: category.cat_name,
            assignee: category.assignee,
            status: category.status
          })
          .then((res) => {
            alert(res.data);
            props.setUpdate(!props.update);
          })
          .catch((err) => console.log(err));
        props.setAddCategory(false);
};

  return (
    <div className="border-2 p-3">
      <div className="flex items-center">
        <div className="rounded-lg p-3 font-semibold text-slate-700 w-11/12">
          Create Category
        </div>
        <button
          className="w-1/12 flex justify-center"
          onClick={() => props.setAddCategory(false)}
        >
          <AiOutlineCloseCircle />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={onInputChange}
          type="text"
          className="rounded-lg p-3 block border-2 w-full my-2"
          name="cat_name"
          placeholder="Enter category name"
          value={category.cat_name}
          // {...register('email', { required: true })}
        />
        
        <select
          onChange={onInputChange}
          className="rounded-lg p-3 block border-2 w-full my-2"
          name="assignee"
          placeholder="Assignee"
          value={category.assignee}
        >
        {users.map((user)=> <option value={user.name}>{user.name}</option>)}
          
         
        </select>
        <button
          type="submit"
          className="rounded-lg p-3 block border-2 w-full my-2  bg-green-500 font-semibold text-slate-50 self-center"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
