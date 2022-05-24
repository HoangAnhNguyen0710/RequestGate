import { FaFilter } from "react-icons/fa";
import { AiOutlineDown, AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../slices/requests";

const Filter = () => {
  const dispatch = useDispatch();
  const defaultFilter = {
    name: "",
    content: "",
    date_created: new Date(),
    status: "",
    author: "",
    assignee: "",
    category: "",
  };
  const [onFilter, setOnFilter] = useState(false);
  const [filterDetail, setFilterDetail] = useState(defaultFilter);
  const assignee = useSelector((state) => state.userList.value);
  const categories = useSelector((state) => state.categories.value);
  // console.log(assignee)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filterDetail);
    axios
      .post(`${process.env.REACT_APP_URL}/requests/filter`, {
        name: filterDetail.name,
        content: filterDetail.content,
        date_created: filterDetail.date_created,
        status: filterDetail.status,
        author: filterDetail.author,
        assignee: filterDetail.assignee,
        category: filterDetail.category,
      })
      .then((res) => {
        // console.log(res)
        dispatch(setRequests(res.data));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setFilterDetail({ ...filterDetail, [e.target.name]: e.target.value });
  };

  const clearFilter = () => {
    setFilterDetail(defaultFilter);
  };
  return (
    <>
      <div className="p-2 m-3 bg-slate-50 border-2 flex items-center relative">
        {onFilter ? (
          <>
            <button
              className="absolute right-0 top-0 p-3"
              onClick={() => setOnFilter(false)}
            >
              <AiOutlineCloseCircle />
            </button>
            <form onSubmit={handleSubmit}>
              <div className="p-2 m-2 bg-slate-50 flex flex-col container">
                <div className="flex flex-wrap">
                  <div className="flex flex-col m-2 w-1/5">
                    <span className="py-2">Name request</span>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="name"
                      className="p-1 border-2 border-black"
                      value={filterDetail.name}
                    />
                  </div>
                  <div className="flex flex-col m-2 w-1/5">
                    <span className="py-2">Content</span>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="content"
                      className="p-1 border-2 border-black"
                      value={filterDetail.content}
                    />
                  </div>
                  <div className="flex flex-col m-2 w-1/5">
                    <span className="py-2">Date created</span>
                    <input
                      onChange={handleChange}
                      type="date"
                      name="date_created"
                      className="p-1 border-2 border-black"
                      value={filterDetail.date_created}
                    />
                  </div>
                  <div className="flex flex-col m-2 w-1/5">
                    <span className="py-2">Status</span>
                    <input
                      onChange={handleChange}
                      list="status"
                      name="status"
                      className="p-1 border-2 border-black"
                      value={filterDetail.status}
                    />
                    <datalist id="status">
                      <option value="Open" />
                      <option value="In Progress" />
                      <option value="Finish" />
                      <option value="Rejected" />
                    </datalist>
                  </div>
                  <div className="flex flex-col m-2 w-1/5">
                    <span className="py-2">Author</span>
                    <input
                      onChange={handleChange}
                      list="author"
                      type="email"
                      name="author"
                      className="p-1 border-2 border-black"
                      value={filterDetail.author}
                    />
                  </div>
                  <div className="flex flex-col m-2 w-1/5">
                    <span className="py-2">Assign</span>
                    <input
                      onChange={handleChange}
                      list="assignee"
                      name="assignee"
                      className="p-1 border-2 border-black"
                      value={filterDetail.assignee}
                    />
                    <datalist id="assignee" value={filterDetail.assignee}>
                      {assignee.map((assign) => (
                        <option key={assign._id} value={assign.name}>
                          {assign.name}
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div className="flex flex-col m-2 w-1/5">
                    <span className="py-2">Category</span>
                    <input
                      onChange={handleChange}
                      list="categories"
                      name="category"
                      className="p-1 border-2 border-black"
                      value={filterDetail.category}
                    />
                    <datalist id="categories">
                      {categories.map((category) => (
                        <option key={category._id} value={category.cat_name}>
                          {category.cat_name}
                        </option>
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className="flex m-2 items-center justify-center">
                  <button
                    className="border-2 p-2 mx-4 px-4 border-black"
                    onClick={clearFilter}
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="border-2 p-2 mx-4 px-4 border-black"
                  >
                    Filter
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="w-11/12 flex items-center">
              <FaFilter />
              <span className="px-2" onClick={() => setOnFilter(true)}>
                Filter options
              </span>
            </div>
            <div
              className="w-1/12 flex justify-end"
              onClick={() => setOnFilter(true)}
            >
              <AiOutlineDown />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Filter;
