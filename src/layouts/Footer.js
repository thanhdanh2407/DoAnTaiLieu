// import React, { useState } from "react";
// import "./css/index.css";
// import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
// import "react-toastify/dist/ReactToastify.css"; // Import the toast styles
// import Button from "../components/Button";
// import logo from "../assets/logo2.png";

// const Footer = () => {
//   const [email, setEmail] = useState("");

//   // const handleSubscribe = async () => {
//   //   const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
//   //   if (!token) {
//   //     toast.error("Vui lòng đăng nhập trước khi đăng ký!"); // Show error toast if not logged in
//   //     return;
//   //   }

//   //   if (!email) {
//   //     toast.error("Please enter a valid email address."); // Show error toast for empty email
//   //     return;
//   //   }

//   //   try {
//   //     const response = await fetch(
//   //       `http://localhost:8080/api/subscribe?email=${email}`,
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: token,
//   //         },
//   //         body: JSON.stringify({}),
//   //       }
//   //     );

//   //     if (response.ok) {
//   //       const message = await response.text();
//   //       toast.success("Đăng ký thành công!"); // Show success toast
//   //       setEmail(""); // Clear the input field after successful subscription
//   //     } else {
//   //       const errorMessage = await response.text();
//   //       if (errorMessage.includes("already subscribed")) {
//   //         toast.info("Email đã follow rồi!"); // Show info toast if email is already subscribed
//   //       } else {
//   //         toast.error(`Error: ${errorMessage}`); // Show error toast for other errors
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error("Error subscribing:", error);
//   //     toast.error("Failed to subscribe. Please try again later."); // Show error toast
//   //   }
//   // };

//   const handleSubscribe = async () => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       toast.error("Vui lòng đăng nhập trước khi đăng ký!");
//       setEmail("");
//       return;
//     }

//     if (!email) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/subscribe?email=${email}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({}),
//         }
//       );

//       if (response.ok) {
//         toast.success("Đăng ký thành công!");
//         setTimeout(() => {
//           setEmail("");
//         }, 1000);
//       } else {
//         const errorMessage = await response.text();
//         if (errorMessage.includes("already subscribed")) {
//           toast.info("Email đã follow rồi!");
//         } else {
//           toast.error(`Error: ${errorMessage}`);
//         }
//       }
//     } catch (error) {
//       console.error("Error subscribing:", error);
//       toast.error("Failed to subscribe. Please try again later.");
//     }
//   };

//   return (
//     <div className="containerFooter">
//       <div className="containerSub">
//         <div className="avaSub">
//           <img src={logo} alt="logo" className="logoSub" />
//         </div>
//         <div className="subscribeContainer">
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Nhập email để đăng ký nhận bản tin"
//             className="subscribeInput"
//           />
//           <Button onClick={handleSubscribe} className="subscribeButton">
//             Đăng ký
//           </Button>
//         </div>
//       </div>

//       <p className="titleFooter">Địa chỉ: Trâu Qùy - Gia Lâm - Hà Nội</p>
//       <p className="titleFooter">
//         Điện thoại: 84.024.62617586 - Fax: 84 024 62617586 /
//         webmaster@vnua.edu.vn
//       </p>
//       <p className="titleFooter">Copyright @2024</p>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Footer;

import React, { useState } from "react";
import "./css/index.css";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles
import Button from "../components/Button";
import logo from "../assets/logo2.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Vui lòng đăng nhập trước khi đăng ký!");
      setEmail("");
      return;
    }

    if (!email) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/subscribe?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        toast.success("Đăng ký thành công!"); // Hiện thông báo thành công
        setEmail(""); // Xóa nội dung email sau khi đăng ký thành công
      } else {
        const errorMessage = await response.text();
        if (errorMessage.includes("already subscribed")) {
          toast.info("Email đã đăng ký rồi!");
          setEmail("");
        } else {
          toast.error(`Email đã đăng ký rồi`);
          setEmail("");
        }
      }
    } catch (error) {
      console.error("Lỗi trong quá trình đăng ký:", error);
      toast.error("Không thể đăng ký. Vui lòng thử lại sau."); // Thông báo lỗi khi có sự cố mạng
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
