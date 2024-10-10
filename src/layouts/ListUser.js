import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListUser() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Kiểm tra token JWT để xác nhận người dùng đã đăng nhập
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // Nếu không có token, điều hướng về trang đăng nhập
      navigate("/login");
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/by-document-count",
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Gửi token trong header
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        console.log("Fetched users:", data); // Log dữ liệu người dùng
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleUserClick = (userId) => {
    console.log("Clicked userId:", userId); // Log để kiểm tra userId
    if (userId) {
      navigate(`/documents/user/${userId}/verified`); // Điều hướng khi có userId hợp lệ
    } else {
      console.error("User ID is undefined or null");
    }
  };

  return (
    <div className="containerListUser">
      <div className="titleListUser">Danh sách người dùng đăng bài</div>
      <div>
        {error && <div className="error">{error}</div>}
        {users.map((user) => {
          console.log("User object:", user); // Log full user object
          console.log("User ID:", user.userId); // Log user.userId explicitly
          return (
            <div
              className="listUser"
              key={user.userId} // Use user.userId here
              onClick={() => {
                console.log("Clicked userId:", user.userId); // Log userId directly on click
                handleUserClick(user.userId); // Pass user.userId here
              }}
            >
              <div className="titleFullNameUser">
                <span className="titleDocumentUser">Tên người dùng: </span>{" "}
                {user.fullname}
              </div>
              <div className="countDocumentUser">
                <span className="titleDocumentUser">Tổng tài liệu: </span>{" "}
                {user.documentCount}
              </div>
              <div className="totalView">
                <span className="titleDocumentUser">Tổng lượt xem: </span>{" "}
                {user.totalViews}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListUser;
