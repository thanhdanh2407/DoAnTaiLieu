import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, updateUser } from "../Redux/actions/authActions"; // Adjust imports based on your file structure
import "./css/index.css";
import avatarPlaceholder from "../assets/iconAva.png";
import { FaCamera } from "react-icons/fa";
import Button from "../components/Button";

function UpdateUser() {
  const [avatar, setAvatar] = useState(avatarPlaceholder);
  const [fullname, setFullname] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams(); // Assuming you use a route parameter for userId

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Fetch user info when component mounts
    dispatch(fetchUserInfo(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar || avatarPlaceholder);
      setFullname(user.fullname || "");
      setIdentifier(user.identifier || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      avatar,
      fullname,
      identifier,
      email,
      address,
    };
    dispatch(updateUser(userId, updatedUser)).then(() => {
      navigate("/user");
    });
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
        <form onSubmit={handleSubmit}>
          <div className="itemUser">
            Họ và tên<span className="requiredStar">*</span>
            <input
              type="text"
              id="userName"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Nhập họ và tên"
              className="inputItemUser"
            />
          </div>
          <div className="itemUser">
            MSSV/GV<span className="requiredStar">*</span>
            <input
              type="text"
              id="userMSSV"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Nhập MSSV/GV"
              className="inputItemUser"
            />
          </div>
          <div className="itemUser">
            Email<span className="requiredStar">*</span>
            <input
              type="text"
              id="userEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập Email"
              className="inputItemUser"
            />
          </div>
          <div className="itemUser">
            Địa chỉ<span className="requiredStar">*</span>
            <input
              type="text"
              id="userAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập Địa chỉ"
              className="inputItemUser"
            />
          </div>
          <div className="btnAcpChange">
            <Button type="submit">
              <span className="titleAcp">Xác nhận</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
