import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const RequestForm = () => {
  const user = useSelector((state) => state.user.value);

  const [categories, setCategories] = useState([]);
  const [assignees, setAssignee] = useState([]);
  const [request, setRequest] = useState({
    name: "",
    content: "",
    assignee: "",
    category: "",
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/categories/all`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/categories/${request.category}`)
      .then((res) => {
        setAssignee(res.data);
        setRequest({ ...request, assignee: res.data[0].assignee });
      })
      .catch((err) => console.log(err));
  }, [request.category]);

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
    console.log(request);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(request);
    // setRequest({
    //     name:"",
    //     content: "",
    //     assignee: categories[0].assignee,
    //     category: categories[0].cat_name,
    // });
    axios
      .post(`${process.env.REACT_APP_URL}/requests`, {
        name: request.name,
        content: request.content,
        author: user.email,
        date_created: new Date(),
        category: request.category,
        assignee: request.assignee,
        status: "Open",
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="m-3 p-5 flex flex-col border-2">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center my-3">
            <h4 className="w-11/12">CREATE REQUEST</h4>
            <button
              type="submit"
              className="bg-green-500 text-slate-50 px-3 py-1 shadow-lg"
            >
              Create
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
              <span className="">Status</span>
              <span className="px-3">Open</span>
            </div>
            <div className="w-1/2">
              <span>Assign</span>
              <select
                name="assignee"
                className="border-2 mx-3"
                onChange={handleChange}
                value={request.assignee}
              >
                {assignees.map((assignee) => (
                  <option value={assignee.assignee}>{assignee.assignee}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2 my-3">
              <span>Category</span>
              <select
                name="category"
                className="border-2 mx-3"
                onChange={handleChange}
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

export default RequestForm;
