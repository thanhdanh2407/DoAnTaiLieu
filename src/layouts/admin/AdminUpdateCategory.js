import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./css/index.css";
import NavBar from "../../components/Admin/NavBar/NavBar";
import avatar from "../../assets/iconAva.png";
import { FaUser } from "react-icons/fa6";
import Button from "../../components/Button/index";

function AdminUpdateCategory() {
  const { id } = useParams(); // Get the category ID from the URL params
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [category, setCategory] = useState("");

  // Fetch category data when the component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem("authToken"); // Get the token from local storage
      try {
        const response = await fetch(
          `http://localhost:8080/api/admin/categories/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: ` ${token}`, // Include the token in the request
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch category data");
        }

        const data = await response.json();
        setCategory(data.name); // Assuming the response contains a `name` property
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]); // Include id in the dependency array

  // Function to handle input change
  const handleInputChange = (e) => {
    setCategory(e.target.value);
  };

  // Function to handle category update
  const handleUpdateCategory = async () => {
    const token = localStorage.getItem("authToken"); // Get the token from local storage

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`, // Include the token in the request
          },
          body: JSON.stringify({ name: category }), // Adjust the body according to your API needs
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const data = await response.json();
      console.log("Category updated successfully:", data);
      // Redirect to the manage categories page after a successful update
      navigate("/admin/adminManageCategory"); // Use navigate to redirect to the manage category page
    } catch (error) {
      console.error("Error updating category:", error);
      // Optionally handle error (e.g., show a toast notification)
    }
  };

  return (
    <div className="containerAdminUpdateCategory">
      <div className="leftAdminUpdateCategory">
        <NavBar />
      </div>
      <div className="rightAdminUpdateCategory">
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
              <span className="titleInfo">Cập nhật thể loại</span>
            </span>
          </div>
          <div className="containerCreateCategory">
            <div className="background">
              <div className="createCategoryInput">
                <input
                  className="inputCreateCategoryAdmin"
                  value={category}
                  onChange={handleInputChange} // Handle input change
                  placeholder="Enter category name" // Optional placeholder
                />
              </div>
              <div className="containerBtn">
                <Button
                  className="btnSendCategory"
                  onClick={handleUpdateCategory}
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUpdateCategory;
