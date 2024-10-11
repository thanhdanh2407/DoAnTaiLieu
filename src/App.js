// import React from "react";
// import Home from "./layouts/Home";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navigation from "./components/Navigation";
// import Header from "./layouts/Header";
// import Register from "./layouts/Register";
// import Login from "./layouts/Login";
// import ForgotPassword from "./layouts/ForgotPassword";
// import ChangePassword from "./layouts/ChangePassword";
// import CreateDocuments from "./layouts/CreateDocuments";
// import UpdateDocuments from "./layouts/UpdateDocuments";
// import UpdateUser from "./layouts/UpdateUser";
// import User from "./layouts/User";
// import About from "./layouts/About";
// import Footer from "./layouts/Footer";
// import Detail from "./layouts/Detail";
// import ListUser from "./layouts/ListUser";
// import DetailSearch from "./layouts/DetailSearch";
// import CategorySearch from "./layouts/CategorySearch";
// import LiseDocumentCreate from "./layouts/LiseDocumentCreate";
// import ListDocumentVerified from "./layouts/ListDocumentVerified";
// import HomeAdmin from "./layouts/admin/HomeAdmin";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navigation />
//         <Header />
//         <Routes>
//           <Route path="/homeadmin" element={<HomeAdmin />} />
//           <Route path="*" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgotpassword" element={<ForgotPassword />} />
//           <Route path="/changepassword" element={<ChangePassword />} />
//           <Route path="/createdocuments" element={<CreateDocuments />} />
//           <Route
//             path="/updatedocument/:documentId"
//             element={<UpdateDocuments />}
//           />
//           <Route path="/updateuser" element={<UpdateUser />} />
//           <Route path="/user" element={<User />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/documents/:id" element={<Detail />} />
//           <Route path="/listuser" element={<ListUser />} />
//           <Route path="/detailsearch" element={<DetailSearch />} />
//           <Route
//             path="/documents/category/:categoryName"
//             element={<CategorySearch />}
//           />
//           <Route path="/listdocumentcreate" element={<LiseDocumentCreate />} />
//           <Route
//             path="/documents/user/:userId/verified"
//             element={<ListDocumentVerified />}
//           />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./layouts/Home";
import Admin from "./layouts/admin/HomeAdmin"; // Nhập Admin
import Register from "./layouts/Register";
import Login from "./layouts/Login";
import ForgotPassword from "./layouts/ForgotPassword";
import ChangePassword from "./layouts/ChangePassword";
import CreateDocuments from "./layouts/CreateDocuments";
import UpdateDocuments from "./layouts/UpdateDocuments";
import UpdateUser from "./layouts/UpdateUser";
import User from "./layouts/User";
import About from "./layouts/About";
import Detail from "./layouts/Detail";
import ListUser from "./layouts/ListUser";
import DetailSearch from "./layouts/DetailSearch";
import CategorySearch from "./layouts/CategorySearch";
import LiseDocumentCreate from "./layouts/LiseDocumentCreate";
import ListDocumentVerified from "./layouts/ListDocumentVerified";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="*"
            element={
              <>
                <Navigation />
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgotpassword" element={<ForgotPassword />} />
                  <Route path="/changepassword" element={<ChangePassword />} />
                  <Route
                    path="/createdocuments"
                    element={<CreateDocuments />}
                  />
                  <Route
                    path="/updatedocument/:documentId"
                    element={<UpdateDocuments />}
                  />
                  <Route path="/updateuser" element={<UpdateUser />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/documents/:id" element={<Detail />} />
                  <Route path="/listuser" element={<ListUser />} />
                  <Route path="/detailsearch" element={<DetailSearch />} />
                  <Route
                    path="/documents/category/:categoryName"
                    element={<CategorySearch />}
                  />
                  <Route
                    path="/listdocumentcreate"
                    element={<LiseDocumentCreate />}
                  />
                  <Route
                    path="/documents/user/:userId/verified"
                    element={<ListDocumentVerified />}
                  />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
