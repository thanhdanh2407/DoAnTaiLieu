import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Submenu from "../components/Submenu";
import "./css/index.css";
import bannerImg from "../assets/Banner/bannerImg.png";
import Slider from "../components/Slider";
import Button from "../components/Button";
import { BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { FaStar, FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import imgDocument from "../assets/itemDocument.png";

function Home() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Fetch documents from the API
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/documents", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/documents/${id}`);
  };

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
          <BsSortDownAlt className="iconSort" onClick={() => {}} />
          <span className="titleButtonIcon">Từ A - Z</span>
        </Button>
        <Button className="buttonSort">
          <BsSortDown className="iconSort" onClick={() => {}} />
          <span className="titleButtonIcon">Từ Z - A</span>
        </Button>
        <Button className="buttonSort">
          <FaEye className="iconSort" onClick={() => {}} />
          <span className="titleButtonIcon">Xem Nhiều</span>
        </Button>
      </div>
      <div className="containerList">
        {items.length > 0 ? (
          items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="itemHome"
              onClick={() => handleItemClick(item.id)}
            >
              <img
                src={item.image || imgDocument}
                alt={item.title}
                className="imgHomeNew"
              />
              <div className="listInfoHome">
                <div className="titleInfo">{item.title}</div>
                <div className="listItemInfoHome">
                  <TbClipboardList />
                  Thể loại: {item.categoryName}
                </div>
                <div className="listItemInfoHome">
                  <WiTime5 />
                  Thời gian: {item.relativeUpdatedAt}
                </div>
                <div className="listItemInfoHome">
                  <LuUser2 />
                  <span className="titleHomeUser">
                    Người Đăng: {item.author}
                  </span>
                </div>
                <div className="listItemInfoHome">
                  <FaEye />
                  <span className="titleView">Lượt xem: {item.view}</span>
                </div>
                <div className="listItemInfoAcpHome">
                  <FiCheckCircle />
                  <span className="titleApproved">{item.status}</span>
                </div>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${star <= item.rating ? "filled" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
