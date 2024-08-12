import React, { useState } from "react";
import "./css/index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function ChangePassword() {
  const navigate = useNavigate();
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setOldShowPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setNewShowPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container">
      <div className="form">
        <div className="titleChangePassword">Thay đổi mật khẩu</div>
        <div className="itemFormChangePassword">
          <label className="titleLabel" htmlFor="password">
            Mật khẩu cũ<span className="requiredStar">*</span>
          </label>
          <div className="passwordWrapper">
            <input
              type={showOldPassword ? "text" : "password"}
              id="password"
              placeholder="Nhập mật khẩu cũ"
              className="inputItem"
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
          <label className="titleLabel" htmlFor="password">
            Mật khẩu mới<span className="requiredStar">*</span>
          </label>
          <div className="passwordWrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              id="password"
              placeholder="Nhập mật khẩu mới"
              className="inputItem"
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
          <label className="titleLabel" htmlFor="confirmPassword">
            Nhập lại mật khẩu<span className="requiredStar">*</span>
          </label>
          <div className="passwordWrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              className="inputItem"
            />
            <span
              className="togglePassword"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
        <div className="btnSubmit">
          <Button type="submit">
            <span className="titleSubmit">Xác nhận</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
