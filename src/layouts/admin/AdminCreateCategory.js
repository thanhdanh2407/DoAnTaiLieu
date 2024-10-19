import React from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import "./css/index.css";
import avatar from "../../assets/iconAva.png";
import { FaUser } from "react-icons/fa6";
import Button from "../../components/Button/index";

function AdminCreateCategory() {
  return (
    <div className="containerAdminCreateCategory">
      <div className="leftAdminCreateCategory">
        <NavBar />
      </div>
      <div className="rightAdminCreateCategory">
        <div className="containerHeaderAdmin">
          <div className="avatarAdmin">
            <img src={avatar} alt="avatar" className="avatarAdminInfo" />
          </div>
          <div className="fullNameAdmin">Admin</div>
        </div>
        <div className="containerInfoDocument">
          <div className="containerSearchAdmin">
            <span className="titleInfoAdmin">
              <FaUser className="iconUser" />
              <span className="titleInfo">Quản lí thể loại</span>
            </span>
          </div>
          <div className="containerCreateCategory">
            <div className="createCategoryInput">
              <input
                type="text"
                placeholder="Nhập tên thể loại..."
                className="inputCreateCategoryAdmin"
              />
            </div>
            <div className="containerBtn">
              <Button>Tạo</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateCategory;
