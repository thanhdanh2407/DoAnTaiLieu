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

  // Function to fetch documents from the API
  const fetchDocuments = async () => {
    const authToken = localStorage.getItem("authToken"); // Get the token from local storage

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/documents",
        {
          method: "GET",
          headers: {
            Authorization: `${authToken}`, // Set the Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }

      const data = await response.json();
      setDocuments(data); // Store the fetched documents in state
    } catch (error) {
      console.error("Error fetching documents:", error); // Log any errors
      toast.error("Error fetching documents"); // Show error toast
    }
  };

  // Function to sort documents by view count in descending order
  const handleSortDocuments = async () => {
    const authToken = localStorage.getItem("authToken"); // Get the token from local storage

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/documents/sorted?sortBy=view&order=desc",
        {
          method: "GET",
          headers: {
            Authorization: `${authToken}`, // Set the Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sort documents");
      }

      const sortedData = await response.json();
      setDocuments(sortedData); // Update the state with sorted documents
      toast.success("Sắp xếp tài liệu thành công"); // Show success toast
    } catch (error) {
      console.error("Error sorting documents:", error); // Log any errors
      toast.error("Error sorting documents"); // Show error toast
    }
  };

  useEffect(() => {
    fetchDocuments(); // Fetch documents on component mount
  }, []);

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
    if (window.confirm("Are you sure you want to delete this document?")) {
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
            <div className="containerBtnSort">
              <Button className="btnAdd" onClick={handleSortDocuments}>
                Sắp xếp
              </Button>
            </div>
          </div>
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
                        src={document.image || avatar}
                        alt="User"
                        className="userImage"
                        onError={(e) => {
                          e.target.src = avatar; // Thay đổi src nếu không tải được
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
