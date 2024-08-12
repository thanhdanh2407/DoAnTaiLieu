import React, { useState } from "react";
import "./css/index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="form">
        <div className="titleLogin">Đăng Nhập</div>
        <div className="itemFormLogin">
          <label className="titleLabel" htmlFor="name">
            Email<span className="requiredStar">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Nhập email"
            className="inputItem"
          />
        </div>
        <div className="itemFormLogin">
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
            <span className="togglePassword" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
        <div className="btnSubmit">
          <Button type="submit">
            <span className="titleSubmit">Đăng nhập</span>
          </Button>
        </div>
        <div
          className="forgotPassword"
          onClick={() => navigate("/forgotpassword")}
        >
          Quên mật khẩu ?
        </div>
        <div className="title">
          Chưa có tài khoản ?
          <div className="login" onClick={() => navigate("/register")}>
            Đăng ký
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
