import React, { useState } from "react";
import "./css/index.css";
import avatarPlaceholder from "../assets/iconAva.png";
import { FaCamera } from "react-icons/fa";
import Button from "../components/Button";

function UpdateUser() {
  const [avatar, setAvatar] = useState(avatarPlaceholder);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result); // Update the avatar state with the new image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <div className="formUpdateUser">
        <div className="avatarContainer">
          <img src={avatar} alt="avatar" className="avatar" />
          <label htmlFor="avatarUpload" className="avatarUploadLabel">
            <FaCamera className="cameraIcon" />
            Chọn hình ảnh
          </label>
          <input
            type="file"
            id="avatarUpload"
            className="avatarUpload"
            onChange={handleAvatarChange}
          />
        </div>
        <div className="itemUser">
          Họ và tên<span className="requiredStar">*</span>
          <input
            type="text"
            id="userName"
            placeholder="Nhập họ và tên"
            className="inputItemUser"
          />
        </div>
        <div className="itemUser">
          MSSV/GV<span className="requiredStar">*</span>
          <input
            type="text"
            id="userMSSV"
            placeholder="Nhập MSSV/GV"
            className="inputItemUser"
          />
        </div>
        <div className="itemUser">
          Email<span className="requiredStar">*</span>
          <input
            type="text"
            id="userEmail"
            placeholder="Nhập Email"
            className="inputItemUser"
          />
        </div>
        <div className="itemUser">
          Địa chỉ<span className="requiredStar">*</span>
          <input
            type="text"
            id="userAddress"
            placeholder="Nhập Địa chỉ"
            className="inputItemUser"
          />
        </div>
        <div className="btnAcpChange">
          <Button type="submit">
            <span className="titleAcp">Xác nhận</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
