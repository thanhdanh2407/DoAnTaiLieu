import React from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import avatar from "../../assets/iconAva.png";
import { FaUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import Button from "../../components/Button";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";

function AdminWaitDocument() {
  return (
    <div className="containerAdminWaitDocument">
      <div className="leftAdminWaitDocument">
        <NavBar />
      </div>
      <div className="rightAdminWaitDocument">
        <HeaderAdmin />
        <div className="containerInfoDocument">
          <div className="containerSearchAdmin">
            <span className="titleInfoAdmin">
              <FaUser className="iconUser" />
              <span className="titleInfo">Tài liệu chờ duyệt</span>
            </span>
            <div className="containerBtnAdd">
              <Button className="btnAdd">Tạo tài liệu</Button>
            </div>
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
                  <th>Tên người tạo</th>
                  <th>Lượt xem</th>
                  <th>Thể loại</th>
                  <th>Trạng thái</th>
                  <th>Tài liệu sở hữu</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <img src={avatar} alt="User" className="userImage" />
                  </td>
                  <td>Phạm Minh Trọng</td>
                  <td>Nguyễn Văn A</td>
                  <td>122</td>
                  <td>NodeJS</td>
                  <td>Create</td>
                  <td>
                    <button className="btnOpen">Xem</button>
                  </td>
                  <td>
                    <button className="btnLock">Duyệt</button>
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

export default AdminWaitDocument;
