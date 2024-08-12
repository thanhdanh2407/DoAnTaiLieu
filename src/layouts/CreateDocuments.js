import React, { useRef, useState } from "react";
import "./css/index.css";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

function CreateDocuments() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const [category, setCategory] = useState("");
  const [pdfFileNames, setPdfFileNames] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePdfUpload = (files) => {
    if (files) {
      const newFileNames = Array.from(files).map((file) => file.name);
      setPdfFileNames((prevFileNames) => [...prevFileNames, ...newFileNames]);
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
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const categoryOptions = ["Khoa học", "Văn học", "Lịch sử"];

  return (
    <div className="container">
      <div className="formCreateDocuments">
        <div className="titleCreateDocuments">Tạo mới tài liệu</div>
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
                <Button className="addPdfButton" onClick={handlePdfButtonClick}>
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
              />
            </div>
            <div className="itemFormUpload">
              <label className="titleLabel" htmlFor="author">
                Mô tả chi tiết<span className="requiredStar">*</span>
              </label>
              <textarea
                id="description"
                placeholder="Nhập mô tả chi tiết"
                className="textareaItem"
                rows="4"
              />
            </div>
          </div>
        </div>
        <div className="btnAcp">
          <Button type="submit">
            <span className="titleAcp">Xác nhận</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateDocuments;
