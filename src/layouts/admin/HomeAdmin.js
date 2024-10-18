// import React from "react";
// import NavBar from "../../components/Admin/NavBar/NavBar";
// import "./css/index.css";
// import avatar from "../../assets/iconAva.png";
// import { FaUser } from "react-icons/fa6";
// import { FiSearch } from "react-icons/fi";

// function HomeAdmin() {
//   return (
//     <div className="containerHomeAdmin">
//       <div className="leftHomeAdmin">
//         <NavBar />
//       </div>
//       <div className="rightHomeAdmin">
//         <div className="containerHeaderAdmin">
//           <div className="avatarAdmin">
//             <img src={avatar} alt="avatar" className="avatar" />
//           </div>
//           <div className="fullNameAdmin">Admin</div>
//         </div>
//         <div className="containerInfoDocument">
//           <div className="containerSearchAdmin">
//             <span className="titleInfoAdmin">
//               <FaUser className="iconUser" />
//               <span className="titleInfo">Thông tin người dùng</span>
//             </span>
//             <div className="searchDocumentAdmin">
//               <input
//                 type="text"
//                 placeholder="Tìm kiếm tài liệu"
//                 className="inputSearchAdmin"
//               />
//               <FiSearch className="searchIcon" />
//             </div>
//           </div>

//           <div className="infoDocumentAdmin"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeAdmin;

import React from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import "./css/index.css";
import avatar from "../../assets/iconAva.png";
import { FaUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

function HomeAdmin() {
  return (
    <div className="containerHomeAdmin">
      <div className="leftHomeAdmin">
        <NavBar />
      </div>
      <div className="rightHomeAdmin">
        <div className="containerHeaderAdmin">
          <div className="avatarAdmin">
            <img src={avatar} alt="avatar" className="avatar" />
          </div>
          <div className="fullNameAdmin">Admin</div>
        </div>
        <div className="containerInfoDocument">
          <div className="containerSearchAdmin">
            <span className="titleInfoAdmin">
              <FaUser className="iconUser" />
              <span className="titleInfo">Thông tin người dùng</span>
            </span>
            <div className="searchDocumentAdmin">
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu"
                className="inputSearchAdmin"
              />
              <FiSearch className="searchIcon" />
            </div>
          </div>

          <div className="infoDocumentAdmin">
            <table className="documentTable">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên hiển thị</th>
                  <th>Họ tên</th>
                  <th>Mã số SV</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Quyền</th>
                  <th>Tài liệu sở hữu</th>
                  <th>Khóa tài khoản</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <img src={avatar} alt="User" className="userImage" />
                  </td>
                  <td>John Doe</td>
                  <td>Nguyễn Văn A</td>
                  <td>123456</td>
                  <td>john.doe@example.com</td>
                  <td>Hà Nội</td>
                  <td>Admin</td>
                  <td>10 tài liệu</td>
                  <td>
                    <button className="btnLock">Khóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
