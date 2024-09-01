import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";

function Detail() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

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

      {/* Render PDF */}
      <div>
        <Document
          file={document.pdfUrl} // URL của file PDF
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
