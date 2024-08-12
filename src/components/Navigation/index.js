import React from "react";
import logo from "../../assets/logo2.png";
import { FaSearch } from "react-icons/fa";
import "../Navigation/index.css";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="containerNav">
      <img
        src={logo}
        alt="logo"
        className="imgLogo"
        onClick={() => navigate("/home")}
      />
      <div className="containerItem">Tài liệu</div>
      <div
        className="containerItem"
        onClick={() => navigate("/createdocuments")}
      >
        Tạo tài liệu
      </div>
      <div className="containerItem">Giới thiệu</div>
      <div className="containerItem">Người dùng</div>
      <div className="containerItem">
        <input type="text" placeholder="Tìm kiếm..." className="inputSearch" />
        <FaSearch className="searchIcon" />
      </div>
      <div className="containerItem" onClick={() => navigate("/login")}>
        Đăng nhập
      </div>
      <div className="containerItem" onClick={() => navigate("/register")}>
        Đăng ký
      </div>
    </div>
  );
}

export default Navigation;
