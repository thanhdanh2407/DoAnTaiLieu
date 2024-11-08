// import React, { useEffect, useState } from "react";
// import NavBar from "../../components/Admin/NavBar/NavBar";
// import avatar from "../../assets/iconAva.png";
// import { FaUser } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import "./css/index.css";
// import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";

// function AdminManageUser() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const usersPerPage = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const authToken = localStorage.getItem("authToken");
//     if (!authToken) {
//       navigate("/login");
//       return;
//     }

//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           "http://localhost:8080/api/user/by-document-count",
//           {
//             headers: {
//               Authorization: `${authToken}`,
//             },
//           }
//         );
//         if (!response.ok) throw new Error("Failed to fetch users");
//         const data = await response.json();

//         // Store user data in local storage
//         localStorage.setItem("usersData", JSON.stringify(data));

//         const updatedUsers = data.map((user) => ({
//           ...user,
//           status: user.enabled ? "enabled" : "locked", // Determine initial status
//         }));

//         setUsers(updatedUsers);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Load users from local storage if available
//     const localUsersData = localStorage.getItem("usersData");
//     if (localUsersData) {
//       setUsers(JSON.parse(localUsersData));
//       setLoading(false); // Assume local data is available, so stop loading
//     } else {
//       fetchUsers();
//     }
//   }, [navigate]);

//   const handleUserClick = (userId) => {
//     navigate(
//       `/admin/adminListAllDocument/admin/documents/user/${userId}/verified`
//     );
//   };

//   const updateUserStatus = async (userId, status) => {
//     const authToken = localStorage.getItem("authToken");
//     if (!authToken) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/admin/users/${userId}/status?enabled=${status}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `${authToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(
//           status ? "Failed to unlock user" : "Failed to lock user"
//         );
//       }

//       const newStatus = status ? "enabled" : "locked";
//       alert(
//         `Tài khoản đã ${
//           newStatus === "enabled" ? "mở khoá" : "khoá"
//         } thành công!`
//       );

//       // Update the user status in the state
//       setUsers((prevUsers) => {
//         const updatedUsers = prevUsers.map((user) =>
//           user.userId === userId ? { ...user, status: newStatus } : user
//         );

//         // Save updated users to local storage
//         localStorage.setItem("usersData", JSON.stringify(updatedUsers));
//         return updatedUsers;
//       });
//     } catch (error) {
//       console.error(error);
//       alert(`Failed to ${status ? "unlock" : "lock"} user`);
//     }
//   };

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const offset = currentPage * usersPerPage;
//   const currentUsers = users.slice(offset, offset + usersPerPage);
//   const pageCount = Math.ceil(users.length / usersPerPage);

//   return (
//     <div className="containerAdminManageUser">
//       <div className="leftAdminManageUser">
//         <NavBar />
//       </div>
//       <div className="rightAdminManageUser">
//         <HeaderAdmin />
//         <div className="containerInfoDocument">
//           <div className="containerSearchAdmin">
//             <span className="titleInfoAdmin">
//               <FaUser className="iconUser" />
//               <span className="titleInfo">
//                 Thông tin người dùng đã tạo tài liệu
//               </span>
//             </span>
//           </div>
//           <div className="infoDocumentAdmin">
//             <div className="tableContainer">
//               <table className="documentTable">
//                 <thead>
//                   <tr>
//                     <th>STT</th>
//                     <th>Hình ảnh</th>
//                     <th>Họ tên</th>
//                     <th>Mã số</th>
//                     <th>Email</th>
//                     <th>Tổng lượt xem</th>
//                     <th>Tổng tài liệu</th>
//                     <th>Quyền</th>
//                     <th>Tài liệu sở hữu</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {error ? (
//                     <tr>
//                       <td colSpan="10">{error}</td>
//                     </tr>
//                   ) : loading ? (
//                     <tr>
//                       <td colSpan="10">Loading...</td>
//                     </tr>
//                   ) : (
//                     currentUsers.map((user, index) => (
//                       <tr key={user.userId}>
//                         <td>{offset + index + 1}</td>
//                         <td>
//                           <img
//                             src={user.avatar || avatar}
//                             alt="User"
//                             className="userImage"
//                             onError={(e) => {
//                               e.target.src = avatar; // Change src if the image fails to load
//                             }}
//                           />
//                         </td>
//                         <td>{user.fullname}</td>
//                         <td>{user.identifier}</td>
//                         <td>{user.email}</td>
//                         <td>{user.totalViews}</td>
//                         <td>{user.documentCount}</td>
//                         <td>
//                           <div className="userRoleName">{user.roleName}</div>
//                         </td>
//                         <td>
//                           <button
//                             className="btnOpen"
//                             onClick={() => handleUserClick(user.userId)}
//                           >
//                             Xem
//                           </button>
//                         </td>
//                         {/* <td>
//                           <div className="dis">
//                             {user.status === "locked" ? (
//                               <button
//                                 className="btnUnlock"
//                                 onClick={() =>
//                                   updateUserStatus(user.userId, true)
//                                 } // Unlock when status is locked
//                               >
//                                 Mở khóa
//                               </button>
//                             ) : (
//                               <button
//                                 className="btnLock"
//                                 onClick={() =>
//                                   updateUserStatus(user.userId, false)
//                                 } // Lock when status is enabled
//                               >
//                                 Khóa
//                               </button>
//                             )}
//                           </div>
//                         </td> */}
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           {pageCount > 1 && (
//             <ReactPaginate
//               previousLabel={"←"}
//               nextLabel={"→"}
//               breakLabel={"..."}
//               pageCount={pageCount}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={handlePageClick}
//               containerClassName={"pagination"}
//               activeClassName={"active"}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminManageUser;

import React, { useEffect, useState } from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import avatar from "../../assets/iconAva.png";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./css/index.css";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";

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
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleUserClick = (userId) => {
    navigate(
      `/admin/adminListAllDocument/admin/documents/user/${userId}/verified`
    );
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
              <span className="titleInfo">
                Thông tin người dùng đã tạo tài liệu
              </span>
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
                    <th>Tổng lượt xem</th>
                    <th>Tổng tài liệu</th>
                    <th>Quyền</th>
                    <th>Tài liệu sở hữu</th>
                  </tr>
                </thead>
                <tbody>
                  {error ? (
                    <tr>
                      <td colSpan="10">{error}</td>
                    </tr>
                  ) : loading ? (
                    <tr>
                      <td colSpan="10">Loading...</td>
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
                            onError={(e) => {
                              e.target.src = avatar; // Change src if the image fails to load
                            }}
                          />
                        </td>
                        <td>{user.fullname}</td>
                        <td>{user.identifier}</td>
                        <td>{user.email}</td>
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

export default AdminManageUser;
