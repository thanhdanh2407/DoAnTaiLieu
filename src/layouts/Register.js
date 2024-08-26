import React, { useState } from "react";
import "./css/index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../Redux/actions/authActions";
import Button from "../components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registering, setRegistering] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== repassword) {
      toast.error("Mật khẩu không khớp", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        className: "custom-toast",
        progressClassName: "custom-progress",
      });
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("identifier", identifier);
    formData.append("fullname", fullname);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("repassword", repassword);

    setRegistering(true);

    try {
      await dispatch(register(formData));
      toast.success("Đăng ký thành công!", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        className: "custom-toast",
        progressClassName: "custom-progress",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      toast.error("Đăng ký thất bại", {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        className: "custom-toast",
        progressClassName: "custom-progress",
      });
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <form className="form" onSubmit={handleRegister}>
        <div className="titleRegister">Đăng ký</div>
        <div className="form-row">
          <div className="form-column">
            <div className="itemForm">
              <label className="titleLabel" htmlFor="fullname">
                Họ và tên<span className="requiredStar">*</span>
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Nhập họ tên"
                className="inputItem"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="togglePassword"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
          </div>
          <div className="form-column">
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
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
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
        </div>
        <div className="form-row">
          <div className="form-column">
            <div className="itemForm">
              <label className="titleLabel" htmlFor="identifier">
                Mã số SV/GV<span className="requiredStar">*</span>
              </label>
              <input
                type="text"
                id="identifier"
                placeholder="Nhập mã số SV/GV"
                className="inputItem"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>
          <div className="form-column">
            <div className="itemForm">
              <label className="titleLabel" htmlFor="address">
                Địa chỉ<span className="requiredStar">*</span>
              </label>
              <input
                type="text"
                id="address"
                placeholder="Nhập địa chỉ"
                className="inputItem"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="itemRole">
          <label className="titleLabel" htmlFor="role">
            Vai trò<span className="requiredStar">*</span>
          </label>
          <select
            id="role"
            className="inputItemRole"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Học sinh</option>
            <option value="TEACHER">Giáo viên</option>
          </select>
        </div>
        <div className="btnSubmit">
          <Button type="submit" disabled={loading || registering}>
            <span className="titleSubmit">Đăng ký</span>
          </Button>
        </div>
        <div className="title">
          Bạn đã có tài khoản chưa?
          <div className="login" onClick={() => navigate("/login")}>
            Đăng nhập
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
