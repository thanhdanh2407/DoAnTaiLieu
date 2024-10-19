import React from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import avatar from "../../assets/iconAva.png";
import { FaUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import "./css/index.css";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";

function AdminManageCategory() {
  const navigate = useNavigate();

  const handleAdminCreateCategoryClick = () => {
    navigate("/admin/adminCreateCategory");
  };

  const handleAdminUpdateCategoryClick = () => {
    navigate("/admin/adminUpdateCategory");
  };

  return (
    <div className="containerAdminManageCategory">
      <div className="leftAdminManageCategory">
        <NavBar />
      </div>
      <div className="rightAdminManageCategory">
        <HeaderAdmin />
        <div className="containerInfoDocument">
          <div className="containerSearchAdmin">
            <span className="titleInfoAdmin">
              <FaUser className="iconUser" />
              <span className="titleInfo">Quản lí thể loại</span>
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
                  <th>Tên thể loại</th>
                  <th>Chức năng</th>
                  <th>Chức năng</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Java</td>
                  <td>
                    <button className="btnLock">Xoá</button>
                  </td>
                  <td>
                    <button
                      className="btnLock"
                      onClick={handleAdminUpdateCategoryClick}
                    >
                      Chỉnh sửa
                    </button>
                  </td>
                  <td>
                    <button
                      className="btnLock"
                      onClick={handleAdminCreateCategoryClick}
                    >
                      Thêm
                    </button>
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

export default AdminManageCategory;
