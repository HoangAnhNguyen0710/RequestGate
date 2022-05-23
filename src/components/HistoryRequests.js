import React from "react";
import { FaEnvelope } from "react-icons/fa";

const HistoryRequests = () => {
  return (
    <div className="flex flex-col p-3 border-2 h-screen">
      <p className="text-center m-3 text-xl font-semibold">History Request</p>
      <div className="flex flex-col border-2 p-2 my-3">
          <div className="flex items-center my-2"><FaEnvelope/><span className="px-5 text-sm">Hoanh</span></div>
          <div className="my-1">Name Request</div>
          <div className="text-sm">23/05/2022</div>
      </div>
      <div className="flex flex-col border-2 p-2 my-3 ">
          <div className="flex items-center my-2"><FaEnvelope/><span className="px-5 text-sm">Hoanh</span></div>
          <div className="my-1">Name Request</div>
          <div className="text-sm">23/05/2022</div>
      </div>
      <div className="flex flex-col border-2 p-2 my-3 ">
          <div className="flex items-center my-2"><FaEnvelope/><span className="px-5 text-sm">Hoanh</span></div>
          <div className="my-1">Name Request</div>
          <div className="text-sm">23/05/2022</div>
      </div>
    </div>
  );
};

export default HistoryRequests;
