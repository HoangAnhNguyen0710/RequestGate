import React from "react";
import User from "../assets/images/user.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Pagination from "./Pagination";
const RequestDetail = (props) => {
  const user = useSelector((state) => state.user.value);
  const request_id = props.request_id;
  const [request, setRequest] = useState({});
  const [comment, setComment] = useState("");
  const [cmtList, setCmtList] = useState([]);
  const [reset, setReset] = useState(false);
  //phục vụ cho pagination
  const itemsPerPage = 2;
  const [pageNum, setPageNum] = useState(0);
  const newList = cmtList.slice(
    itemsPerPage * pageNum,
    itemsPerPage * (pageNum + 1)
  );
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/requests/${request_id}`)
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => console.log(err));
  }, [request_id]);
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/comments/${request_id}`)
      .then((res) => {
        setCmtList(res.data);
      })
      .catch((err) => console.log(err));
  }, [reset, request_id]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCmt = {
      request_id: request_id,
      user_id: user._id,
      user_name: user.name,
      updated_time: new Date(),
      content: comment,
    };
    axios
      .post(`${process.env.REACT_APP_URL}/comments`, newCmt)
      .then((res) => {
        alert(res.data);
        setReset(!reset);
        setComment("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="flex flex-col justify-between border-2 m-4 px-16 pt-6 pb-2">
        <div>
          <div>
            <p className="text-3xl font-medium">{request.name}</p>
          </div>
          <div className="flex items-end my-4 pb-10">
            <img src={User} alt="user" className="h-12 pr-4" />
            <div className="text-sm">
              <p className="py-1">{request.author}</p>
              <p className="py-1">Created {request.date_created}</p>
            </div>
          </div>
          <div className="font-semibold my-2">"{request.content}"</div>
          <div className="my-2 flex justify-between font-semibold">
            <p>
              Category: <span className="font-normal"> {request.category}</span>
            </p>
            <p>
              Assign: <span className="font-normal"> {request.assignee}</span>
            </p>
            <p>
              Status: <span className="font-normal"> {request.status}</span>
            </p>
          </div>
        </div>
        <div className="py-3 pt-8 font-semibold">
          Comment ({cmtList.length})
        </div>
        <div className="flex flex-col justify-between">
          <div className="h-1/2 p-4 border-2">
            {newList.map((cmt) => (
              <div className="py-2 px-3" key={cmt._id}>
                <div className="flex items-end mb-2">
                  <img src={User} alt="user" className="h-12 pr-4" />
                  <div className="text-sm">
                    <p className="py-1">{cmt.user_name}</p>
                    <p className="py-1">Created {cmt.updated_time}</p>
                  </div>
                </div>
                <p className="font-semibold">{cmt.content}</p>
              </div>
            ))}
          </div>
          <Pagination
            totalPage={cmtList.length / itemsPerPage}
            setPageNum={setPageNum}
          />
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Write a comment..."
              type="text"
              className="border-2 my-3 h-8 p-1 w-full"
              onChange={handleChange}
              value={comment}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestDetail;
