import React from "react";
import { Carousel } from "antd";
import imgDocument from "../../assets/itemDocument.png";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { FaStar, FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import "antd/dist/reset.css";
import "./index.css";

const Slider = () => {
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
      title: "ReactJS cơ bản",
      category: "ReactJS",
      time: "10 giờ trước",
      author: "Minh Nguyễn",
      approved: true,
    },
    {
      image: imgDocument,
      title: "Học Python cho người mới",
      category: "Python",
      time: "5 giờ trước",
      author: "Lan Phạm",
      approved: false,
    },
    {
      image: imgDocument,
      title: "Java cơ bản",
      category: "Java",
      time: "1 giờ trước",
      author: "Hùng Lê",
      approved: true,
    },
    {
      image: imgDocument,
      title: "Lập trình C++",
      category: "C++",
      time: "8 giờ trước",
      author: "Văn An",
      approved: true,
    },
    {
      image: imgDocument,
      title: "Kotlin cho người mới",
      category: "Kotlin",
      time: "3 giờ trước",
      author: "Tú Linh",
      approved: false,
    },
  ];

  return (
    <div className="banner-container">
      <Carousel
        autoplay
        slidesToShow={4}
        slidesToScroll={1}
        dots={false}
        infinite={true}
        autoplaySpeed={3000}
        speed={1000}
      >
        {items.map((item, index) => (
          <div key={index} className="itemDocumentHome">
            <img
              src={item.image}
              alt={item.title}
              className="imgDocumentHome"
            />
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
      </Carousel>
    </div>
  );
};

export default Slider;
