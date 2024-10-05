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
  const [replyCommentId, setReplyCommentId] = useState(null); // State để lưu ID của bình luận đang được trả lời
  const [reply, setReply] = useState(""); // State để lưu nội dung trả lời

  const [editingCommentId, setEditingCommentId] = useState(null); // ID của bình luận đang được chỉnh sửa
  const [editedComment, setEditedComment] = useState(""); // Nội dung bình luận đang chỉnh sửa

  const [editingReplyId, setEditingReplyId] = useState(null); // ID của phản hồi đang được chỉnh sửa
  const [editedReply, setEditedReply] = useState(""); // Nội dung phản hồi đang chỉnh sửa

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

  const handleReplySubmit = async (commentId) => {
    if (!reply.trim()) return; // Không gửi trả lời trống

    try {
      const response = await fetch(
        `http://localhost:8080/api/documents/${id}/comments/${commentId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ body: reply }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit reply");
      }

      setReply(""); // Reset nội dung trả lời
      setReplyCommentId(null); // Đóng textarea trả lời
      const newReply = await response.json();

      // Cập nhật lại danh sách bình luận sau khi trả lời thành công
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newReply], // Thêm phản hồi mới vào mảng replies
              }
            : comment
        )
      );
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/documents/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${authToken}`, // Sử dụng authToken để xác thực
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      // Xóa bình luận khỏi danh sách comments
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editedComment.trim()) return; // Không gửi bình luận trống
    try {
      const response = await fetch(
        `http://localhost:8080/api/documents/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Sử dụng authToken
          },
          body: JSON.stringify({ body: editedComment }), // Chỉ định nội dung bình luận mới
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit comment");
      }

      // Cập nhật danh sách bình luận sau khi chỉnh sửa thành công
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedComment } // Cập nhật nội dung bình luận
            : comment
        )
      );

      setEditedComment(""); // Reset nội dung chỉnh sửa
      setEditingCommentId(null); // Đóng ô chỉnh sửa
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleEditReply = async (replyId, commentId) => {
    if (!editedReply.trim()) return; // Không gửi phản hồi trống
    try {
      const response = await fetch(
        `http://localhost:8080/api/documents/comments/replies/${replyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${authToken}`, // Sử dụng authToken
          },
          body: JSON.stringify({ body: editedReply }), // Chỉ định nội dung phản hồi mới
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit reply");
      }

      // Cập nhật danh sách bình luận sau khi chỉnh sửa thành công
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === replyId
                    ? { ...reply, content: editedReply }
                    : reply
                ), // Cập nhật nội dung phản hồi
              }
            : comment
        )
      );

      setEditedReply(""); // Reset nội dung chỉnh sửa
      setEditingReplyId(null); // Đóng ô chỉnh sửa
    } catch (error) {
      console.error("Error editing reply:", error);
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
          <div className="listComment">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="itemComment">
                  <div className="avatarComment">
                    <img
                      src={user?.avatar || avatarComment}
                      alt="avatar"
                      className="imgAva"
                    />
                  </div>
                  <div className="containerCommentBody">
                    <div className="commentRep">
                      <div className="userComment">{comment.userName}</div>
                      {editingCommentId === comment.id ? (
                        <div className="bodyComment">
                          <textarea
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            className="inputComment"
                          />
                          <div
                            className="btnSend"
                            onClick={() => handleEditComment(comment.id)}
                          >
                            <VscSend className="iconSend" />
                          </div>
                        </div>
                      ) : (
                        <div className="bodyComment">{comment.content}</div>
                      )}
                    </div>
                    <div className="repComment">
                      <span
                        className="itemRep"
                        onClick={() => setReplyCommentId(comment.id)}
                      >
                        Trả lời
                      </span>
                      <span
                        className="itemFix"
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditedComment(comment.content);
                        }}
                      >
                        Chỉnh sửa
                      </span>
                      <span
                        className="itemDel"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Xoá
                      </span>
                    </div>

                    {replyCommentId === comment.id && (
                      <div className="replyBox">
                        <textarea
                          className="inputReply"
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                        />
                        <div
                          className="btnSend"
                          onClick={() => handleReplySubmit(comment.id)}
                        >
                          <VscSend className="iconSend" />
                        </div>
                      </div>
                    )}

                    {comment.replies && comment.replies.length > 0 && (
                      <div className="replies">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="itemReply">
                            <div className="userReply">{reply.userName}</div>
                            <div className="bodyReply">
                              {editingReplyId === reply.id ? (
                                <div>
                                  <textarea
                                    value={editedReply}
                                    onChange={(e) =>
                                      setEditedReply(e.target.value)
                                    }
                                    className="inputReply"
                                  />
                                  <div
                                    className="btnSend"
                                    onClick={() =>
                                      handleEditReply(reply.id, comment.id)
                                    }
                                  >
                                    <VscSend className="iconSend" />
                                  </div>
                                </div>
                              ) : (
                                <div>{reply.content}</div>
                              )}
                            </div>
                            <span
                              className="itemFix"
                              onClick={() => {
                                setEditingReplyId(reply.id);
                                setEditedReply(reply.content);
                              }}
                            >
                              Chỉnh sửa
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
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
