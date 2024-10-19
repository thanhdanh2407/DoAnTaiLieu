// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import NavBar from "../../components/Admin/NavBar/NavBar";
// import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";
// import { TbClipboardList } from "react-icons/tb";
// import { WiTime5 } from "react-icons/wi";
// import { LuUser2 } from "react-icons/lu";
// import { FiCheckCircle } from "react-icons/fi";
// import { FaEye } from "react-icons/fa";
// import avatarComment from "../../assets/iconAva.png";
// import { VscSend } from "react-icons/vsc";

// function AdminDetailDocument() {
//   const { id } = useParams();
//   const [document, setDocument] = useState(null);
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [authToken, setAuthToken] = useState(
//     localStorage.getItem("authToken") || ""
//   );
//   const [user, setUser] = useState(null);
//   const [replyCommentId, setReplyCommentId] = useState(null); // State để lưu ID của bình luận đang được trả lời
//   const [reply, setReply] = useState(""); // State để lưu nội dung trả lời
//   const [editingCommentId, setEditingCommentId] = useState(null); // ID của bình luận đang được chỉnh sửa
//   const [editedComment, setEditedComment] = useState(""); // Nội dung bình luận đang chỉnh sửa
//   const [editingReplyId, setEditingReplyId] = useState(null); // ID của phản hồi đang được chỉnh sửa
//   const [editedReply, setEditedReply] = useState(""); // Nội dung phản hồi đang chỉnh sửa
//   const [replyToReplyId, setReplyToReplyId] = useState(null);
//   const [replyToReply, setReplyToReply] = useState("");

//   useEffect(() => {
//     const fetchDocument = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/documents/${id}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         const sortedComments = data.comments.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setComments(sortedComments);
//         setDocument(data);
//       } catch (error) {
//         console.error("Failed to fetch document:", error);
//       }
//     };

//     const fetchUserInfo = async () => {
//       if (!authToken) return; // Kiểm tra nếu không có authToken
//       try {
//         const response = await fetch("http://localhost:8080/api/user/me", {
//           headers: {
//             Authorization: `${authToken}`, // Sử dụng authToken
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch user info");
//         }
//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error("Failed to fetch user info:", error);
//       }
//     };

//     fetchDocument();
//     fetchUserInfo();
//   }, [id, authToken]);

//   const handleCommentSubmit = async () => {
//     if (!comment.trim()) return; // Không gửi bình luận trống
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/comments/${id}/add`, // Sử dụng ID tài liệu
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//           body: comment,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to submit comment");
//       }

//       setComment("");
//       const newComment = await response.json();
//       setComments((prevComments) => [newComment, ...prevComments]);
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//     }
//   };

//   const handleReplySubmit = async (commentId) => {
//     if (!reply.trim()) return;

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/comments/${id}/replies/${commentId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//           body: reply,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to submit reply");
//       }

//       setReply(""); // Reset nội dung trả lời
//       setReplyCommentId(null); // Đóng textarea trả lời
//       const newReply = await response.json();
//       setComments((prevComments) =>
//         prevComments.map((comment) =>
//           comment.id === commentId
//             ? { ...comment, replies: [...(comment.replies || []), newReply] }
//             : comment
//         )
//       );
//     } catch (error) {
//       console.error("Error submitting reply:", error);
//     }
//   };

//   const handleReplyToReplySubmit = async (replyId, commentId) => {
//     if (!replyToReply.trim()) return;

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/comments/${id}/replies/${commentId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//           body: replyToReply, // Đảm bảo body là JSON
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to submit reply to reply");
//       }

//       setReplyToReply("");
//       setReplyToReplyId(null);
//       const newReplyToReply = await response.json();
//       setComments((prevComments) =>
//         prevComments.map((comment) =>
//           comment.id === commentId
//             ? {
//                 ...comment,
//                 replies: comment.replies.map((reply) =>
//                   reply.id === replyId
//                     ? {
//                         ...reply,
//                         replies: [...(reply.replies || []), newReplyToReply],
//                       }
//                     : reply
//                 ),
//               }
//             : comment
//         )
//       );
//     } catch (error) {
//       console.error("Error submitting reply to reply:", error);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/documents/comments/${commentId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `${authToken}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete comment");
//       }

//       // Xóa bình luận khỏi danh sách comments
//       setComments((prevComments) =>
//         prevComments.filter((comment) => comment.id !== commentId)
//       );
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };

//   const handleEditComment = async (commentId) => {
//     if (!editedComment.trim()) return; // Không gửi bình luận trống
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/documents/comments/${commentId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`, // Sử dụng authToken
//           },
//           body: JSON.stringify({ body: editedComment }), // Chỉ định nội dung bình luận mới
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to edit comment");
//       }

//       // Cập nhật danh sách bình luận sau khi chỉnh sửa thành công
//       setComments((prevComments) =>
//         prevComments.map((comment) =>
//           comment.id === commentId
//             ? { ...comment, content: editedComment } // Cập nhật nội dung bình luận
//             : comment
//         )
//       );

//       setEditedComment(""); // Reset nội dung chỉnh sửa
//       setEditingCommentId(null); // Đóng ô chỉnh sửa
//     } catch (error) {
//       console.error("Error editing comment:", error);
//     }
//   };

//   const handleEditReply = async (replyId, commentId) => {
//     if (!editedReply.trim()) return; // Không gửi phản hồi trống
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/documents/comments/replies/${replyId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: ` ${authToken}`, // Sử dụng authToken
//           },
//           body: JSON.stringify({ body: editedReply }), // Chỉ định nội dung phản hồi mới
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to edit reply");
//       }

//       // Cập nhật danh sách bình luận sau khi chỉnh sửa thành công
//       setComments((prevComments) =>
//         prevComments.map((comment) =>
//           comment.id === commentId
//             ? {
//                 ...comment,
//                 replies: comment.replies.map((reply) =>
//                   reply.id === replyId
//                     ? { ...reply, content: editedReply }
//                     : reply
//                 ), // Cập nhật nội dung phản hồi
//               }
//             : comment
//         )
//       );

//       setEditedReply(""); // Reset nội dung chỉnh sửa
//       setEditingReplyId(null); // Đóng ô chỉnh sửa
//     } catch (error) {
//       console.error("Error editing reply:", error);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault(); // Ngăn xuống dòng
//       if (replyCommentId) {
//         // Nếu có replyCommentId, nghĩa là đang trả lời bình luận
//         handleReplySubmit();
//       } else {
//         // Nếu không có, nghĩa là đang viết bình luận mới
//         handleCommentSubmit();
//       }
//     }
//   };

//   return (
//     <div className="containerAdminDetailDocument">
//       <div className="leftAdminDetailDocument">
//         <NavBar />
//       </div>
//       <div className="rightAdminDetailDocument">
//         <HeaderAdmin />
//         <div className="containerFormDetailDocument">
//           <div className="formDetail">
//             <div className="titleDetail">{document.title}</div>
//             <div className="imgContainerDetail">
//               <div className="left">
//                 <img
//                   src={document.image}
//                   alt={document.title}
//                   className="imgDetail"
//                 />
//               </div>
//               <div className="right">
//                 <div className="itemListDetail">
//                   <TbClipboardList className="iconDetail" />
//                   Thể loại: {document.categoryName}
//                 </div>
//                 <div className="itemListDetail">
//                   <WiTime5 className="iconDetail" />
//                   Thời Gian: {document.relativeUpdatedAt}
//                 </div>
//                 <div className="itemListDetail">
//                   <LuUser2 className="iconDetail" />
//                   Người Đăng: {document.author}
//                 </div>
//                 <div className="itemListAcpDetail">
//                   <FiCheckCircle className="iconDetail" />
//                   {document.approved ? "Chưa được duyệt" : " Đã duyệt"}
//                 </div>
//                 <div className="itemListDetail">
//                   <FaEye className="iconDetail" />
//                   Lượt xem: {document.view}
//                 </div>
//               </div>
//             </div>
//             <div className="listPDF">
//               <iframe
//                 src={document.pdfFiles}
//                 width="100%"
//                 height="1000px"
//                 title="PDF Document"
//               />
//             </div>

//             <div className="containerComment">
//               <div className="titleComment">Bình luận</div>
//               <div className="listComment">
//                 {comments.length > 0 ? (
//                   comments.map((comment) => (
//                     <div key={comment.id} className="itemComment">
//                       <div className="avatarComment">
//                         <img
//                           src={user?.avatar || avatarComment}
//                           alt="avatar"
//                           className="imgAva"
//                         />
//                       </div>
//                       <div className="containerCommentBody">
//                         <div className="commentRep">
//                           <div className="userComment">{comment.userName}</div>
//                           {editingCommentId === comment.id ? (
//                             <div className="bodyComment">
//                               <textarea
//                                 value={editedComment}
//                                 onChange={(e) =>
//                                   setEditedComment(e.target.value)
//                                 }
//                                 className="inputComment"
//                                 onKeyDown={handleKeyPress}
//                               />
//                               <div
//                                 className="btnSend"
//                                 onClick={() => handleEditComment(comment.id)}
//                               >
//                                 <VscSend className="iconSend" />
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="bodyComment">{comment.content}</div>
//                           )}
//                         </div>
//                         <div className="repComment">
//                           <span
//                             className="itemRep"
//                             onClick={() => setReplyCommentId(comment.id)}
//                           >
//                             Trả lời
//                           </span>
//                           <span
//                             className="itemFix"
//                             onClick={() => {
//                               setEditingCommentId(comment.id);
//                               setEditedComment(comment.content);
//                             }}
//                           >
//                             Chỉnh sửa
//                           </span>
//                           <span
//                             className="itemDel"
//                             onClick={() => handleDeleteComment(comment.id)}
//                           >
//                             Xoá
//                           </span>
//                         </div>

//                         {replyCommentId === comment.id && (
//                           <div className="replyBox">
//                             <textarea
//                               className="inputComment"
//                               value={reply}
//                               onChange={(e) => setReply(e.target.value)}
//                               placeholder="Nhập bình luận của bạn..."
//                               onKeyDown={handleKeyPress}
//                             />
//                             <div
//                               className="btnSend"
//                               onClick={() => handleReplySubmit(comment.id)}
//                             >
//                               <VscSend className="iconSend" />
//                             </div>
//                           </div>
//                         )}

//                         {comment.replies && comment.replies.length > 0 && (
//                           <div className="replies">
//                             <div className="titleRepComment">
//                               Trả lời bình luận
//                             </div>
//                             {comment.replies.map((reply) => (
//                               <div key={reply.id} className="itemReply">
//                                 <div className="avatarComment">
//                                   <img
//                                     src={user.avatar}
//                                     alt={user.fullname}
//                                     className="imgAva"
//                                   />
//                                 </div>
//                                 <div className="containerRepComment">
//                                   <div className="userReply">
//                                     {reply.userName}
//                                   </div>
//                                   <div className="bodyReply">
//                                     {editingReplyId === reply.id ? (
//                                       <div>
//                                         <textarea
//                                           value={editedReply}
//                                           onChange={(e) =>
//                                             setEditedReply(e.target.value)
//                                           }
//                                           className="inputReply"
//                                           onKeyDown={handleKeyPress}
//                                         />
//                                         <div
//                                           className="btnSend"
//                                           onClick={() =>
//                                             handleEditReply(
//                                               reply.id,
//                                               comment.id
//                                             )
//                                           }
//                                         >
//                                           <VscSend className="iconSend" />
//                                         </div>
//                                       </div>
//                                     ) : (
//                                       <div className="repCommentReq">
//                                         {reply.content}
//                                       </div>
//                                     )}
//                                   </div>
//                                   <span
//                                     className="itemFixRep"
//                                     onClick={() => setReplyToReplyId(reply.id)}
//                                   >
//                                     Trả lời
//                                   </span>
//                                   {replyToReplyId === reply.id && (
//                                     <div className="replyToReplySection">
//                                       <textarea
//                                         value={replyToReply}
//                                         onKeyDown={handleKeyPress}
//                                         onChange={(e) =>
//                                           setReplyToReply(e.target.value)
//                                         }
//                                         className="inputComment"
//                                         placeholder="Nhập trả lời của bạn..."
//                                       />
//                                       <div
//                                         className="btnSend"
//                                         onClick={() =>
//                                           handleReplyToReplySubmit(
//                                             reply.id,
//                                             comment.id
//                                           )
//                                         }
//                                       >
//                                         <VscSend className="iconSend" />
//                                       </div>
//                                     </div>
//                                   )}
//                                   {reply.replies &&
//                                     reply.replies.length > 0 && (
//                                       <div className="repliesToRepliesList">
//                                         {reply.replies.map((replyToReply) => (
//                                           <div
//                                             key={replyToReply.id}
//                                             className="itemReplyToReply"
//                                           >
//                                             <div className="avatarComment">
//                                               <img
//                                                 src={
//                                                   user?.avatar || avatarComment
//                                                 }
//                                                 alt="avatar"
//                                                 className="imgAva"
//                                               />
//                                             </div>
//                                             <div className="containerCommentBody">
//                                               <div className="userComment">
//                                                 {replyToReply.userName}
//                                               </div>
//                                               <div className="bodyCommentRepToRep">
//                                                 {replyToReply.content}
//                                               </div>
//                                             </div>
//                                           </div>
//                                         ))}
//                                       </div>
//                                     )}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="titleNotice">Chưa có bình luận nào</p>
//                 )}
//               </div>
//               <div className="itemComment">
//                 <div className="avatarComment">
//                   <img
//                     src={user?.avatar || avatarComment}
//                     alt="avatar"
//                     className="imgAva"
//                   />
//                 </div>
//                 <div className="comment">
//                   <div className="userComment">
//                     {user ? user.fullname : "Người dùng"}
//                   </div>
//                   <div className="bodyComment">
//                     <textarea
//                       className="inputComment"
//                       type="text"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                       onKeyDown={handleKeyPress}
//                     />
//                     <div className="btnSend" onClick={handleCommentSubmit}>
//                       <VscSend className="iconSend" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDetailDocument;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/Admin/NavBar/NavBar";
import HeaderAdmin from "../../components/Admin/HeaderAdmin/HeaderAdmin";
import { TbClipboardList } from "react-icons/tb";
import { WiTime5 } from "react-icons/wi";
import { LuUser2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import avatarComment from "../../assets/iconAva.png";
import { VscSend } from "react-icons/vsc";

function AdminDetailDocument() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [user, setUser] = useState(null);
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [reply, setReply] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editedReply, setEditedReply] = useState("");
  const [replyToReplyId, setReplyToReplyId] = useState(null);
  const [replyToReply, setReplyToReply] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/documents/${id}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        const sortedComments = data.comments.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComments(sortedComments);
        setDocument(data);
      } catch (error) {
        console.error("Failed to fetch document:", error);
      }
    };

    const fetchUserInfo = async () => {
      if (!authToken) return;
      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user info");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchDocument();
    fetchUserInfo();
  }, [id, authToken]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/comments/${id}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ content: comment }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit comment");
      const newComment = await response.json();
      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (!reply.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/comments/${id}/replies/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ content: reply }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit reply");
      const newReply = await response.json();
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), newReply] }
            : comment
        )
      );
      setReply("");
      setReplyCommentId(null);
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
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete comment");
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editedComment.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/documents/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ body: editedComment }),
        }
      );

      if (!response.ok) throw new Error("Failed to edit comment");
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedComment }
            : comment
        )
      );
      setEditedComment("");
      setEditingCommentId(null);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleEditReply = async (replyId, commentId) => {
    if (!editedReply.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/documents/comments/replies/${replyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ body: editedReply }),
        }
      );

      if (!response.ok) throw new Error("Failed to edit reply");
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === replyId
                    ? { ...reply, content: editedReply }
                    : reply
                ),
              }
            : comment
        )
      );
      setEditedReply("");
      setEditingReplyId(null);
    } catch (error) {
      console.error("Error editing reply:", error);
    }
  };

  const handleReplyToReplySubmit = async (replyId, commentId) => {
    if (!replyToReply.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/documents/comments/replies/${replyId}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ content: replyToReply }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit reply to reply");
      const newReplyToReply = await response.json();
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newReplyToReply],
              }
            : comment
        )
      );
      setReplyToReply("");
      setReplyToReplyId(null);
    } catch (error) {
      console.error("Error submitting reply to reply:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (replyCommentId) {
        handleReplySubmit(replyCommentId);
      } else {
        handleCommentSubmit();
      }
    }
  };

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
                  {/* <div className="textDetail">{document.description}</div> */}
                </>
              )}
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
                                onChange={(e) =>
                                  setEditedComment(e.target.value)
                                }
                                className="inputComment"
                                onKeyDown={handleKeyPress}
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
                              className="inputComment"
                              value={reply}
                              onChange={(e) => setReply(e.target.value)}
                              placeholder="Nhập bình luận của bạn..."
                              onKeyDown={handleKeyPress}
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
                            <div className="titleRepComment">
                              Trả lời bình luận
                            </div>
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="itemReply">
                                <div className="avatarComment">
                                  <img
                                    src={user.avatar}
                                    alt={user.fullname}
                                    className="imgAva"
                                  />
                                </div>
                                <div className="containerRepComment">
                                  <div className="userReply">
                                    {reply.userName}
                                  </div>
                                  <div className="bodyReply">
                                    {editingReplyId === reply.id ? (
                                      <div>
                                        <textarea
                                          value={editedReply}
                                          onChange={(e) =>
                                            setEditedReply(e.target.value)
                                          }
                                          className="inputReply"
                                          onKeyDown={handleKeyPress}
                                        />
                                        <div
                                          className="btnSend"
                                          onClick={() =>
                                            handleEditReply(
                                              reply.id,
                                              comment.id
                                            )
                                          }
                                        >
                                          <VscSend className="iconSend" />
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="repCommentReq">
                                        {reply.content}
                                      </div>
                                    )}
                                  </div>
                                  <span
                                    className="itemFixRep"
                                    onClick={() => setReplyToReplyId(reply.id)}
                                  >
                                    Trả lời
                                  </span>
                                  {replyToReplyId === reply.id && (
                                    <div className="replyToReplySection">
                                      <textarea
                                        value={replyToReply}
                                        onKeyDown={handleKeyPress}
                                        onChange={(e) =>
                                          setReplyToReply(e.target.value)
                                        }
                                        className="inputComment"
                                        placeholder="Nhập trả lời của bạn..."
                                      />
                                      <div
                                        className="btnSend"
                                        onClick={() =>
                                          handleReplyToReplySubmit(
                                            reply.id,
                                            comment.id
                                          )
                                        }
                                      >
                                        <VscSend className="iconSend" />
                                      </div>
                                    </div>
                                  )}
                                  {reply.replies &&
                                    reply.replies.length > 0 && (
                                      <div className="repliesToRepliesList">
                                        {reply.replies.map((replyToReply) => (
                                          <div
                                            key={replyToReply.id}
                                            className="itemReplyToReply"
                                          >
                                            <div className="avatarComment">
                                              <img
                                                src={
                                                  user?.avatar || avatarComment
                                                }
                                                alt="avatar"
                                                className="imgAva"
                                              />
                                            </div>
                                            <div className="containerCommentBody">
                                              <div className="userComment">
                                                {replyToReply.userName}
                                              </div>
                                              <div className="bodyCommentRepToRep">
                                                {replyToReply.content}
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                </div>
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
                      onKeyDown={handleKeyPress}
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
      </div>
    </div>
  );
}

export default AdminDetailDocument;
