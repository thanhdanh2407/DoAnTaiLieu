import React from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import "./css/index.css";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";

function HomeAdmin() {
  return (
    <div className="containerHomeAdmin">
      <div className="leftHomeAdmin">
        <NavBar />
      </div>
      <div className="rightHomeAdmin">
        <HeaderAdmin />
      </div>
    </div>
  );
}

export default HomeAdmin;
