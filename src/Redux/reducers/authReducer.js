const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  // user: null,
  // isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "REGISTER_REQUEST":
      return { ...state, loading: true, error: null };
    case "REGISTER_SUCCESS":
      console.log("Register Success Payload:", action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: action.payload,
      };

    case "REGISTER_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
