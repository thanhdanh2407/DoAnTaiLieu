import React, { useState } from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import "./css/index.css";
import avatar from "../../assets/iconAva.png";
import { FaUser } from "react-icons/fa6";
import Button from "../../components/Button/index";
import { useNavigate } from "react-router-dom";

function AdminCreateCategory() {
  const [categoryName, setCategoryName] = useState(""); // State for category name
  const navigate = useNavigate(); // Hook to navigate to other routes

  // Function to handle category creation
  const handleCreateCategory = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`,
          },
          body: JSON.stringify({ name: categoryName }), // Sending the category name
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      // Optionally reset the input field after successful creation
      setCategoryName("");
      // Redirect to category management page or show success message
      navigate("/admin/adminManageCategory"); // Adjust this based on your routing
    } catch (err) {
      console.error(err.message);
      // Handle error, e.g., show a toast notification
    }
  };

  return (
    <div className="containerAdminCreateCategory">
      <div className="leftAdminCreateCategory">
        <NavBar />
      </div>
      <div className="rightAdminCreateCategory">
        <div className="containerHeaderAdmin">
          <div className="avatarAdmin">
            <img src={avatar} alt="avatar" className="avatarAdminInfo" />
          </div>
          <div className="fullNameAdmin">Admin</div>
        </div>
        <div className="containerInfoDocument">
          <div className="containerSearchAdmin">
            <span className="titleInfoAdmin">
              <FaUser className="iconUser" />
              <span className="titleInfo">Tạo thể loại</span>
            </span>
          </div>
          <div className="containerCreateCategory">
            <div className="background">
              <div className="createCategoryInput">
                <input
                  type="text"
                  placeholder="Nhập tên thể loại..."
                  className="inputCreateCategoryAdmin"
                  value={categoryName} // Bind input value to state
                  onChange={(e) => setCategoryName(e.target.value)} // Update state on input change
                />
              </div>
              <div className="containerBtn">
                <Button
                  className="btnSendCategory"
                  onClick={handleCreateCategory}
                >
                  Tạo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateCategory;
