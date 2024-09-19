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
import User from "./layouts/User";
import About from "./layouts/About";
import Footer from "./layouts/Footer";
import Detail from "./layouts/Detail";
import ListUser from "./layouts/ListUser";
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
          <Route
            path="/updatedocument/:documentId"
            element={<UpdateDocuments />}
          />
          <Route path="/updateuser" element={<UpdateUser />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<About />} />
          <Route path="/documents/:id" element={<Detail />} />
          <Route path="/listuser" element={<ListUser />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
