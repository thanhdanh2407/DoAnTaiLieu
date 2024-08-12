import React from "react";
import Home from "./layouts/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Header from "./layouts/Header";
import Register from "./layouts/Register";
import Login from "./layouts/Login";
import ForgotPassword from "./layouts/ForgotPassword";
import ChangePassword from "./layouts/ChangePassword";
import CreateDocuments from "./layouts/CreateDocuments";
import UpdateDocuments from "./layouts/UpdateDocuments";
import UpdateUser from "./layouts/UpdateUser";
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Header />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/createdocuments" element={<CreateDocuments />} />
          <Route path="/updatedocument" element={<UpdateDocuments />} />
          <Route path="/updateuser" element={<UpdateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
