import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container">
      <div className="form">
        <div className="titleRegister">Đăng ký</div>
        <div className="form-row">
          <div className="form-column">
            <div className="itemForm">
              <label className="titleLabel" htmlFor="name">
                Họ và tên<span className="requiredStar">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Nhập họ tên"
                className="inputItem"
              />
            </div>
            <div className="itemForm">
              <label className="titleLabel" htmlFor="password">
                Mật khẩu<span className="requiredStar">*</span>
              </label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Nhập mật khẩu"
                  className="inputItem"
                />
                <span
                  className="togglePassword"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <div className="itemForm">
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
          </div>
          <div className="form-column">
            <div className="itemForm">
              <label className="titleLabel" htmlFor="email">
                Email<span className="requiredStar">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Nhập email"
                className="inputItem"
              />
            </div>
            <div className="itemForm">
              <label className="titleLabel" htmlFor="studentId">
                Mã số SV/GV<span className="requiredStar">*</span>
              </label>
              <input
                type="text"
                id="studentId"
                placeholder="Nhập mã số SV/GV"
                className="inputItem"
              />
            </div>
            <div className="itemForm">
              <label className="titleLabel" htmlFor="address">
                Địa chỉ<span className="requiredStar">*</span>
              </label>
              <input
                type="text"
                id="address"
                placeholder="Nhập địa chỉ"
                className="inputItem"
              />
            </div>
          </div>
        </div>
        <div className="btnSubmit">
          <Button type="submit">
            <span className="titleSubmit">Đăng ký</span>
          </Button>
        </div>
        <div className="title">
          Bạn đã tài khoản chưa ?
          <div className="titleSignIn" onClick={() => navigate("/login")}>
            Đăng nhập
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
