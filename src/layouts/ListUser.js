import React, { useEffect, useState } from "react";

function ListUser() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/by-document-count"
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="containerListUser">
      <div className="titleListUser">Danh sách người dùng đăng bài</div>
      <div>
        {users.map((user) => (
          <div className="listUser" key={user.id}>
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
        ))}
      </div>
    </div>
  );
}

export default ListUser;
