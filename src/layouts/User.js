import React, { useState } from "react";
import "./css/index.css";
import avatar from "../assets/iconAva.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { FaStar } from "react-icons/fa";
import { FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import imgDocument from "../assets/itemDocument.png";

function User() {
  const navigate = useNavigate();

  const items = [
    {
      image: imgDocument,
      title: "NodeJs cho người mới",
      category: "NodeJS",
      time: "13 giờ trước",
      author: "Hải Vũ",
      approved: true,
    },
    {
      image: imgDocument,
      title: "NodeJs cho người mới",
      category: "NodeJS",
      time: "13 giờ trước",
      author: "Hải Vũ",
      approved: true,
    },
    {
      image: imgDocument,
      title: "NodeJs cho người mới",
      category: "NodeJS",
      time: "13 giờ trước",
      author: "Hải Vũ",
      approved: true,
    },
    {
      image: imgDocument,
      title: "NodeJs cho người mới",
      category: "NodeJS",
      time: "13 giờ trước",
      author: "Hải Vũ",
      approved: true,
    },
    {
      image: imgDocument,
      title: "NodeJs cho người mới",
      category: "NodeJS",
      time: "13 giờ trước",
      author: "Hải Vũ",
      approved: true,
    },
    {
      image: imgDocument,
      title: "NodeJs cho người mới",
      category: "NodeJS",
      time: "13 giờ trước",
      author: "Hải Vũ",
      approved: true,
    },
  ];

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);

  return (
    <div className="containerUser">
      <div className="formUser">
        <div className="avatarContainer">
          <img src={avatar} alt="avatar" className="avatar" />
          <div className="titleRole">ADMIN</div>
        </div>
        <div className="titleNameUser">Vũ Văn Hải</div>
        <div className="titleMSSVGV">MSSV/GV: SV642328</div>
        <div className="titleEmailUser">Email: vuvanhaidt1@gmail.com</div>
        <div className="titleAddreesUser">Địa chỉ: Hà Nội</div>
        <div className="rowUser">
          <div className="columUser">
            <div className="btnChangeUpdate">
              <Button type="submit">
                <span
                  className="titleAcp"
                  onClick={() => navigate("/updateuser")}
                >
                  Sửa thông tin
                </span>
              </Button>
            </div>
            <div className="btnChangePass">
              <Button type="submit">
                <span
                  className="titleAcp"
                  onClick={() => navigate("/changepassword")}
                >
                  Đổi mật khẩu
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="titleDocument">Tài liệu của tôi</div>
      <div className="height">
        <div className="containerList">
          {currentItems.map((item, index) => (
            <div key={index} className="itemDocument">
              <img src={item.image} alt={item.title} className="imgDocument" />
              <div className="listInfo">
                <div className="titleInfo">{item.title}</div>
                <div className="listItemInfo">
                  <TbClipboardList />
                  Thể loại: {item.category}
                </div>
                <div className="listItemInfo">
                  <WiTime5 />
                  Thời gian: {item.time}
                </div>
                <div className="listItemInfo">
                  <LuUser2 />
                  Người Đăng: {item.author}
                </div>
                <div className="listItemInfoAcp">
                  <FiCheckCircle />
                  {item.approved ? "Đã được duyệt" : "Chưa duyệt"}
                </div>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${star <= 5 ? "filled" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <div className="listItemFeature">
                <FaEye className="iconEye" title="Xem">
                  <span className="eye">20</span>
                </FaEye>
                <FaEdit className="iconEdit" title="Chỉnh sửa" />
                <FaTrash className="iconTrash" title="Xóa" />
                <FaDownload className="iconDown" title="Tải về" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={" →"}
        breakLabel={"..."}
        pageCount={Math.ceil(items.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default User;
