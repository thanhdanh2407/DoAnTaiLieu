import React, { useState } from "react";
import "./css/index.css";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles
import Button from "../components/Button";
import logo from "../assets/logo2.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    if (!email) {
      toast.error("Please enter a valid email address."); // Show error toast
      return;
    }

    try {
      // Construct the URL with the email query parameter directly
      const response = await fetch(
        `http://localhost:8080/api/subscribe?email=${email}`,
        {
          method: "POST", // Keep using POST
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Include the JWT token in the header
          },
          body: JSON.stringify({}), // Sending an empty body since the email is in the URL
        }
      );

      if (response.ok) {
        const message = await response.text();
        toast.success("Đăng ký thành công!"); // Show success toast
        setEmail(""); // Clear the input field after successful subscription
      } else {
        const errorMessage = await response.text();
        // Check for specific error message from the server
        if (errorMessage.includes("already subscribed")) {
          toast.info("Email đã follow rồi!"); // Show info toast if email is already subscribed
        } else {
          toast.error(`Error: ${errorMessage}`); // Show error toast for other errors
        }
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Failed to subscribe. Please try again later."); // Show error toast
    }
  };

  const handleUnsubscribe = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    if (!email) {
      toast.error("Please enter a valid email address."); // Show error toast
      return;
    }

    try {
      // Construct the URL with the email query parameter directly
      const response = await fetch(
        `http://localhost:8080/api/unsubscribe?email=${email}`,
        {
          method: "GET", // Use GET for unsubscribe
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Include the JWT token in the header
          },
        }
      );

      if (response.ok) {
        const message = await response.text();
        toast.success("Đã hủy đăng ký thành công!"); // Show success toast for unsubscribe
        setEmail(""); // Clear the input field after successful unsubscribe
      } else {
        const errorMessage = await response.text();
        if (errorMessage.includes("not subscribed")) {
          toast.info("Bạn chưa đăng ký."); // Show info toast if email is not subscribed
        } else {
          toast.error(`Error: ${errorMessage}`); // Show error toast for other errors
        }
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      toast.error("Failed to unsubscribe. Please try again later."); // Show error toast
    }
  };

  return (
    <div className="containerFooter">
      <div className="containerSub">
        <div className="avaSub">
          <img src={logo} alt="logo" className="logoSub" />
        </div>
        <div className="subscribeContainer">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email để đăng ký nhận bản tin"
            className="subscribeInput"
          />
          <Button onClick={handleSubscribe} className="subscribeButton">
            Đăng ký
          </Button>
          <Button onClick={handleUnsubscribe} className="unsubscribeButton">
            Hủy đăng ký
          </Button>
        </div>
      </div>

      <p className="titleFooter">Địa chỉ: Trâu Qùy - Gia Lâm - Hà Nội</p>
      <p className="titleFooter">
        Điện thoại: 84.024.62617586 - Fax: 84 024 62617586 /
        webmaster@vnua.edu.vn
      </p>
      <p className="titleFooter">Copyright @2024</p>

      <ToastContainer />
    </div>
  );
};

export default Footer;
