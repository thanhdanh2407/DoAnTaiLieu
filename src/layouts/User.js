import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../Redux/actions/authActions"; // Adjust the import based on your file structure
import { useNavigate } from "react-router-dom";
import "./css/index.css";
import defaultAvatar from "../assets/iconAva.png";
import Button from "../components/Button";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { FaStar, FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const user = useSelector((state) => state.auth.user);

  const [role, setRole] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setRole(
        user.identifier.startsWith("SV")
          ? "STUDENT"
          : user.identifier.startsWith("GV")
          ? "TEACHER"
          : ""
      );
    }
  }, [user]);

  const items = [
    // Sample items array for documents (kept unchanged)
  ];

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);

  const getFormattedIdentifier = () => {
    if (!user?.identifier) {
      return "SV/GV: NULL";
    }

    if (user.identifier.startsWith("SV")) {
      return `SV: ${user.identifier}`;
    } else if (user.identifier.startsWith("GV")) {
      return `GV: ${user.identifier}`;
    }

    return `SV/GV: ${user.identifier}`;
  };

  return (
    <div className="containerUser">
      <div className="formUser">
        <div className="avatarContainer">
          <img
            src={user?.avatar || defaultAvatar} // Display user avatar or fallback to default
            alt="avatar"
            className="avatar"
          />
          <div className="titleRole">{role || "ROLE"}</div> {/* Display role */}
        </div>
        <div className="titleNameUser">{user?.fullname || "Name"}</div>
        <div className="titleMSSVGV">{getFormattedIdentifier()}</div>
        <div className="titleEmailUser">Email: {user?.email || "Email"}</div>
        <div className="titleAddreesUser">
          Địa chỉ: {user?.address || "Address"}
        </div>
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
