import React, { useEffect, useState } from "react";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaEye } from "react-icons/fa";
import NavBar from "../../components/Admin/NavBar/NavBar";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";
import { FaUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

function AdminListAllDocument() {
  const { userId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const [documentsPerPage] = useState(12); // Set documents per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/documents/user/${userId}/verified`
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
  }, [userId]);

  const pageCount = Math.ceil(documents.length / documentsPerPage);
  const displayedDocuments = documents.slice(
    currentPage * documentsPerPage,
    (currentPage + 1) * documentsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemClick = (id) => {
    navigate(`/admin/adminDetailDocument/documents/${id}`);
  };

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
              <span className="titleInfo">Thông tin người dùng</span>
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
          <div className="bl">
            <div className="containerListDocumentCreate">
              <div className="titleListUserAdmin">Danh sách tài liệu</div>
              {loading ? (
                <div className="loadingDocument">Loading...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : documents.length === 0 ? (
                <div className="loadingDocument">
                  Không có tài liệu nào được duyệt.
                </div>
              ) : (
                <div>
                  <div className="containerListUserDocument">
                    {displayedDocuments.map((document) => (
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
                          <div className="listItemInfoAcp">
                            <FiCheckCircle />
                            {document.status}
                          </div>
                          <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`star ${star <= 5 ? "filled" : ""}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ReactPaginate
                    previousLabel={"←"}
                    nextLabel={" →"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminListAllDocument;
