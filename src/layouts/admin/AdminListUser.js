import React, { useEffect, useState } from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import avatar from "../../assets/iconAva.png";
import { FaUser } from "react-icons/fa6";
import "./css/index.css";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function AdminListUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/users", {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        // Đọc trạng thái người dùng từ localStorage và cập nhật lại
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = data.map((user) => {
          const savedUser = savedUsers.find((saved) => saved.id === user.id);
          return savedUser ? { ...user, status: savedUser.status } : user;
        });

        setUsers(updatedUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(users.length / usersPerPage);

  const handleUserClick = (userId) => {
    navigate(`/admin/adminDetailUser/admin/users/${userId}`);
  };

  const handleLockUser = async (userId) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/users/${userId}/status?enabled=false`,
        {
          method: "PUT",
          headers: {
            Authorization: `${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to lock user");
      }

      alert("Tài khoản đã bị khoá thành công!");

      // Cập nhật trạng thái của người dùng trong state
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) =>
          user.id === userId ? { ...user, status: "locked" } : user
        );

        // Lưu trạng thái người dùng vào localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        return updatedUsers;
      });
    } catch (error) {
      console.error(error);
      alert("Failed to lock user");
    }
  };

  const handleUnlockUser = async (userId) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/users/${userId}/status?enabled=true`,
        {
          method: "PUT",
          headers: {
            Authorization: `${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to unlock user");
      }

      alert("Tài khoản đã mở khoá thành công!");

      // Cập nhật trạng thái của người dùng trong state
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) =>
          user.id === userId ? { ...user, status: "enabled" } : user
        );

        // Lưu trạng thái người dùng vào localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        return updatedUsers;
      });
    } catch (error) {
      console.error(error);
      alert("Failed to unlock user");
    }
  };

  return (
    <div className="containerAdminManageUser">
      <div className="leftAdminManageUser">
        <NavBar />
      </div>
      <div className="rightAdminManageUser">
        <HeaderAdmin />
        <div className="containerInfoDocument">
          <div className="containerSearchAdmin">
            <span className="titleInfoAdmin">
              <FaUser className="iconUser" />
              <span className="titleInfo">Thông tin người dùng</span>
            </span>
          </div>
          <div className="infoDocumentAdmin">
            <div className="tableContainer">
              <table className="documentTable">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Hình ảnh</th>
                    <th>Họ tên</th>
                    <th>Mã số</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Tổng tài liệu</th>
                    <th>Quyền</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  {error ? (
                    <tr>
                      <td colSpan="9" className="error-message">
                        {error}
                      </td>
                    </tr>
                  ) : loading ? (
                    <tr>
                      <td colSpan="9" className="loading-message">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user, index) => (
                      <tr key={user.id}>
                        <td>{offset + index + 1}</td>
                        <td>
                          <img
                            src={user.avatar || avatar}
                            alt="User"
                            className="userImage"
                            onError={(e) => {
                              e.target.src = avatar; // Thay đổi src nếu không tải được
                            }}
                          />
                        </td>
                        <td>{user.fullname}</td>
                        <td>{user.identifier}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>
                          <div className="userRoleName">{user.role}</div>
                        </td>
                        <td>
                          <button
                            className="btnOpen"
                            onClick={() => handleUserClick(user.id)}
                          >
                            Xem
                          </button>
                        </td>
                        <td>
                          <div className="dis">
                            {user.status === "locked" ? (
                              <button
                                className="btnUnlock"
                                onClick={() => handleUnlockUser(user.id)}
                              >
                                Mở khóa
                              </button>
                            ) : (
                              <button
                                className="btnLock"
                                onClick={() => handleLockUser(user.id)}
                              >
                                Khóa
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminListUser;
