import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Submenu from "../components/Submenu";
import ReactPaginate from "react-paginate";
import "./css/index.css";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FaEye, FaStar } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

function CategorySearch() {
  const { categoryName } = useParams(); // Lấy tên danh mục từ URL
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const response = await fetch(
          `http://localhost:8080/api/documents/category/${categoryName}`
        );
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu");
        }
        const data = await response.json();
        setItems(data); // Giả sử `data` là mảng các item
      } catch (error) {
        console.error("Lỗi khi lấy item:", error);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchItems();
  }, [categoryName]); // Chạy lại khi categoryName thay đổi

  // Calculate the items to display based on the current page
  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleItemClick = (id) => {
    navigate(`/documents/${id}`);
  };

  return (
    <div className="containerCategory">
      <Submenu />
      <div className="titleCategory">Danh sách {categoryName}</div>
      <div className="itemCategoryListDocument">
        {loading ? (
          <div className="loadingCategory">Loading . . .</div>
        ) : currentItems.length > 0 ? (
          <div className="grid">
            {currentItems.map((item) => (
              <div
                className="item"
                key={item.id}
                onClick={() => handleItemClick(item.id)}
              >
                <div className="imgAvatarCategory">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="avatarCategory"
                  />
                </div>
                <div className="itemCategorySearch">
                  <div className="titleNameCategory">{item.title}</div>
                  <div className="listItemInfoHome">
                    <TbClipboardList />
                    Thể loại: {item.categoryName}
                  </div>
                  <div className="listItemInfoHome">
                    <WiTime5 />
                    Thời gian: {item.relativeUpdatedAt}
                  </div>
                  <div className="listItemInfoHome">
                    <LuUser2 />
                    <span className="titleHomeUser">
                      Người Đăng: {item.author}
                    </span>
                  </div>
                  <div className="listItemInfoHome">
                    <FaEye />
                    <span className="titleView">Lượt xem: {item.view}</span>
                  </div>
                  <div className="listItemInfoAcpHome">
                    <FiCheckCircle />
                    <span className="titleApproved">{item.status}</span>
                  </div>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`star ${
                          star <= item.rating ? "filled" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Không có item nào trong danh mục này.</div>
        )}
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(items.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default CategorySearch;
