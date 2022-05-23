import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const RequestForm = () => {
  const user = useSelector((state) => state.user.value);
  const cat = useSelector((state) => state.categories.value);
  const [categories, setCategories] = useState([]);
  const [request, setRequest] = useState({
    name: "",
    content: "",
    assignee: "",
    category: "",
  });
  useEffect(() => {
        setCategories(cat);
        setRequest({ ...request, category: cat[0].cat_name });
  }, []);
  useEffect(() => {
    if(request.category !== ""){
      axios
      .get(`${process.env.REACT_APP_URL}/categories/${request.category}`)
      .then((res) => {
        setRequest({ ...request, assignee: res.data.assignee });
      })
      .catch((err) => console.log(err));
    }
  }, [request.category]);

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
    console.log(request);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(request);

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
        setRequest({
        name:"",
        content: "",
        assignee: "",
        category: "",
      });
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
              <span className="border-2 mx-3">{request.assignee}</span>
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
                  <option key={category._id} value={category.cat_name}>{category.cat_name}</option>
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
