import React, { useState } from "react";

import "./index.css";
import { TbCategory } from "react-icons/tb";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // Mũi tên qua trái và phải
import { HiHome } from "react-icons/hi";

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(true); // Khởi tạo state để kiểm tra trạng thái mở rộng của Navbar

  const toggleNavBar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`containerNavBar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className={`navbar`}>
        <div className="navbar-content">
          <div className="itemAdmin">
            <HiHome />
            {isExpanded && <span>Trang chủ</span>}
          </div>
          <div className="itemAdmin">
            <TbCategory />
            {isExpanded && <span>Quản lí thể loại</span>}
          </div>
        </div>
      </div>
      <button onClick={toggleNavBar}>
        {isExpanded ? (
          <AiOutlineLeft /> // Hiện mũi tên trái khi mở rộng
        ) : (
          <AiOutlineRight /> // Hiện mũi tên phải khi thu nhỏ
        )}
      </button>
    </div>
  );
}

export default NavBar;
