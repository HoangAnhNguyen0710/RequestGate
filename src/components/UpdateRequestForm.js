import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setRequests } from "../slices/requests";
const UpdateReqForm = (props) => {
  const dispatch = useDispatch();
  //  const [permission, setPermission] = useState(true);

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
    axios
      .get(`${process.env.REACT_APP_URL}/categories/all`)
      .then((res) => setCategories(res.data));
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/categories/${request.category}`)
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
    // setRequest(defaultReq);
    axios
      .post(`${process.env.REACT_APP_URL}/requests/update`, {
        _id: request._id,
        name: request.name,
        content: request.content,
        category: request.category,
        assignee: request.assignee,
        status: request.status,
      })
      .then((res) => {
        console.log(res.data);
        axios.get(`${process.env.REACT_APP_URL}/requests/all`).then((res) => {
          const req = res.data;
          dispatch(setRequests(req));
        });
      })
      .catch((err) => console.log(err));
  };

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
