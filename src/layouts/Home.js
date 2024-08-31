import React, { useState } from "react";
import Submenu from "../components/Submenu";
import "./css/index.css";
import bannerImg from "../assets/Banner/bannerImg.png";
import Slider from "../components/Slider";
import Button from "../components/Button";
import { BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { FaStar, FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import imgDocument from "../assets/itemDocument.png";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";

function Home() {
  const items = [
    {
      image: imgDocument,
      title: "JavaScript Essentials",
      category: "JavaScript",
      time: "2 hours ago",
      author: "John Doe",
      approved: true,
      views: 120,
    },
    {
      image: imgDocument,
      title: "ReactJS Beginner Guide",
      category: "ReactJS",
      time: "5 hours ago",
      author: "Jane Smith",
      approved: true,
      views: 90,
    },
    {
      image: imgDocument,
      title: "Advanced CSS Techniques",
      category: "CSS",
      time: "1 day ago",
      author: "Emily Johnson",
      approved: true,
      views: 150,
    },
    {
      image: imgDocument,
      title: "Node.js for Beginners",
      category: "Node.js",
      time: "3 days ago",
      author: "Mike Brown",
      approved: true,
      views: 75,
    },
    {
      image: imgDocument,
      title: "Python Crash Course",
      category: "Python",
      time: "1 week ago",
      author: "Sarah Lee",
      approved: true,
      views: 200,
    },
  ]; // Add more items as needed

  return (
    <div className="containerHome">
      <Submenu />
      <div className="containerImg">
        <div className="bannerImg">
          <img src={bannerImg} alt="bannerImg" />
        </div>
      </div>
      <div className="titleHome">Tài Liệu Nổi Bật</div>
      <Slider />
      <div className="titleHomeNew">Tài Liệu Mới</div>
      <div className="titleSort">Sắp xếp theo</div>
      <div className="filterContainer">
        <Button className="buttonSort">
          <BsSortDown className="iconSort" onClick={() => {}} />
          <span className="titleButtonIcon">Giá Cao - Thấp</span>
        </Button>
        <Button className="buttonSort">
          <BsSortDownAlt className="iconSort" onClick={() => {}} />
          <span className="titleButtonIcon">Giá Thấp - Cao</span>
        </Button>
        <Button className="buttonSort">
          <FaEye className="iconSort" onClick={() => {}} />
          <span className="titleButtonIcon">Xem Nhiều</span>
        </Button>
      </div>

      <div className="titleDocument">Tài liệu Mới Cập Nhật</div>
      <div className="containerList">
        {items.slice(0, 4).map(
          (
            item,
            index // Limit to 4 items
          ) => (
            <div key={index} className="itemHome">
              <img src={item.image} alt={item.title} className="imgHomeNew" />
              <div className="listInfoHome">
                <div className="titleInfo">{item.title}</div>
                <div className="listItemInfoHome">
                  <TbClipboardList />
                  Thể loại: {item.category}
                </div>
                <div className="listItemInfoHome">
                  <WiTime5 />
                  Thời gian: {item.time}
                </div>
                <div className="listItemInfoHome">
                  <LuUser2 />
                  <span className="titleHomeUser">
                    Người Đăng: {item.author}
                  </span>
                </div>
                <div className="listItemInfoAcpHome">
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
          )
        )}
      </div>
    </div>
  );
}

export default Home;
