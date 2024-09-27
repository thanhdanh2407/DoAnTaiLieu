// import React, { useState, useEffect } from "react";

// function DetailSearch() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Lấy từ khóa tìm kiếm từ URL
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const term = params.get("searchText");
//     if (term) {
//       setSearchTerm(term);
//       handleSearch(term); // Gọi hàm tìm kiếm khi có từ khóa trong URL
//     }
//   }, []);

//   const handleSearch = async (term) => {
//     if (!term) return;

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/search?searchText=${term}`
//       );
//       if (!response.ok) {
//         throw new Error("Có lỗi xảy ra khi tìm kiếm");
//       }
//       const data = await response.json();

//       if (Array.isArray(data.documentsByTitle)) {
//         setResults(data.documentsByTitle);
//       } else {
//         setResults([]);
//         console.error("Dữ liệu không phải là mảng:", data);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ margin: "20px" }}>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Nhập từ khóa tìm kiếm..."
//         style={{
//           padding: "10px",
//           width: "300px",
//           borderRadius: "5px",
//           border: "1px solid #ccc",
//         }}
//       />
//       <button
//         onClick={() => handleSearch(searchTerm)} // Tìm kiếm bằng từ khóa hiện tại
//         style={{
//           padding: "10px 15px",
//           marginLeft: "10px",
//           borderRadius: "5px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Tìm kiếm
//       </button>

//       {loading && <p>Đang tìm kiếm...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <ul>
//         {results.map((item, index) => (
//           <li key={index}>{item.title || item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default DetailSearch;

import React, { useState, useEffect } from "react";

function DetailSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy từ khóa tìm kiếm từ URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const term = params.get("searchText");
    if (term) {
      setSearchTerm(term);
      handleSearch(term); // Gọi hàm tìm kiếm khi có từ khóa trong URL
    }
  }, []);

  const handleSearch = async (term) => {
    if (!term) return;

    setLoading(true);
    setError("");

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

  // Hàm xử lý khi nhấn phím
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm); // Gọi hàm tìm kiếm khi nhấn Enter
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // Thêm sự kiện nhấn phím
        placeholder="Nhập từ khóa tìm kiếm..."
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={() => handleSearch(searchTerm)} // Tìm kiếm bằng từ khóa hiện tại
        style={{
          padding: "10px 15px",
          marginLeft: "10px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Tìm kiếm
      </button>

      {loading && <p>Đang tìm kiếm...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item.title || item}</li>
        ))}
      </ul>
    </div>
  );
}

export default DetailSearch;
