export const loginSuccess = (token) => ({
  type: "LOGIN_SUCCESS",
  payload: token,
});

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const token = await response.text(); // Nhận token dưới dạng chuỗi
    dispatch(loginSuccess(token));

    // Lưu token vào localStorage
    localStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Login failed:", error);
  }
};
