import React, { useEffect, useState } from "react";
import NavBar from "../../components/Admin/NavBar/NavBar";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";
import { FaUser } from "react-icons/fa";
import Button from "../../components/Button";
import { FiSearch } from "react-icons/fi";
import avatar from "../../assets/iconAva.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminDocumentCancel() {
  const [rejectedDocuments, setRejectedDocuments] = useState([]);
  const navigate = useNavigate();

  // Function to fetch rejected documents
  const fetchRejectedDocuments = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/documents/rejected",
        {
          method: "GET",
          headers: {
            Authorization: `${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch rejected documents");
      }

      const data = await response.json();
      setRejectedDocuments(data);
    } catch (error) {
      console.error("Error fetching rejected documents:", error);
      toast.error("Không thể tải tài liệu bị từ chối.");
    }
  };

  const handleDeleteDocument = async (id) => {
    const authToken = localStorage.getItem("authToken");

    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/admin/documents/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete document");
        }

        setRejectedDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc.id !== id)
        );
        toast.success("Xoá tài liệu thành công");
      } catch (error) {
        console.error("Error deleting document:", error);
        toast.error("Failed to delete document");
      }
    }
  };

  useEffect(() => {
    fetchRejectedDocuments();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "REJECTED":
        return "status-rejected"; // Red color class
      default:
        return "";
    }
  };

  const handleAdminDetailDocumentClick = (id) => {
    navigate(`/admin/adminDetailDocument/documents/${id}`);
  };

  return (
    <div className="containerAdminDocumentCancel">
      <div className="leftAdminDocumentCancel">
        <NavBar />
      </div>
      <div className="rightAdminDocumentCancel">
        <HeaderAdmin />
        <div className="containerInfoDocument">
          <div className="containerSearchAdmin">
            <span className="titleInfoAdmin">
              <FaUser className="iconUser" />
              <span className="titleInfo">Tài liệu bị từ chối</span>
            </span>
            <div className="searchDocumentAdmin">
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu"
                className="inputSearchAdmin"
              />
              <FiSearch className="searchIcon" />
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
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {rejectedDocuments.length > 0 ? (
                  rejectedDocuments.map((document, index) => (
                    <tr key={document.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={document.image || avatar}
                          alt="User"
                          className="userImage"
                        />
                      </td>
                      <td>{document.title}</td>
                      <td>{document.author}</td>
                      <td>{document.view}</td>
                      <td>{document.categoryName}</td>
                      <td>
                        <div
                          className={`status ${getStatusClass(
                            document.status
                          )}`}
                        >
                          {document.status}
                        </div>
                      </td>
                      <td>
                        <button
                          className="btnOpenDocument"
                          onClick={() =>
                            handleAdminDetailDocumentClick(document.id)
                          }
                        >
                          Xem
                        </button>
                        <button
                          className="btnDelete"
                          onClick={() => handleDeleteDocument(document.id)}
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">Không có tài liệu bị từ chối.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDocumentCancel;
