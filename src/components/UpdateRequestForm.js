import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../config/axiosClient";
import { setRequests } from "../slices/requests";
const UpdateReqForm = (props) => {
  const dispatch = useDispatch();
  //  const [permission, setPermission] = useState(true);
  const user = useSelector((state)=> state.user.value);
  const defaultReq = {
    _id: props.req._id,
    name: props.req.name,
    content: props.req.content,
    assignee: props.req.assignee,
    category: props.req.category,
    date_created: props.req.date_created,
    author: props.req.author,
    status: props.req.status,
  };
  const [request, setRequest] = useState(defaultReq);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axiosClient
      .get(`/categories/all`)
      .then((res) => setCategories(res.data));
  }, []);
  useEffect(() => {
    axiosClient
      .get(`/categories/${request.category}`)
      .then((res) => {
        console.log(res.data);
        setRequest({ ...request, assignee: res.data.assignee });
      });
  }, [request.category]);

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(request);
    props.setOnUpdate(false);
    axiosClient
      .post(`/requests/update`, {
        _id: request._id,
        name: request.name,
        content: request.content,
        category: request.category,
        assignee: request.assignee,
        status: request.status,
      })
      .then((res) => {
        // console.log(res.data);
        axiosClient.get(`/requests/all`).then((res) => {
          const req = res.data;
          dispatch(setRequests(req));
        });
        axiosClient.post(`/history`, {
          request_name: res.data.name,
          request_id: res.data._id,
          user_id: user._id,
          user_name: user.name,
          updated_time: new Date(),
          status: "Update",
        }).then(()=>{
          props.setUpdateHistory(!props.UpdateHistory)
        })
      })
      .catch((err) => console.log(err));
  };
  const deleteReq = () => {
    axiosClient.delete(`/requests/${request._id}`)
      .then((res) => {
      console.log(res);
      props.setOnUpdate(false);
    }).catch((err) => console.log(err));
  }
  return (
    <>
      <div className="m-3 p-5 flex flex-col border-2">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center my-3">
            <h4 className="w-11/12">UPDATE REQUEST</h4>
            <button
              type="submit"
              className="bg-green-500 text-slate-50 px-3 py-1 shadow-lg"
            >
              Update
            </button>
            <button
              className="bg-red-500 text-slate-50 mx-3 px-3 py-1 shadow-lg"
              onClick={deleteReq}
            >
              Delete
            </button>
            <button
              className="bg-yellow-500 text-slate-50 px-1 py-1 shadow-lg"
              onClick={()=> props.setOnUpdate(false)}
            >
              Cancel
            </button>
          </div>
          <input
            type="text"
            placeholder="title"
            className="my-2 p-2 border-2 w-full"
            name="name"
            onChange={handleChange}
            value={request.name}
          />
          <div className="my-2 border-2 p-4 flex flex-wrap">
            <textarea
              type="text"
              placeholder="add a description"
              className="p-4 my-2 border-2 w-full mb-4"
              name="content"
              onChange={handleChange}
              value={request.content}
            />
            <div className="w-1/2">
              <span>Status</span>
              <select
                list="status"
                name="status"
                className="border-2 mx-3"
                onChange={handleChange}
                value={request.status}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In progress</option>
                <option value="Finish">Finish</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="w-1/2">
              <span>Assign</span>
              <span className="border-2 mx-3">{request.assignee}</span>
            </div>
            <div className="w-1/2 my-3">
              <span>Category</span>
              <select
                name="category"
                className="border-2 mx-3"
                onChange={(e) => handleChange(e)}
                value={request.category}
              >
                {categories.map((category) => (
                  <option value={category.cat_name}>{category.cat_name}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateReqForm;
