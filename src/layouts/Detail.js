import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

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
      } catch (error) {
        console.error("Failed to fetch document:", error);
      }
    };

    fetchDocument();
  }, [id]);

  if (!document) return <p>Loading...</p>;

  return (
    <div>
      <h1>{document.title}</h1>
      <img src={document.image} alt={document.title} />
      <p>Category: {document.category}</p>
      <p>Time: {document.time}</p>
      <p>Author: {document.author}</p>
      <p>Approved: {document.approved ? "Yes" : "No"}</p>
      <p>Views: {document.views}</p>
      <iframe
        src={document.pdfFiles}
        width="100%"
        height="600px"
        title="PDF Document"
      />
    </div>
  );
}

export default Detail;
