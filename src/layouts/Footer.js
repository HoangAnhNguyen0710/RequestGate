import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import Logo from "../assets/images/logo.png";
import Certi from "../assets/images/certi.png";
import Certi2 from "../assets/images/certi2.png";
const Footer = () => {
  return (
    <div className="min-h-48 bg-slate-200 z-50">
      <div className=" flex pt-6 px-12">
        <div className="px-4 flex flex-col w-1/6">
          <img src={Logo} alt="logo_HBLAB"></img>
          <div className="flex w-full py-3">
            <a
              className="w-1/3 flex justify-center"
              href="https://www.facebook.com/hblab.vn/"
            >
              <AiFillFacebook />
            </a>
            <a
              className="w-1/3 flex justify-center"
              href="https://twitter.com/hblab_jp"
            >
              <FaTwitter />
            </a>
            <a
              className="w-1/3 flex justify-center"
              href="https://www.facebook.com/hblab.vn/"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
        <div className="px-4 flex flex-col w-1/3">
          <b className="pb-4">Địa chỉ</b>
          <b className="pb-2">Trụ Sở Hà Nội</b>
          <p className="pb-4">
            2nd floor, C tower Central Point, 219 Trung Kinh street, Cau Giay
            District, Hanoi, Vietnam
          </p>
          <b className="pb-2">Văn phòng Tokyo</b>
          <p className="pb-4">
            〒116-0014　5F Kawahara dai 2 building, 5-34-1 Higashinippori,
            Arakawa City, Tokyo, Japan
          </p>
        </div>
        <div className="px-12 flex flex-col w-1/3">
          <b className="pb-4">About HBLAB</b>
          <b className="pb-4">TEL</b>
          <span className="pb-4">024-6658-6605</span>
          <b className="pb-4">E-mail</b>
          <span className="pb-4">hrteam@hblab.vn</span>
        </div>
        <div className="px-4 flex flex-col justify-center items-center w-1/6">
          <img src={Certi2} alt="" className="py-2"></img>
          <img src={Certi} alt="" className="py-2"></img>
        </div>
      </div>
      <div className="px-6 py-3 text-center">
        <span>
          Copyright @ 2022 RequestGate,{" "}
          <a
            href="https://www.facebook.com/hoanh.hk0710/"
            target="_blank"
            rel="noreferrer"
          >
            powered by Hoang Anh Nguyen
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
