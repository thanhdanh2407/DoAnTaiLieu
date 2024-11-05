import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
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
  const [pdfFiles, setPdfFiles] = useState([]);
  const [pdfFileNames, setPdfFileNames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null); // Store selected category ID
  const [existingPdfs, setExistingPdfs] = useState([]);
  const [error, setError] = useState(null);
  const pdfInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

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

          // Set selected category ID
          setCategoryId(data.categoryId); // Assuming your backend returns categoryId

          if (data.pdfFiles) {
            setExistingPdfs(data.pdfFiles);
          }
        } catch (err) {
          setError("Failed to fetch document details");
        }
      };
      fetchDocumentDetails();
    }
  }, [documentId]);

  const handlePdfUpload = (files) => {
    const fileArray = Array.from(files);
    setPdfFiles((prevFiles) => [...prevFiles, ...fileArray]);
    setPdfFileNames(fileArray.map((file) => file.name));
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

  const handleRemovePdf = (fileName) => {
    setPdfFileNames((prevFileNames) =>
      prevFileNames.filter((name) => name !== fileName)
    );
    setPdfFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      toast.error("Vui lòng chọn thể loại.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("author", author);
      formData.append("publisher", publisher);
      formData.append("publishingYear", publishingYear);
      formData.append("categoryId", categoryId); // Append the selected category ID
      if (image) formData.append("image", image);
      pdfFiles.forEach((file) => formData.append("pdfFiles", file));

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

      toast.success("Chỉnh sửa tài liệu thành công!");
      setTimeout(() => {
        navigate("/user");
      }, 1000);
    } catch (err) {
      setError(`Failed to update document: ${err.message}`);
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
                    required
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
                  required
                />
              </div>
              <div className="itemFormUpload">
                <label className="titleLabel" htmlFor="categoryId">
                  Hãy Chọn Thể loại<span className="requiredStar">*</span>
                </label>
                <select
                  id="categoryId"
                  className="inputItem"
                  value={categoryId || ""}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="">Chọn thể loại</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="itemFormUpload">
                <label className="titleLabel" htmlFor="pdfInput">
                  Tải tệp PDF mới<span className="requiredStar">*</span>
                </label>
                <div className="pdfUploadContainer">
                  <div className="pdfFileList">
                    {pdfFileNames.length === 0 ? (
                      <div className="noFilesText">Hãy chọn file</div>
                    ) : (
                      pdfFileNames.map((fileName, index) => (
                        <div key={index} className="pdfFileItem">
                          <span>{fileName}</span>
                          <button
                            className="removeButton"
                            onClick={() => handleRemovePdf(fileName)}
                          >
                            Xóa
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handlePdfUpload(e.target.files)}
                    ref={pdfInputRef}
                    multiple
                    className="fileInputUpdate"
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
              {/* <ToastContainer /> */}
            </div>
          </div>
          <div className="btnAcp">
            <Button type="submit">
              <span className="titleAcp">Xác nhận</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDocuments;
