import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
const moment = require('moment');
const HistoryRequests = () => {
  const HistoryList = useSelector((state) => state.history.value);
  const navigate = useNavigate();
  //phục vụ pagination
  const itemsPerPage = 3;
  const [pageNum, setPageNum] = useState(0);
  const newList = HistoryList.slice(
    itemsPerPage * pageNum,
    itemsPerPage * (pageNum + 1)
  );

  const NavigateToDetail = (history) => {
      navigate(`/requests/${history.request_id}`);
  }
  return (
    <div className="flex flex-col p-3 border-2 h-screen">
    <div className="flex flex-col h-5/6 overflow-y-scroll">
      <p className="text-center m-3 text-xl font-semibold">
        History Request
      </p>
      {newList.map((history) => (
        <div className="flex flex-col border-2 p-2 my-3" key={history._id}>
          <div className="flex items-center my-2">
            <FaEnvelope />
            <span className="px-5 text-sm">{history.user_name}</span>
          </div>
          <div className="my-1 truncate" onClick={()=>NavigateToDetail(history)}>{history.status} <span>"{history.request_name.length > 20 ? history.request_name.substr(0, 20).concat("...") : history.request_name}"</span></div>
          <div className="text-sm">{moment(history.updated_time).format('L, h:mm a')}</div>
        </div>
      ))}
    </div>
      <Pagination
        totalPage={HistoryList.length / itemsPerPage}
        setPageNum={setPageNum}
      />
    </div>
  );
};

export default HistoryRequests;
