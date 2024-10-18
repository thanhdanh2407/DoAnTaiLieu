import React, { useState } from "react";
import "./index.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoReloadCircle } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { GrLogout } from "react-icons/gr";

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNavBar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`containerNavBar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className={`navbar`}>
        <div className="navbar-content">
          <div className={`itemAdmin ${isExpanded ? "expanded" : "collapsed"}`}>
            <HiHome />
            {isExpanded && <span className="titleAdminManege">Trang chủ</span>}
          </div>
          <div className={`itemAdmin ${isExpanded ? "expanded" : "collapsed"}`}>
            <FaUser />
            {isExpanded && (
              <span className="titleAdminManege">Quản lí người dùng</span>
            )}
          </div>
          <div
            className={`itemAdmin ${isExpanded ? "expanded" : "collapsed"}`}
            onClick={toggleDropdown} // Toggle khi click vào
          >
            <MdManageAccounts />
            {isExpanded && (
              <span className="titleAdminManege">
                <span>Quản lí tài liệu</span>{" "}
                <div className="iconDownUp">
                  {isDropdownOpen ? <HiArrowSmallUp /> : <HiArrowSmallDown />}
                </div>
              </span>
            )}
          </div>
          {isExpanded && isDropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-item">
                <IoDocumentsOutline />
                <span>Tất cả tài liệu</span>
              </div>
              <div className="dropdown-item">
                <IoReloadCircle />
                <span>Tài liệu chờ duyệt</span>
              </div>
              <div className="dropdown-item">
                <IoCheckmarkDoneCircle />
                <span>Tài liệu đã duyệt</span>
              </div>
            </div>
          )}
          <div className={`itemAdmin ${isExpanded ? "expanded" : "collapsed"}`}>
            <BiCategory />
            {isExpanded && (
              <span className="titleAdminManege">Quản lí thể loại</span>
            )}
          </div>
          <div className={`itemAdmin ${isExpanded ? "expanded" : "collapsed"}`}>
            <GrLogout />
            {isExpanded && <span className="titleAdminManege">Đăng xuất</span>}
          </div>
        </div>
      </div>
      <div className="btn">
        <button
          onClick={toggleNavBar}
          className={`btnLeftRight ${isExpanded ? "expanded" : "collapsed"}`}
        >
          {isExpanded ? <AiOutlineLeft /> : <AiOutlineRight />}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
