import React, { useEffect, useState } from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import avatar from "../../assets/iconAva.png";
import { FaUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import "./css/index.css";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function AdminManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/by-document-count",
          {
            headers: {
              Authorization: `${authToken}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleUserClick = (userId) => {
    navigate(
      `/admin/adminListAllDocument/admin/documents/user/${userId}/verified`
    );
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

      setUsers(
        users.map((user) =>
          user.userId === userId ? { ...user, status: "locked" } : user
        )
      );
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

      setUsers(
        users.map((user) =>
          user.userId === userId ? { ...user, status: "enabled" } : user
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to unlock user");
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(users.length / usersPerPage);

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
            {/* <div className="searchDocumentAdmin">
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu"
                className="inputSearchAdmin"
              />
              <FiSearch className="searchIcon" />
            </div> */}
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
                    {/* <th>Địa chỉ</th> */}
                    <th>Tổng lượt xem</th>
                    <th>Tổng tài liệu</th>
                    <th>Quyền</th>
                    <th>Tài liệu sở hữu</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  {error ? (
                    <tr>
                      <td colSpan="11">{error}</td>
                    </tr>
                  ) : loading ? (
                    <tr>
                      <td colSpan="11">Loading...</td>
                    </tr>
                  ) : (
                    currentUsers.map((user, index) => (
                      <tr key={user.userId}>
                        <td>{offset + index + 1}</td>
                        <td>
                          <img
                            src={user.avatar || avatar}
                            alt="User"
                            className="userImage"
                          />
                        </td>
                        <td>{user.fullname}</td>
                        <td>{user.identifier}</td>
                        <td>{user.email}</td>
                        {/* <td>{user.address}</td> */}
                        <td>{user.totalViews}</td>
                        <td>{user.documentCount}</td>
                        <td>
                          <div className="userRoleName">{user.roleName}</div>
                        </td>
                        <td>
                          <button
                            className="btnOpen"
                            onClick={() => handleUserClick(user.userId)}
                          >
                            Xem
                          </button>
                        </td>
                        <td>
                          <div className="dis">
                            <button
                              className="btnUnlock"
                              onClick={() => handleUnlockUser(user.userId)}
                            >
                              Mở khóa
                            </button>
                            <button
                              className="btnLock"
                              onClick={() => handleLockUser(user.userId)}
                            >
                              Khóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
    </div>
  );
}

export default AdminManageUser;
