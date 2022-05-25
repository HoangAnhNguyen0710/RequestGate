import { useState, useEffect } from "react";
import axiosClient from "../config/axiosClient";
const CategoryDetail = (props) => {
    
  const [assignee, setAssignee] = useState([]);
  const categoryDetail = props.categoryDetail;
  useEffect(()=>{
    axiosClient.get(`${process.env.REACT_APP_URL}/users/all`)
    .then((res)=>setAssignee(res.data))
    .catch((err)=>console.log(err));
 }, [categoryDetail.cat_name])
  const handleSubmit = (e) => {
      e.preventDefault();
      axiosClient.put(`${process.env.REACT_APP_URL}/categories/update`, {
        _id: categoryDetail._id,
        cat_name: categoryDetail.cat_name,
        assignee: categoryDetail.assignee
      })
      alert("Update Category thành công !");
      props.setUpdate(!props.update);
      props.setOnDetail(false);
      
  }
  return (
    <>
      <div className="w-full h-screen absolute bg-opacity-25 bg-slate-500 flex items-center justify-center">
        <div className="bg-slate-50 w-1/3 min-h-1/3 z-20 opacity-100">
          <form className="flex w-full  flex-col p-6" onSubmit={handleSubmit}>
            <div className="w-full flex items-center justify-center">
              <label className="w-1/2">Name</label>
              <input
                type="text"
                className="p-3 m-3 h-4 w-1/2 border-2 border-slate-700"
                name="cat_name"
                value={categoryDetail.cat_name}
                onChange={props.handleChange}
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <label className="w-1/2">Assignee</label>
              <select className="p-3 m-3 w-1/2 border-2 border-slate-700 text-sm" name="assignee" value={categoryDetail.assignee} onChange={props.handleChange}>
                {assignee.map((assignee)=>
                <option value={assignee.name}>{assignee.name}</option>
                )}
            
              </select>
            </div>
        
            <div className="w-full flex items-center justify-center">
              <div className="w-1/2 text-center my-3"><button type="submit" className="border-2 border-slate-900 rounded-md px-5 py-2">Update</button></div>
              <div className="w-1/2 text-center my-3"><button className="border-2 border-slate-900 rounded-md px-5 py-2" onClick={()=> props.setOnDetail(false)}>Cancel</button></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryDetail;
