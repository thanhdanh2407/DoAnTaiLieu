import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/index.css";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import avatarComment from "../assets/iconAva.png";
import { VscSend } from "react-icons/vsc";

function Detail() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/documents/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDocument(data);
        setComments(data.comments); // Lưu comments vào state
      } catch (error) {
        console.error("Failed to fetch document:", error);
      }
    };

    const fetchUserInfo = async () => {
      if (!authToken) return; // Kiểm tra nếu không có authToken
      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          headers: {
            Authorization: `${authToken}`, // Sử dụng authToken
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchDocument();
    fetchUserInfo();
  }, [id, authToken]); // Thêm authToken vào dependency array

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return; // Không gửi bình luận trống
    try {
      const response = await fetch(
        `http://localhost:8080/api/documents/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Sử dụng authToken
          },
          body: JSON.stringify({ body: comment }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      setComment(""); // Reset bình luận
      // Cập nhật lại danh sách bình luận sau khi gửi bình luận thành công
      const newComment = await response.json();
      setComments([...comments, newComment]);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!document) return <p>Loading...</p>;

  return (
    <div className="containerDetail">
      <div className="formDetail">
        <div className="titleDetail">{document.title}</div>
        <div className="imgContainerDetail">
          <div className="left">
            <img
              src={document.image}
              alt={document.title}
              className="imgDetail"
            />
          </div>
          <div className="right">
            <div className="itemListDetail">
              <TbClipboardList className="iconDetail" />
              Thể loại: {document.categoryName}
            </div>
            <div className="itemListDetail">
              <WiTime5 className="iconDetail" />
              Thời Gian: {document.relativeUpdatedAt}
            </div>
            <div className="itemListDetail">
              <LuUser2 className="iconDetail" />
              Người Đăng: {document.author}
            </div>
            <div className="itemListAcpDetail">
              <FiCheckCircle className="iconDetail" />
              {document.approved ? "Chưa được duyệt" : " Đã duyệt"}
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

        <div className="containerComment">
          <div className="titleComment">Bình luận</div>
          {/* Hiển thị danh sách bình luận */}
          <div className="listComment">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="itemComment">
                  <div className="avatarComment">
                    <img src={user.avatar} alt="avatar" className="imgAva" />
                  </div>
                  <div className="containerCommentBody">
                    <div className="commentRep">
                      <div className="userComment">{comment.userName}</div>
                      <div className="bodyComment">{comment.content}</div>
                    </div>
                    <div className="repComment">
                      <span className="itemRep">Trả lời</span>
                      <span className="itemFix">Chỉnh sửa</span>
                      <span className="itemDel">Xoá</span>
                    </div>
                    <div className="listRepComment">
                      <div className="avatarCommentRep">
                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="imgAva"
                        />
                      </div>
                      <div className="listCommentInfo">
                        <div className="commentRep">
                          <div className="userComment">{comment.userName}</div>
                          <div className="bodyComment">{comment.content}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="titleNotice">Chưa có bình luận nào</p>
            )}
          </div>

          <div className="itemComment">
            <div className="avatarComment">
              <img
                src={user?.avatar || avatarComment}
                alt="avatar"
                className="imgAva"
              />
            </div>
            <div className="comment">
              <div className="userComment">
                {user ? user.fullname : "Người dùng"}
              </div>
              <div className="bodyComment">
                <textarea
                  className="inputComment"
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="btnSend" onClick={handleCommentSubmit}>
                  <VscSend className="iconSend" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
