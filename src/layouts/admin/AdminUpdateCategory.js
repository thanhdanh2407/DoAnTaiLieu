import React from "react";
import "./css/index.css";
import NavBar from "../../components/Admin/NavBar/NavBar";
import avatar from "../../assets/iconAva.png";
import { FaUser } from "react-icons/fa6";

function AdminUpdateCategory() {
  return (
    <div className="containerAdminUpdateCategory">
      <div className="leftAdminUpdateCategory">
        <NavBar />
      </div>
      <div className="rightAdminUpdateCategory">
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
          <div className="containerUpdateCategory">
            <div className="updateCategoryInput">
              <input className="inputUpdateCategoryAdmin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUpdateCategory;
