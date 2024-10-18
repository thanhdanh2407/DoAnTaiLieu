import React from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import "./css/index.css";

function HomeAdmin() {
  return (
    <div className="containerHomeAdmin">
      <div className="leftHomeAdmin">
        <NavBar />
      </div>
      <div className="rightHomeAdmin">
        <div className="titleAdmin">admin</div>
        <div>s</div>
      </div>
    </div>
  );
}

export default HomeAdmin;
