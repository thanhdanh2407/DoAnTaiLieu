import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../components/Button";
import { changePassword } from "../Redux/actions/authActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePassword() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);
  const [error, setError] = useState(null);

  const toggleOldPasswordVisibility = () => {
    setOldShowPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setNewShowPassword(!showNewPassword);
  };

  const toggleReNewPasswordVisibility = () => {
    setShowReNewPassword(!showReNewPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== reNewPassword) {
      setError("Mật khẩu mới không khớp.");
      toast.error("Mật khẩu mới không khớp.", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        className: "custom-toast",
        progressClassName: "custom-progress",
      });
      return;
    }

    try {
      await changePassword(oldPassword, newPassword, reNewPassword);
      toast.success("Mật khẩu đã được thay đổi thành công.", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        className: "custom-toast",
        progressClassName: "custom-progress",
      });
      setError(null);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi.");
      toast.error(err.message || "Đã xảy ra lỗi.", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        className: "custom-toast",
        progressClassName: "custom-progress",
      });
    }
  };

  return (
    <div className="container">
      <div className="form">
        <div className="titleChangePassword">Thay đổi mật khẩu</div>
        {error && <div className="errorMessage">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="itemFormChangePassword">
            <label className="titleLabel" htmlFor="oldPassword">
              Mật khẩu cũ<span className="requiredStar">*</span>
            </label>
            <div className="passwordWrapper">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                placeholder="Nhập mật khẩu cũ"
                className="inputItem"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                className="togglePassword"
                onClick={toggleOldPasswordVisibility}
              >
                {showOldPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="itemFormChangePassword">
            <label className="titleLabel" htmlFor="newPassword">
              Mật khẩu mới<span className="requiredStar">*</span>
            </label>
            <div className="passwordWrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Nhập mật khẩu mới"
                className="inputItem"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="togglePassword"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="itemFormChangePassword">
            <label className="titleLabel" htmlFor="reNewPassword">
              Nhập lại mật khẩu mới<span className="requiredStar">*</span>
            </label>
            <div className="passwordWrapper">
              <input
                type={showReNewPassword ? "text" : "password"}
                id="reNewPassword"
                placeholder="Nhập lại mật khẩu mới"
                className="inputItem"
                value={reNewPassword}
                onChange={(e) => setReNewPassword(e.target.value)}
              />
              <span
                className="togglePassword"
                onClick={toggleReNewPasswordVisibility}
              >
                {showReNewPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="btnSubmit">
            <Button type="submit">
              <span className="titleSubmit">Xác nhận</span>
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        className="custom-toast-container"
        progressClassName="custom-progress"
      />
    </div>
  );
}

export default ChangePassword;
