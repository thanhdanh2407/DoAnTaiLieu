import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/actions/authActions"; // Import action login

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <div className="titleLogin">Đăng Nhập</div>
        {error && <p className="error">{error}</p>}
        <div className="itemFormLogin">
          <label className="titleLabel" htmlFor="name">
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
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              className="inputItem"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="btnSubmit">
          <button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
