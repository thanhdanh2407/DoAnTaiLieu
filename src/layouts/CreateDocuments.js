import React, { useRef, useState, useEffect } from "react";
import "./css/index.css";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

function CreateDocuments() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the file object
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const [category, setCategory] = useState("");
  const [pdfFileNames, setPdfFileNames] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]); // Store file objects
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

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
        // Assuming data is an array of objects with 'name' property
        const categoryNames = data.map((category) => category.name);
        setCategoryOptions(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file); // Save the file object
    }
  };

  const handlePdfUpload = (files) => {
    if (files) {
      const newFiles = Array.from(files);
      const newFileNames = newFiles.map((file) => file.name);
      setPdfFileNames((prevFileNames) => [...prevFileNames, ...newFileNames]);
      setPdfFiles((prevFiles) => [...prevFiles, ...newFiles]); // Save the file objects
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePdfButtonClick = () => {
    pdfInputRef.current.click();
  };

  const handleRemovePdf = (fileName) => {
    setPdfFileNames((prevFileNames) =>
      prevFileNames.filter((name) => name !== fileName)
    );
    setPdfFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    ); // Remove the file object
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    }

    pdfFiles.forEach((file) => {
      formData.append("pdfFiles", file);
    });

    formData.append("title", documentName);
    formData.append("description", description);
    formData.append("userId", "11"); // Example userId, adjust as needed
    formData.append("author", author);
    formData.append("publisher", publisher);
    formData.append("publishingYear", publicationYear);
    formData.append("categoryName", category);

    try {
      const response = await fetch("http://localhost:8080/api/documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json(); // Read error response
        throw new Error(
          `Failed to create document: ${
            errorData.message || response.statusText
          }`
        );
      }

      // Handle successful creation
      console.log("Document created successfully");
      // You might want to reset form state here or redirect the user
    } catch (error) {
      console.error("Error creating document:", error);
    }
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
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="fileInput"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                  {!image && <div className="uploadText">Tải lên</div>}
                </div>
              </div>
              <div className="btnSend">
                <Button className="buttonSend" onClick={handleButtonClick}>
                  <span className="titleSubmit">Tải ảnh lên</span>
                </Button>
              </div>
            </div>
            <div className="formColum">
              <div className="itemFormCreate">
                <div className="titleFileName">
                  Tên tài liệu<span className="requiredStar">*</span>
                  <input
                    type="text"
                    id="documentName"
                    placeholder="Nhập tên tài liệu"
                    className="inputItem"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                  />
                </div>
                <div className="itemFormUpload">
                  <label className="titleLabel" htmlFor="publicationYear">
                    Năm xuất bản<span className="requiredStar">*</span>
                  </label>
                  <input
                    type="text"
                    id="publicationYear"
                    placeholder="Nhập năm xuất bản"
                    className="inputItem"
                    value={publicationYear}
                    onChange={(e) => setPublicationYear(e.target.value)}
                  />
                </div>
                <div className="itemFormUpload">
                  <Dropdown
                    label="Thể loại"
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                    value={category}
                  />
                </div>
                <div className="itemFormUpload">
                  <label className="titleLabel" htmlFor="pdfUpload">
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
                  </div>
                  <Button
                    className="addPdfButton"
                    onClick={handlePdfButtonClick}
                  >
                    Thêm tệp PDF
                  </Button>
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
            <Button type="submit">
              <span className="titleAcp">Xác nhận</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDocuments;
