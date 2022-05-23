import { useState, useEffect } from "react";
import AddUserForm from "./AddUserForm";
import { useSelector } from "react-redux";
const ListUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [addUser, setAddUser] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const fullList = useSelector((state) => state.userList.value);
  const List = props.List;
  useEffect(() => {
    setUsers(List);
    setSearchUser("");
  }, [List]);
  const handleChange = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setUsers(List);
      setSearchUser("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDisplayList = List.filter((user) => user.name !== name);
    setUsers(newDisplayList);
    const search = fullList.find((user) => user.name === name);
    if (!search) setSearchUser("");
    else setSearchUser(search);
  };

  const userDetail = (user) => {
    props.setUserDetail(user);
    props.setOnDetail(true);
  };
  return (
    <div className="m-3 p-5 flex flex-col border-2 h-1/2">
      <h4 className="w-11/12">LIST USERS</h4>
      <div className="flex">
        <form className="flex w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            className="p-2 border-2 my-3 w-5/6"
            onChange={handleChange}
            value={name}
          ></input>
          <button type="submit" className="p-2 px-6 border-2 my-3 mx-3">
            Search
          </button>
        </form>
        <button
          className="p-2 px-6 border-2 my-3"
          onClick={() => setAddUser(true)}
        >
          Add
        </button>
      </div>
      {/* {onUpdate ? <UpdateReqForm req={updateItem} setOnUpdate = {setOnUpdate}/> : <></>} */}
      {addUser ? (
        <AddUserForm
          setAddUser={setAddUser}
          update={props.update}
          setUpdate={props.setUpdate}
        />
      ) : (
        <>
          <table className="table-fixed text-sm text-left border-2">
            <thead>
              <tr className="bg-slate-300 py-6">
                <th>Name</th>
                <th>Ma NV</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => userDetail(searchUser)}>
                <td className="bg-yellow-300">{searchUser.name}</td>
                <td className="bg-yellow-300">{searchUser.ma_nv}</td>
                <td className="bg-yellow-300">{searchUser.department}</td>
                <td className="bg-yellow-300">{searchUser.role}</td>
                <td className="bg-yellow-300">{searchUser.status}</td>
              </tr>
              {users.map((user) => (
                <tr key={user._id} onClick={() => userDetail(user)}>
                  <td>{user.name}</td>
                  <td>{user.ma_nv}</td>
                  <td>{user.department}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ListUsers;
