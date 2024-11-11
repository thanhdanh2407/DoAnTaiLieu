import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { FaStar, FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import imgDocument from "../assets/itemDocument.png";

function DetailSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 12;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const term = params.get("searchText");
    if (term) {
      setSearchTerm(term);
      handleSearch(term);
    }
  }, []);

  const handleItemClick = (id) => {
    navigate(`/documents/${id}`);
  };

  const handleSearch = async (term) => {
    if (!term) return;

    setLoading(true);
    setError("");
    setCurrentPage(0); // Reset về trang đầu khi tìm kiếm mới

    try {
      const response = await fetch(
        `http://localhost:8080/api/search?searchText=${term}`
      );
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tìm kiếm");
      }
      const data = await response.json();

      if (Array.isArray(data.documentsByTitle)) {
        setResults(data.documentsByTitle);
      } else {
        setResults([]);
        console.error("Dữ liệu không phải là mảng:", data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi nhấn phím Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm); // Gọi hàm tìm kiếm khi nhấn Enter
    }
  };

  // Phân trang
  const offset = currentPage * itemsPerPage;
  const currentItems = results.slice(offset, offset + itemsPerPage); // Các kết quả hiển thị trên trang hiện tại

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const getStatusText = (status) => {
    switch (status) {
      case "VERIFIED":
        return "Đã duyệt";
      case "CREATED":
        return "Chưa duyệt";
      case "REJECTED":
        return "Từ chối";
      default:
        return status;
    }
  };

  return (
    <div className="containerSearch">
      <div className="listItemSearch">
        <div className="titleDetailSearch">Tìm Kiếm</div>
        <div className="containerDetailSearch">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập từ khóa tìm kiếm..."
            className="inputDetailSearch"
          />
          <button
            onClick={() => handleSearch(searchTerm)}
            className="btnDetailSearch"
          >
            Tìm kiếm
          </button>
          {/* <Button className="btnSort">
            <BsSortDownAlt className="iconSort" onClick={() => {}} />
            <span className="titleButtonIcon">Từ A - Z</span>
          </Button>
          <Button className="btnSort">
            <BsSortDown className="iconSort" onClick={() => {}} />
            <span className="titleButtonIcon">Từ Z - A</span>
          </Button>
          <Button className="btnSort">
            <FaEye className="iconSort" onClick={() => {}} />
            <span className="titleButtonIcon">Xem Nhiều</span>
          </Button> */}
        </div>
      </div>
      <div className="containerListResult">
        <div className="listResult">
          {loading ? (
            <div className="titleLoading">Đang tìm kiếm...</div>
          ) : results.length === 0 && searchTerm ? (
            <div className="titleSearchNo">
              Không có tài liệu nào phù hợp với tìm kiếm của bạn.
            </div>
          ) : (
            currentItems.map((item, index) => (
              <div
                key={item.id}
                className="itemDetailSearch"
                onClick={() => handleItemClick(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="imgDetailSearch"
                  onError={(e) => {
                    e.target.src = imgDocument; // Thay đổi src nếu không tải được
                  }}
                />
                <div className="listInfoDetailSearch">
                  <div className="titleInfo">{item.title}</div>
                  <div className="listItemInfo">
                    <TbClipboardList />
                    Thể loại: {item.categoryName}
                  </div>
                  <div className="listItemInfo">
                    <WiTime5 />
                    Thời gian: {item.relativeCreatedAt}
                  </div>
                  <div className="listItemInfo">
                    <LuUser2 />
                    {item.userName}
                  </div>
                  <div className="listItemInfoAcp">
                    <FiCheckCircle />
                    {getStatusText(item.status)}
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
          )}
        </div>
      </div>

      <ReactPaginate
        previousLabel={"←"}
        nextLabel={" →"}
        breakLabel={"..."}
        pageCount={Math.ceil(results.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default DetailSearch;
