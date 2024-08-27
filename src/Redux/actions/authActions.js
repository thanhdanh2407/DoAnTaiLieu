export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invalid email or password");
    }

    const token = await response.text();
    localStorage.setItem("authToken", token);

    dispatch(fetchUserInfo(token));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// export const fetchUserInfo = (token, userId) => async (dispatch) => {
//   try {
//     const response = await fetch("http://localhost:8080/api/user/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch user information");
//     }

//     const userData = await response.json();
//     dispatch(loginSuccess(userData));
//     localStorage.setItem("user", JSON.stringify(userData));
//   } catch (error) {
//     dispatch(loginFailure(error.message));
//   }
// };
// authActions.js
export const fetchUserInfo = (userId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No authentication token found.");

    const response = await fetch(`http://localhost:8080/api/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }

    const userData = await response.json();
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: userData,
    });
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
};

export const register = (formData) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST" });
  try {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Registration failed");
    }

    dispatch({
      type: "REGISTER_SUCCESS",
    });
  } catch (error) {
    console.error("Catch Error:", error);
    dispatch({ type: "REGISTER_FAILURE", payload: error.message });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
      let errorMessage = "Đã xảy ra lỗi khi gửi email.";

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        if (response.status === 404) {
          errorMessage = "Email chưa được đăng ký.";
        } else {
          errorMessage = errorData.message || errorMessage;
        }
      } else {
        errorMessage = await response.text();
      }

      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return response.text();
    }
  } catch (error) {
    throw error;
  }
};

export const changePassword =
  (oldPassword, newPassword, reNewPassword) => async (dispatch) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No authentication token found.");
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ oldPassword, newPassword, reNewPassword }),
        }
      );

      const contentType = response.headers.get("Content-Type");
      let responseBody;

      if (contentType && contentType.includes("application/json")) {
        responseBody = await response.json();
      } else {
        responseBody = await response.text(); // Handle non-JSON responses
      }

      if (!response.ok) {
        console.error("Error Response Body:", responseBody);
        throw new Error(responseBody || "Failed to change password");
      }

      return responseBody;
    } catch (error) {
      console.error("Change Password Error:", error);
      throw new Error(
        error.message || "An error occurred while changing the password"
      );
    }
  };

// export const updateUser = (userId, userData) => async (dispatch) => {
//   dispatch({ type: "UPDATE_USER_REQUEST" });

//   try {
//     const response = await fetch(`http://localhost:8080/api/user/update`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       },
//       body: JSON.stringify(userData),
//     });

//     // Read response body as text first
//     const responseText = await response.text();

//     // Try to parse the response text as JSON
//     let responseBody;
//     try {
//       responseBody = JSON.parse(responseText);
//     } catch (e) {
//       responseBody = { message: responseText };
//     }

//     if (response.ok) {
//       dispatch({
//         type: "UPDATE_USER_SUCCESS",
//         payload: responseBody,
//       });
//     } else {
//       throw new Error(responseBody.message || "Something went wrong");
//     }

//     return responseBody;
//   } catch (error) {
//     dispatch({
//       type: "UPDATE_USER_FAILURE",
//       payload: error.message,
//     });
//     throw error;
//   }
// };
export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch({ type: "UPDATE_USER_REQUEST" });

  try {
    const formData = new FormData();

    // Append user data to the FormData object
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    const response = await fetch(`http://localhost:8080/api/user/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: formData,
    });

    // Handle the response based on its content type
    const contentType = response.headers.get("content-type");
    let responseBody;

    if (contentType && contentType.includes("application/json")) {
      // Parse JSON response
      responseBody = await response.json();
    } else {
      // Parse plain text response
      responseBody = await response.text();
    }

    if (response.ok) {
      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: responseBody,
      });
    } else {
      throw new Error(
        responseBody.message || responseBody || "Something went wrong"
      );
    }

    return responseBody;
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAILURE",
      payload: error.message,
    });
    throw error;
  }
};