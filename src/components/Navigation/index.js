import React, { useEffect } from "react";
import logo from "../../assets/logo2.png";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/actions/authActions";
import "../Navigation/index.css";
import { IoLogOutOutline } from "react-icons/io5";
import defaultAvatar from "../../assets/iconAva.png";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(
        `/detailsearch?searchText=${encodeURIComponent(searchTerm.trim())}`
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Kiểm tra xem trang hiện tại có phải là trang tìm kiếm không
  const isSearchPage = location.pathname.includes("/detailsearch");

  // Reset searchTerm khi chuyển đến trang tìm kiếm
  useEffect(() => {
    if (isSearchPage) {
      setSearchTerm(""); // Đặt lại giá trị tìm kiếm thành rỗng
    }
  }, [isSearchPage]);

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
      <div className="containerItem" onClick={() => navigate("/listuser")}>
        Người dùng
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="inputSearch"
          value={searchTerm}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isSearchPage} // Vô hiệu hóa ô tìm kiếm nếu đang ở trang tìm kiếm
          style={{
            opacity: isSearchPage ? 0.5 : 1, // Làm mờ ô tìm kiếm
            cursor: isSearchPage ? "not-allowed" : "text", // Thay đổi con trỏ
          }}
        />
        <FaSearch
          className="searchIcon"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
      </div>
      {isAuthenticated ? (
        <div className="userSection">
          <img
            src={user?.avatar || defaultAvatar}
            alt="avatar"
            className="avatarNav"
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
          <span className="userName">{user.fullname || "User"}</span>
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
