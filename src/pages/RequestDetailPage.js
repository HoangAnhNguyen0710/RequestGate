import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import RequestDetail from "../components/RequestDetail";
const RequestDetailPage = () => {
  const {request_id} = useParams();
  // const [requestDetail, setRequestDetail] = useState();
  return (
  <>
      <div className="flex">
        <div className="h-screen w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6">
          <Header />
          {/* <p>{request_id}</p> */}
          <RequestDetail request_id={request_id}/>
        </div>
      </div>
      <Footer />
  </>
  );
};

export default RequestDetailPage;
