import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/Admin/NavBar/NavBar";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import avatar from "../../assets/itemDocument.png";

function AdminDetailDocument() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/admin/documents/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${authToken}`,
            },
          }
        );

        if (!response.ok) throw new Error("Không thể lấy tài liệu.");
        const data = await response.json();
        setDocument(data);
      } catch (error) {
        toast.error("Lỗi khi lấy tài liệu: " + error.message);
      }
    };

    const fetchUserInfo = async () => {
      if (!authToken) return;
      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          headers: {
            Authorization: `${authToken}`,
          },
        });
        if (!response.ok)
          throw new Error("Không thể lấy thông tin người dùng.");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        toast.error("Lỗi khi lấy thông tin người dùng: " + error.message);
      }
    };

    fetchDocument();
    fetchUserInfo();
  }, [id, authToken]);

  return (
    <div className="containerAdminDetailDocument">
      <div className="leftAdminDetailDocument">
        <NavBar />
      </div>
      <div className="rightAdminDetailDocument">
        <HeaderAdmin />
        <div className="scrollForm">
          <div className="containerFormDetailDocument">
            <div className="formDetail">
              {document && (
                <>
                  <div className="titleDetail">{document.title}</div>
                  <div className="imgContainerDetail">
                    <div className="left">
                      <img
                        src={document.image}
                        alt={document.title}
                        className="imgDetail"
                        onError={(e) => {
                          e.target.src = avatar;
                        }}
                      />
                    </div>
                    <div className="right">
                      <div className="itemListDetail">
                        <TbClipboardList className="iconDetail" />
                        Thể loại: {document.categoryName}
                      </div>
                      <div className="itemListDetail">
                        <WiTime5 className="iconDetail" />
                        Thời Gian: {document.relativeCreatedAt}
                      </div>
                      <div className="itemListDetail">
                        <LuUser2 className="iconDetail" />
                        {document.userName}
                      </div>
                      <div className="itemListAcpDetail">
                        <FiCheckCircle className="iconDetail" />
                        {document.status}
                      </div>
                      <div className="itemListDetail">
                        <FaEye className="iconDetail" />
                        Lượt xem: {document.view}
                      </div>
                    </div>
                  </div>
                  <div className="listPDF">
                    <iframe
                      src={document.pdfFiles}
                      width="100%"
                      height="1000px"
                      title="PDF Document"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetailDocument;
