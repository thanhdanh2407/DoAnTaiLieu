import React, { useEffect, useState } from "react";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import { FaUser, FaEye, FaStar } from "react-icons/fa";
import NavBar from "../../components/Admin/NavBar/NavBar";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";
import { FiSearch } from "react-icons/fi";
import Button from "../../components/Button";

function AdminListAllDocument() {
  const { userId } = useParams(); // Dynamic userId from URL
  const [documents, setDocuments] = useState([]); // Approved documents
  const [rejectedDocuments, setRejectedDocuments] = useState([]); // Rejected documents
  const [pendingDocuments, setPendingDocuments] = useState([]); // Pending documents
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingRejected, setLoadingRejected] = useState(false); // Loading state for rejected documents
  const [loadingPending, setLoadingPending] = useState(false); // Loading state for pending documents
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const [documentsPerPage] = useState(8); // Set documents per page
  const [showRejected, setShowRejected] = useState(false); // New state for showing rejected documents
  const [showPending, setShowPending] = useState(false); // New state for showing pending documents
  const navigate = useNavigate();

  // Get authToken from localStorage
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/admin/documents/user/${userId}/verified`, // Use dynamic userId
          {
            headers: {
              Authorization: `${authToken}`, // Include authToken in the Authorization header
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch documents");
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [authToken, userId]); // Re-run the effect if authToken or userId changes

  const fetchRejectedDocuments = async () => {
    setLoadingRejected(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/documents/user/${userId}/rejected`,
        {
          headers: {
            Authorization: `${authToken}`, // Include authToken in the Authorization header
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch rejected documents");
      const data = await response.json();
      setRejectedDocuments(data);
      setShowRejected(true); // Update to show rejected documents
      setCurrentPage(0); // Reset current page
      setShowPending(false); // Reset pending documents display
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingRejected(false);
    }
  };

  const fetchPendingDocuments = async () => {
    setLoadingPending(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/documents/user/${userId}/created`,
        {
          headers: {
            Authorization: `${authToken}`, // Include authToken in the Authorization header
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch pending documents");
      const data = await response.json();
      setPendingDocuments(data);
      setShowPending(true); // Update to show pending documents
      setCurrentPage(0); // Reset current page
      setShowRejected(false); // Reset rejected documents display
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPending(false);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemClick = (id) => {
    navigate(`/admin/adminDetailDocument/documents/${id}`);
  };

  // Calculate the current documents to display based on pagination
  const indexOfLastDocument = (currentPage + 1) * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = showRejected
    ? rejectedDocuments.slice(indexOfFirstDocument, indexOfLastDocument)
    : showPending
    ? pendingDocuments.slice(indexOfFirstDocument, indexOfLastDocument)
    : documents.slice(indexOfFirstDocument, indexOfLastDocument);

  return (
    <div className="containerAdminListAllDocument">
      <div className="leftAdminListAllDocument">
        <NavBar />
      </div>
      <div className="rightAdminListAllDocument">
        <HeaderAdmin />
        <div className="containerInfoDocument">
          <div className="containerSearchAdminInfo">
            <span className="titleInfoAdmin">
              <FaUser className="iconUser" />
              <span className="titleInfo">Danh sách người dùng</span>
            </span>
          </div>
          <div className="bl">
            <div className="containerListDocumentCreate">
              <div className="titleListUserAdmin">Danh sách tài liệu</div>
              <div className="containerBtnSearch">
                <div className="containerBtnSearchCancel">
                  <Button
                    className="btnSearchCancel"
                    onClick={fetchRejectedDocuments}
                  >
                    Tài liệu từ chối
                  </Button>
                </div>
                <div className="containerBtnSearchCancel">
                  <Button
                    className="btnSearchCancel"
                    onClick={fetchPendingDocuments}
                  >
                    Tài liệu chờ duyệt
                  </Button>
                </div>
                <div className="containerBtnSearchCancel">
                  <Button
                    className="btnSearchCancel"
                    onClick={() => {
                      setShowRejected(false);
                      setShowPending(false);
                      setCurrentPage(0); // Reset current page
                    }}
                  >
                    Tài liệu đã duyệt
                  </Button>
                </div>
              </div>
              {loading ? (
                <div className="loadingDocument">Loading...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : (
                <div className="containerListUserDocument">
                  {currentDocuments.map((document) => (
                    <div
                      className="itemDocumentOfUser"
                      key={document.id}
                      onClick={() => handleItemClick(document.id)}
                    >
                      <img
                        src={document.image}
                        alt={document.title}
                        className="imgDocument"
                      />
                      <div className="listInfo">
                        <div className="titleInfo">{document.title}</div>
                        <div className="listItemInfo">
                          <TbClipboardList />
                          Thể loại: {document.categoryName}
                        </div>
                        <div className="listItemInfo">
                          <WiTime5 />
                          Thời gian: {document.relativeUpdatedAt}
                        </div>
                        <div className="listItemInfo">
                          <LuUser2 />
                          Người Đăng: {document.author}
                        </div>
                        <div className="listItemInfo">
                          <FaEye />
                          <span className="titleView">
                            Lượt xem: {document.view}
                          </span>
                        </div>
                        <div className="listItemInfoAcpHome">
                          <FiCheckCircle />
                          <span className="titleApproved">
                            {document.status}
                          </span>
                        </div>
                        <div className="star-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`star ${
                                star <= document.rating ? "filled" : ""
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={Math.ceil(
                  (showRejected
                    ? rejectedDocuments.length
                    : showPending
                    ? pendingDocuments.length
                    : documents.length) / documentsPerPage
                )}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminListAllDocument;
