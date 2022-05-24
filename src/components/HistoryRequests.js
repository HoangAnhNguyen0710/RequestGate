import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import Pagination from "./Pagination";
const HistoryRequests = () => {
  const HistoryList = useSelector((state) => state.history.value);
  const itemsPerPage = 8;
  const [pageNum, setPageNum] = useState(0);
  const newList = HistoryList.slice(
    itemsPerPage * pageNum,
    itemsPerPage * (pageNum + 1)
  );
  return (
    <div className="flex flex-col p-3 border-2 h-screen">
    <div className="flex flex-col h-5/6">
      <p className="text-center m-3 text-xl font-semibold">
        History Request
      </p>
      {newList.map((history) => (
        <div className="flex flex-col border-2 p-2 my-3">
          <div className="flex items-center my-2">
            <FaEnvelope />
            <span className="px-5 text-sm">{history.user_name}</span>
          </div>
          <div className="my-1">{history.request_name}</div>
          <div className="text-sm">{history.updated_time}</div>
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
