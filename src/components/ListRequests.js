import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UpdateReqForm from "./UpdateRequestForm";
import { AiOutlineEye } from "react-icons/ai";
import { NavLink } from "react-router-dom";
const moment = require('moment');
const ListRequests = (props) => {
  const [onUpdate, setOnUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState();
  const [requests, setRequests] = useState([]);
  const user = useSelector((state) => state.user.value);
  const update = (req) => {
    if (user.name === req.author || user.email === req.author) {
      setUpdateItem(req);
      setOnUpdate(true);
    }
  };
  const List = props.List;
  useEffect(() => {
    setRequests(List);
  }, [List]);
  return (
    <div className="m-3 p-5 flex flex-col border-2 h-2/3 overflow-x-scroll">
      {/* <Filter/> */}
      {onUpdate ? (
        <UpdateReqForm req={updateItem} setOnUpdate={setOnUpdate} setUpdateHistory={props.setUpdate} UpdateHistory={props.update}/>
      ) : (
        <table className="table-fixed text-sm text-left border-2">
        <thead>
          <tr className="bg-slate-300 py-6">
            <th className="w-1/6">Name request</th>
            <th className="w-1/6">Content request</th>
            <th className="w-1/6">Author created</th>
            <th className="w-1/6">Date created</th>
            <th className="w-1/12">Category</th>
            <th className="w-1/6">Assignee</th>
            <th className="w-1/12">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} onClick={() => update(req)} className="overflow-hidden">
              <td>{req.name.length > 20 ? req.name.substr(0, 20).concat("...") : req.name}</td>
              <td>{req.content.length > 20 ? req.content.substr(0, 20).concat("...") : req.content}</td>
              <td>{req.author}</td>
              <td>{moment(req.date_created).format('L, h:mm a')}</td>
              <td>{req.category}</td>
              <td>{req.assignee}</td>
              <td>{req.status}<NavLink to={`/requests/${req._id}`}><AiOutlineEye/></NavLink></td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
     

    </div>
  );
};

export default ListRequests;
