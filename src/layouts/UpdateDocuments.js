import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateDocuments() {
  const { documentId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [existingPdfs, setExistingPdfs] = useState([]);
  const [error, setError] = useState(null);
  const pdfInputRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch categories");
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   if (documentId) {
  //     const fetchDocumentDetails = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:8080/api/documents/${documentId}`
  //         );
  //         if (!response.ok) throw new Error("Failed to fetch document details");
  //         const data = await response.json();

  //         setTitle(data.title);
  //         setDescription(data.description);
  //         setAuthor(data.author);
  //         setPublisher(data.publisher);
  //         setPublishingYear(data.publishingYear);
  //         setImagePreview(data.image);
  //         setCategoryId(data.categoryId);
  //         setCategoryName(data.categoryName);

  //         if (Array.isArray(data.pdfFiles)) {
  //           setExistingPdfs(data.pdfFiles);
  //         } else {
  //           setExistingPdfs([]); // Set as empty array if it's not an array
  //         }
  //       } catch (err) {
  //         setError("Failed to fetch document details");
  //         toast.error("Failed to fetch document details");
  //       }
  //     };
  //     fetchDocumentDetails();
  //   }
  // }, [documentId]);

  useEffect(() => {
    if (documentId) {
      const fetchDocumentDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/documents/${documentId}`
          );
          if (!response.ok) throw new Error("Failed to fetch document details");
          const data = await response.json();

          setTitle(data.title);
          setDescription(data.description);
          setAuthor(data.author);
          setPublisher(data.publisher);
          setPublishingYear(data.publishingYear);
          setImagePreview(data.image);
          setCategoryId(data.categoryId);
          setCategoryName(data.categoryName);

          // Update for handling single PDF
          if (Array.isArray(data.pdfFiles)) {
            setExistingPdfs(data.pdfFiles); // Handle an array of PDFs
          } else if (data.pdfFiles && typeof data.pdfFiles === "string") {
            setPdfFile(data.pdfFiles); // Handle a single PDF file as a string
            setPdfFileName(data.pdfFiles.split("/").pop()); // Extract file name from URL
          } else {
            setExistingPdfs([]); // No PDFs available, set as empty array
            setPdfFile(null); // No PDF available
            setPdfFileName(""); // Clear the file name
          }
        } catch (err) {
          setError("Failed to fetch document details");
          toast.error("Failed to fetch document details");
        }
      };
      fetchDocumentDetails();
    }
  }, [documentId]);

  const handlePdfUpload = (file) => {
    // Set the single PDF file and its name
    setPdfFile(file);
    setPdfFileName(file.name);

    // Clear the input so the user can re-select the file if needed
    if (pdfInputRef.current) {
      pdfInputRef.current.value = null;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Bạn chưa nhập tên tài liệu.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!publishingYear) {
      toast.error("Bạn chưa nhập năm xuất bản.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!categoryId) {
      toast.error("Bạn chưa chọn thể loại.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!description) {
      toast.error("Bạn chưa nhập mô tả chi tiết.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("author", author);
      formData.append("publisher", publisher);
      formData.append("publishingYear", publishingYear);

      if (categoryId) {
        formData.append("categoryId", categoryId);
      } else if (categoryName) {
        formData.append("categoryName", categoryName);
      }

      if (image) formData.append("image", image);
      if (pdfFile) formData.append("pdfFiles", pdfFile);

      const response = await fetch(
        `http://localhost:8080/api/documents/${documentId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update document: ${response.statusText} - ${errorText}`
        );
      }

      toast.success("Chỉnh sửa tài liệu thành công!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/user");
      }, 1000);
    } catch (err) {
      toast.error(`Failed to update document: ${err.message}`);
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="formCreateDocuments">
        <div className="titleCreateDocuments">Chỉnh sửa tài liệu</div>
        <form onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formColum">
              <div className="itemFormCreate">
                <div className="titleCoverImage">
                  Chọn lại Ảnh bìa tài liệu nếu thay đổi PDF
                  <span className="requiredStar">*</span>
                </div>
                <div className="titleSelectFile">
                  Vui lòng chọn tệp định dạng
                  <span className="requiredStar">JPG, PNG *</span>
                </div>
                <div
                  className="imgCover"
                  style={{ backgroundImage: `url(${imagePreview})` }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="fileInput"
                    onChange={handleImageChange}
                  />
                  {!imagePreview && (
                    <div className="uploadText">Chọn ảnh bìa</div>
                  )}
                </div>
              </div>
            </div>
            <div className="formColum">
              <div className="itemFormCreate">
                <div className="titleFileName">
                  Tên tài liệu<span className="requiredStar">*</span>
                  <input
                    type="text"
                    id="documentName"
                    className="inputItem"
                    placeholder="Nhập tên tài liệu"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    // required
                  />
                </div>
              </div>
              <div className="itemFormUpload">
                <label className="titleLabel" htmlFor="publicationYear">
                  Năm xuất bản<span className="requiredStar">*</span>
                </label>
                <input
                  type="number"
                  id="publicationYear"
                  placeholder="Nhập năm xuất bản"
                  className="inputItem"
                  value={publishingYear}
                  onChange={(e) => setPublishingYear(e.target.value)}
                  // required
                />
              </div>

              <div className="itemFormUpload">
                <label className="titleLabel" htmlFor="categoryId">
                  Hãy Chọn Thể loại<span className="requiredStar">*</span>
                </label>
                <select
                  id="categoryId"
                  className="inputItem"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Chọn thể loại</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="itemFormUpload">
                  <label className="titleLabel" htmlFor="categoryName">
                    Thể loại mới (nếu có)
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    className="inputItem"
                    placeholder="Nhập tên thể loại mới"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
              </div>

              <div className="itemFormUpload">
                <label className="titleLabel" htmlFor="pdfInput">
                  Tải tệp PDF mới<span className="requiredStar">*</span>
                </label>
                <div className="pdfUploadContainer">
                  <div className="pdfFileList">
                    {pdfFileName ? (
                      <div className="pdfFileItem">
                        <span>{pdfFileName}</span>
                        <button
                          className="removeButton"
                          onClick={handleRemovePdf}
                        >
                          Xóa
                        </button>
                      </div>
                    ) : (
                      <div className="noFilesText">Hãy chọn file</div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handlePdfUpload(e.target.files[0])}
                    ref={pdfInputRef}
                    className="fileInputAdmin"
                  />
                </div>
              </div>

              <div className="itemFormUpload">
                <label className="titleLabel" htmlFor="publisher">
                  Nhà xuất bản
                </label>
                <input
                  type="text"
                  id="publisher"
                  placeholder="Nhập tên nhà xuất bản"
                  className="inputItem"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                />
              </div>
              <div className="itemFormUpload">
                <label className="titleLabel" htmlFor="author">
                  Tên tác giả
                </label>
                <input
                  type="text"
                  id="author"
                  placeholder="Nhập tên tác giả"
                  className="inputItem"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="itemFormUpload">
                <label className="titleLabel" htmlFor="description">
                  Mô tả chi tiết<span className="requiredStar">*</span>
                </label>
                <textarea
                  id="description"
                  placeholder="Nhập mô tả chi tiết"
                  className="textareaItem"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="btnAcp">
            <Button
              type="submit"
              disabled={isLoading}
              className={`submit-btn ${isLoading ? "loading" : ""}`}
            >
              <span className="titleAcp">
                {isLoading ? "Đang cập nhật..." : "Xác nhận"}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDocuments;
