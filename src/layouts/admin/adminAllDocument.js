import React, { useEffect, useState } from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import avatar from "../../assets/itemDocument.png";
import { FaUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import Button from "../../components/Button";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate"; // Import ReactPaginate
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

function AdminAllDocument() {
  const [documents, setDocuments] = useState([]); // State to hold document data
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const itemsPerPage = 10; // Number of items per page
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authToken = localStorage.getItem("authToken");

  // Function to fetch documents from the API
  const fetchDocuments = () => {
    const baseURL = "http://localhost:8080/api/admin/documents";
    const url =
      sortOrder === "view"
        ? `${baseURL}/sorted?sortBy=view&order=asc`
        : sortOrder === "view_desc"
        ? `${baseURL}/sorted?sortBy=view&order=desc`
        : sortOrder === "createdAt"
        ? `${baseURL}/sorted?sortBy=createdAt&order=desc`
        : sortOrder === "createdAt_asc"
        ? `${baseURL}/sorted?sortBy=createdAt&order=asc`
        : sortOrder === "a_to_z"
        ? `${baseURL}/sorted?sortBy=title&order=asc`
        : sortOrder === "z_to_a"
        ? `${baseURL}/sorted?sortBy=title&order=desc`
        : baseURL;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${authToken}`, // Include the auth token in the header
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDocuments(data);
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        toast.error("Error fetching documents"); // Show error toast
      });
  };

  useEffect(() => {
    fetchDocuments();
  }, [sortOrder]);

  // Calculate the number of pages based on the total number of documents
  const pageCount = Math.ceil(documents.length / itemsPerPage);

  // Handle page click to set the current page
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage); // Update current page state
  };

  // Slice the documents to only show items for the current page
  const offset = currentPage * itemsPerPage;
  const currentDocuments = documents.slice(offset, offset + itemsPerPage);

  const handleAdminCreateDocumentClick = () => {
    navigate("/admin/adminCreateDocument");
  };

  const handleAdminUpdateDocumentClick = (id) => {
    navigate(`/admin/adminUpdateDocument/${id}`); // Pass ID for update
  };

  // Update this function to navigate to the detail document page with ID
  const handleAdminDetailDocumentClick = (id) => {
    navigate(`/admin/adminDetailDocument/documents/${id}`); // Pass ID for detail
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "CREATED":
        return "status-created"; // Blue color class
      case "VERIFIED":
        return "status-verified"; // Green color class
      case "REJECTED":
        return "status-rejected"; // Red color class
      default:
        return "";
    }
  };

  // Function to delete a document
  const handleDeleteDocument = async (id) => {
    const authToken = localStorage.getItem("authToken"); // Get the token from local storage

    // Confirmation dialog
    if (window.confirm("Bạn có muốn xoá tài liệu chứ")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/admin/documents/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `${authToken}`, // Set the Authorization header
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete document");
        }

        // Update state to remove the deleted document
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc.id !== id)
        );
        toast.success("Xoá tài liệu thành công"); // Show success toast
      } catch (error) {
        console.error("Error deleting document:", error);
        toast.error("Failed to delete document"); // Show error toast
      }
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(0);
    setIsModalOpen(false);
  };

  const handleShowAllDocuments = () => {
    setSortOrder("");
    setCurrentPage(0);
  };

  return (
    <div className="containerAdminAllDocument">
      <ToastContainer position="top-center" autoClose={5000} />{" "}
      {/* Add ToastContainer here */}
      <div className="leftAdminAllDocument">
        <NavBar />
      </div>
      <div className="rightAdminAllDocument">
        <HeaderAdmin />
        <div className="containerInfoDocument">
          <div className="containerSearchAdmin">
            <span className="titleInfoAdmin">
              <FaUser className="iconUser" />
              <span className="titleInfo">Tất cả tài liệu</span>
            </span>
            <div
              className="containerBtnAdd"
              onClick={handleAdminCreateDocumentClick}
            >
              <Button className="btnAdd">Tạo tài liệu</Button>
            </div>
            <Button
              className="btnSortAdminDocument"
              onClick={() => handleSortChange("view_desc")}
            >
              Xem nhiều nhất
            </Button>
            <Button
              className="btnSortAdminDocument"
              onClick={() => handleSortChange("view")}
            >
              Xem ít nhất
            </Button>
            <Button
              className="btnSortAdminDocument"
              onClick={() => setIsModalOpen(true)}
            >
              Xem thêm sắp xếp
            </Button>
          </div>
          {isModalOpen && (
            <div className="modalOverlay">
              <div className="sortModal">
                <h2 className="titleSortDocument">Sắp xếp</h2>
                <Button
                  className="buttonSortToast"
                  onClick={() => handleSortChange("createdAt")}
                >
                  Ngày tạo mới nhất
                </Button>
                <Button
                  className="buttonSortToast"
                  onClick={() => handleSortChange("createdAt_asc")}
                >
                  Ngày tạo cũ nhất
                </Button>
                <Button
                  className="buttonSortToast"
                  onClick={() => handleSortChange("a_to_z")}
                >
                  Từ A - Z
                </Button>
                <Button
                  className="buttonSortToast"
                  onClick={() => handleSortChange("z_to_a")}
                >
                  Từ Z - A
                </Button>
                <Button
                  className="buttonSortToast"
                  onClick={() => handleShowAllDocuments()}
                >
                  Tất cả
                </Button>
                <Button
                  className="buttonClose"
                  onClick={() => setIsModalOpen(false)}
                >
                  Đóng
                </Button>
              </div>
            </div>
          )}
          <div className="infoDocumentAdmin">
            <table className="documentTable">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên hiển thị</th>
                  <th>Tên người tạo</th>
                  <th>Lượt xem</th>
                  <th>Thể loại</th>
                  <th>Trạng thái</th>
                  <th>Tài liệu sở hữu</th>
                  <th>Sửa tài liệu</th>
                  <th>Xoá tài liệu</th>
                </tr>
              </thead>
              <tbody>
                {currentDocuments.map((document, index) => (
                  <tr key={document.id}>
                    <td>{offset + index + 1}</td>
                    <td>
                      <img
                        src={document.image}
                        alt="User"
                        className="userImage"
                        onError={(e) => {
                          e.target.src = avatar;
                        }}
                      />
                    </td>
                    <td>{document.title}</td>
                    <td>{document.author}</td>
                    <td>{document.view}</td>
                    <td>{document.categoryName}</td>
                    <td>
                      <div
                        className={`status ${getStatusClass(document.status)}`}
                      >
                        {document.status}
                      </div>
                    </td>
                    <td>
                      <button
                        className="btnOpenDocument"
                        onClick={() =>
                          handleAdminDetailDocumentClick(document.id)
                        } // Pass document ID
                      >
                        Xem
                      </button>
                    </td>
                    <td>
                      <button
                        className="btnUpdateDocument"
                        onClick={() =>
                          handleAdminUpdateDocumentClick(document.id)
                        } // Pass document ID
                      >
                        Sửa
                      </button>
                    </td>
                    <td>
                      <button
                        className="btnDelete"
                        onClick={() => handleDeleteDocument(document.id)} // Pass document ID for deletion
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminAllDocument;
