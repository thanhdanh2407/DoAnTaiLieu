import React, { useState, useEffect } from "react";
import "./css/index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/actions/authActions";
import Button from "../components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (loginAttempted) {
      if (isAuthenticated) {
        toast.success("Đăng nhập thành công!", {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          className: "custom-toast",
          progressClassName: "custom-progress",
        });

        // Lấy thông tin người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        const role = user?.role; // Giả sử role nằm trong user

        // Điều hướng dựa trên vai trò
        if (role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else if (error) {
        toast.error("Nhập sai Email hoặc Password", {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          className: "custom-toast",
          progressClassName: "custom-progress",
        });
      }
    }
  }, [isAuthenticated, error, loginAttempted, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginAttempted(true);
    dispatch(login(email, password));
  };

  return (
    <div className="container">
      <ToastContainer />
      <form className="form" onSubmit={handleLogin}>
        <div className="titleLogin">Đăng Nhập</div>
        <div className="itemFormLogin">
          <label className="titleLabel" htmlFor="email">
            Email<span className="requiredStar">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Nhập email"
            className="inputItem"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="togglePassword" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
        <div className="btnSubmit">
          <Button type="submit" disabled={loading}>
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
      </form>
    </div>
  );
}

export default Login;
