// import React, { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserInfo } from "./actions/authActions";
// import { logout } from "../Redux/actions/authActions";

// const AccountStatusChecker = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const location = useLocation(); // Get the current location

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       const fetchUser = async () => {
//         try {
//           const userInfoResponse = await fetch(
//             "http://localhost:8080/api/user/me",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           if (!userInfoResponse.ok) {
//             throw new Error("Unable to fetch user info");
//           }

//           const userInfo = await userInfoResponse.json();
//           localStorage.setItem("user", JSON.stringify(userInfo)); // Save user info

//           // Check if the user's account is disabled
//           if (!userInfo.enabled) {
//             // If account is locked
//             localStorage.removeItem("authToken");
//             localStorage.removeItem("user");
//             localStorage.removeItem("userRole"); // Clear user role if it exists
//             navigate("/login"); // Navigate to the login page
//           } else {
//             // If account is not locked, update state
//             dispatch(fetchUserInfo(token));
//           }
//         } catch (error) {
//           console.error(error);
//           // Handle error if necessary
//         }
//       };

//       fetchUser();
//     }
//   }, [dispatch, navigate, location.pathname]);
//   useEffect(() => {
//     if (user && !user.enabled) {
//       dispatch(logout());
//       // Optionally, you can redirect to the login page or show a message
//     }
//   }, [user, dispatch]);

//   return null; // Do not render anything
// };

// export default AccountStatusChecker;

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, logout } from "../Redux/actions/authActions";

const AccountStatusChecker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const location = useLocation(); // Get the current location to track navigation

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Unable to fetch user info");
          }

          const userInfo = await response.json();
          localStorage.setItem("user", JSON.stringify(userInfo)); // Save user info

          // Check if the user's account is locked (enabled = false)
          if (!userInfo.enabled) {
            // Perform logout if the account is locked
            dispatch(logoutUserAndRedirect());
          } else {
            // Dispatch user info to Redux store if account is enabled
            dispatch(fetchUserInfo(token));
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };

      fetchUser();
    }
  }, [dispatch, location.pathname]); // Track user navigation with location.pathname

  const logoutUserAndRedirect = () => {
    // Clear local storage and logout user
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole"); // Clear user role if saved

    // Dispatch logout action to Redux store
    dispatch(logout());

    // Redirect user to login page
    navigate("/login");
  };

  useEffect(() => {
    // If user is in the Redux store and the account is locked, logout
    if (user && !user.enabled) {
      logoutUserAndRedirect();
    }
  }, [user]); // Trigger logout when user account is locked

  return null; // The component doesn't need to render anything
};

export default AccountStatusChecker;
