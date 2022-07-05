import { useState, useEffect } from "react";
// import axios from "axios";
import AddCategory from "./AddCategoryForm";
import { useSelector } from "react-redux";
const ListCategories = (props) => {
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");
  const [addCategory, setAddCategory] = useState(false);
  const [searchCat, setSearchCat] = useState("");
  const catList = useSelector((state) => state.categories.value);
  const List = props.List;
  useEffect(() => {
    setCategories(List);
    setSearchCat("");
  }, [List]);

  const handleChange = (e) => {
    setCatName(e.target.value);
    if (e.target.value === "") {
      setCategories(List);
      setSearchCat("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDisplayList = List.filter(
      (user) => user.cat_name.toLowerCase() !== catName.toLowerCase()
    );
    setCategories(newDisplayList);
    const search = catList.find(
      (user) => user.cat_name.toLowerCase() === catName.toLowerCase()
    );
    if (!search) setSearchCat("");
    else setSearchCat(search);
  };

  const catDetail = (cat) => {
    props.setCatDetail(cat);
    props.setOnDetail(true);
  };
  return (
    <div className="m-3 p-5 flex flex-col border-2 h-3/5 overflow-x-scroll">
      <h4 className="w-11/12">LIST CATEGORIES</h4>
      <div className="flex">
        <form className="flex w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            className="p-2 border-2 my-3 w-5/6"
            onChange={handleChange}
            value={catName}
          ></input>
          <button type="submit" className="p-2 px-6 border-2 my-3 mx-3">
            Search
          </button>
        </form>
        <button
          className="p-2 px-6 border-2 my-3"
          onClick={() => setAddCategory(true)}
        >
          Add
        </button>
      </div>
      {addCategory ? (
        <AddCategory
          setAddCategory={setAddCategory}
          update={props.update}
          setUpdate={props.setUpdate}
        />
      ) : (
        <>
          <table className="table-fixed text-sm text-left border-2 ">
            <thead>
              <tr className="bg-slate-300 py-6">
                <th>Name</th>
                <th>Assignee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => catDetail(searchCat)}>
                <td className="bg-yellow-300">{searchCat.cat_name}</td>
                <td className="bg-yellow-300">{searchCat.assignee}</td>
                <td className="bg-yellow-300">{searchCat.status}</td>
              </tr>
              {categories.map((cat) => (
                <tr key={cat._id} onClick={() => catDetail(cat)}>
                  <td>{cat.cat_name}</td>
                  <td>{cat.assignee}</td>
                  <td>{cat.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ListCategories;
