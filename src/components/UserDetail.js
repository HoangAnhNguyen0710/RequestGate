import axios from "axios";

const UserDetail = (props) => {
  const userDetail = props.userDetail;
  const handleSubmit = (e) => {
      e.preventDefault();
      axios.put(`${process.env.REACT_APP_URL}/users/update`, {
        _id: userDetail._id,
        name: userDetail.name,
        ma_nv: userDetail.ma_nv,
        department: userDetail.department,
        role: userDetail.role,
        status: userDetail.status,
      })
      alert("Update User thành công !");
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
                name="name"
                value={userDetail.name}
                onChange={props.handleChange}
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <label className="w-1/2">Ma NV</label>
              <input
                type="text"
                className="p-3 m-3 h-4 w-1/2 border-2 border-slate-700"
                name="ma_nv"
                value={userDetail.ma_nv}
                onChange={props.handleChange}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <label className="w-1/2">Department</label>
              <select className="p-3 m-3 w-1/2 border-2 border-slate-700 text-sm" name="department" value={userDetail.department} onChange={props.handleChange}>
                <option value="HB1">HB1 </option>
                <option value="HB2">HB2 </option>
                <option value="HB3">HB3 </option>
                <option value="HB4">HB4 </option>
                <option value="BoD">BoD </option>
              </select>
            </div>
            <div className="w-full flex items-center justify-center">
              <label className="w-1/2">Role</label>
              <select className="p-3 m-3 w-1/2 border-2 border-slate-700 text-sm" name="role" value={userDetail.role} onChange={props.handleChange}>
                <option value="CBNV">CBNV </option>
                <option value="Admin">Admin </option>
              </select>
            </div>
            <div className="w-full flex items-center justify-center">
              <label className="w-1/2">Status</label>
              <select className="p-3 m-3 w-1/2 border-2 border-slate-700 text-sm" name="status" value={userDetail.status} onChange={props.handleChange}>
                <option value="Active">Active </option>
                <option value="Disabled">Disabled </option>
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

export default UserDetail;
