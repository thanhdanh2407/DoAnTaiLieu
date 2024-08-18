import React from "react";
import Submenu from "../components/Submenu";
import "./css/index.css";
import Banner from "../components/Banner";

function Home() {
  return (
    <div className="containerHome">
      <Submenu />
      <div className="titleHome">Tài Liệu Nổi Bật</div>
      <Banner />
    </div>
  );
}

export default Home;
