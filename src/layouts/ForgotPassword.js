import React from "react";
import "./css/index.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="form">
        <div className="titleForgotPassword">Quên mật khẩu</div>
        <div className="itemFormForgotPassword">
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
        <div className="btnSubmit">
          <Button type="submit">
            <span className="titleSubmit">Gửi email</span>
          </Button>
        </div>
        <div className="title">
          Bạn đã tài khoản chưa ?
          <div className="titleSignIn" onClick={() => navigate("/login")}>
            Đăng nhập
          </div>
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

export default ForgotPassword;
