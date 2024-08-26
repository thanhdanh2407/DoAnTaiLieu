import React from "react";
import logo from "../../assets/logo2.png";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/actions/authActions";
import "../Navigation/index.css";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa"; // Import default user icon

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div className="containerNav">
      <img
        src={logo}
        alt="logo"
        className="imgLogo"
        onClick={() => navigate("/home")}
      />
      <div className="containerItem" onClick={() => navigate("/home")}>
        Tài liệu
      </div>
      <div
        className="containerItem"
        onClick={() => navigate("/createdocuments")}
      >
        Tạo tài liệu
      </div>
      <div className="containerItem" onClick={() => navigate("/about")}>
        Giới thiệu
      </div>
      <div className="containerItem" onClick={() => navigate("/user")}>
        Người dùng
      </div>
      <div className="inputContainer">
        <input type="text" placeholder="Tìm kiếm..." className="inputSearch" />
        <FaSearch className="searchIcon" />
      </div>
      {isAuthenticated ? (
        <div className="userSection">
          {user?.avatar ? (
            <img src={user.avatar} alt="User Avatar" className="userAvatar" />
          ) : (
            <FaUserAlt className="defaultIcon" />
          )}
          <span className="userName">{user ? user.fullname : "User"}</span>
          <div className="logoutContainer" onClick={handleLogout}>
            <IoLogOutOutline className="logoutIcon" />
            <span className="logoutText">Đăng xuất</span>
          </div>
        </div>
      ) : (
        <>
          <div className="containerItem" onClick={() => navigate("/login")}>
            Đăng nhập
          </div>
          <div className="containerItem" onClick={() => navigate("/register")}>
            Đăng ký
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
