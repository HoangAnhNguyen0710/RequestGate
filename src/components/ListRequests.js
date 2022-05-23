import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UpdateReqForm from "./UpdateRequestForm";
// import Filter from "./Filter";
const ListRequests = (props) => {
  const [onUpdate, setOnUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState();
  const [requests, setRequests] = useState([]);
  const user = useSelector((state) => state.user.value);
  const update = (req) => {
    if (user.email === req.author) {
      setUpdateItem(req);
      setOnUpdate(true);
    }
  };
  const List = props.List;
  useEffect(() => {
    setRequests(List);
  }, [List]);
  return (
    <div className="m-3 p-5 flex flex-col border-2 h-1/2">
      {/* <Filter/> */}
      {onUpdate ? (
        <UpdateReqForm req={updateItem} setOnUpdate={setOnUpdate} />
      ) : (
        <></>
      )}
      <table className="table-fixed text-sm text-left border-2">
        <thead>
          <tr className="bg-slate-300 py-6">
            <th>Name request</th>
            <th>Content request</th>
            <th>Author created</th>
            <th>Date created</th>
            <th>Category</th>
            <th>Assignee</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} onClick={() => update(req)} className="overflow-hidden">
              <td>{req.name}</td>
              <td>{req.content}</td>
              <td>{req.author}</td>
              <td>{req.date_created}</td>
              <td>{req.category}</td>
              <td>{req.assignee}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Pagination
        //   activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
        //   onChange={this.handlePageChange.bind(this)}
           /> */}
    </div>
  );
};

export default ListRequests;
