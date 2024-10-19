import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function ListDocument() {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/documents")
      .then((response) => response.json())
      .then((data) => setDocuments(data))
      .catch((error) => console.error("Error fetching documents:", error));
  }, []);

  const handleItemClick = (id) => {
    navigate(`/documents/${id}`);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentDocuments = documents.slice(offset, offset + itemsPerPage);

  return (
    <div className="containerListDocument">
      <div className="titleListDocument">Tất cả các tài liệu</div>
      <div className="containerListItemDocument">
        {currentDocuments.length > 0 ? (
          currentDocuments.map((doc) => (
            <div
              key={doc.id}
              className="itemDocumentList"
              onClick={() => handleItemClick(doc.id)}
            >
              <img
                src={doc.image}
                alt={doc.title}
                className="imgDocumentList"
              />
              <div className="listInfo">
                <div className="titleInfo">{doc.title}</div>
                <div className="listItemInfo">
                  <TbClipboardList />
                  Thể loại: {doc.categoryName}
                </div>
                <div className="listItemInfo">
                  <WiTime5 />
                  Thời gian: {doc.relativeUpdatedAt}
                </div>
                <div className="listItemInfo">
                  <LuUser2 />
                  Người Đăng: {doc.author}
                </div>
                <div className="listItemInfoAcp">
                  <FiCheckCircle />
                  {doc.status}
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
          ))
        ) : (
          <div>Không có tài liệu nào.</div>
        )}
      </div>
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={" →"}
        breakLabel={"..."}
        pageCount={Math.ceil(documents.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default ListDocument;
