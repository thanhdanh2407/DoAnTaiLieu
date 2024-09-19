import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateDocument = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const pdfInputRef = useRef(null);

  const [pdfFileNames, setPdfFileNames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/admin/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch categories");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handlePdfUpload = (files) => {
    const fileArray = Array.from(files);
    setPdfFiles(fileArray);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategories.length) {
      toast.error("Vui lòng chọn thể loại.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("author", author);
    formData.append("publisher", publisher);
    formData.append("publishingYear", publishingYear);
    if (image) formData.append("image", image);
    pdfFiles.forEach((file) => formData.append("pdfFiles", file));
    selectedCategories.forEach((id) => formData.append("categoryIds", id));

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:8080/api/documents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create document: ${response.statusText} - ${errorText}`
        );
      }

      const result = await response.json();
      toast.success("Tạo tài liệu thành công!");
      console.log(result);
      setTimeout(() => {
        navigate("/user");
      }, 1000);
    } catch (err) {
      setError(`Failed to create document: ${err.message}`);
      console.error(err);
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

  return (
    <div className="container">
      <div className="formCreateDocuments">
        <div className="titleCreateDocuments">Tạo mới tài liệu</div>
        <form onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formColum">
              <div className="itemFormCreate">
                <div className="titleCoverImage">
                  Ảnh bìa tài liệu<span className="requiredStar">*</span>
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
                  {/* {imagePreview && (
                    <div className="uploadText">
                      <img
                        src={imagePreview}
                        alt="Selected preview"
                        style={{
                          width: "340px",
                          height: "auto",
                        }}
                      />
                    </div>
                  )} */}
                  {!image && <div className="uploadText">Tải ảnh lên</div>}
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
                <label className="titleLabel" htmlFor="categories">
                  Thể loại<span className="requiredStar">*</span>
                </label>
                <select
                  id="categories"
                  className="inputItem"
                  value={selectedCategories}
                  onChange={(e) =>
                    setSelectedCategories(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  // multiple
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
                  Tải tệp PDF<span className="requiredStar">*</span>
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
                    id="pdfInput"
                    accept=".pdf"
                    onChange={(e) => handlePdfUpload(e.target.files)}
                    ref={pdfInputRef}
                    style={{ display: "none" }}
                    multiple
                  />
                  <button
                    type="button"
                    onClick={() => pdfInputRef.current.click()}
                    className="uploadButton"
                  >
                    Chọn tệp PDF
                  </button>
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
                  required
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
                  required
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
            <Button type="submit">
              <span className="titleAcp">Xác nhận</span>
            </Button>
          </div>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          closeOnClick
          className="custom-toast-container"
          progressClassName="custom-progress"
        />
      </div>
    </div>
  );
};

export default CreateDocument;
