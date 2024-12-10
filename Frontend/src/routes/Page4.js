import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faTrashAlt,
  faArrowLeft,
  faFilePdf,
  faFileWord,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";


const DocumentsPage = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({

    document_type: "deed",
    file: null,
  });
  const [isFetchingProperties, setIsFetchingProperties] = useState(false);
  const [isFetchingDocuments, setIsFetchingDocuments] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingDocs, setDeletingDocs] = useState([]);
  const [downloadingDocs, setDownloadingDocs] = useState([]);
  const [error, setError] = useState("");


  const propertiesAPI = 'https://homekey-backend.vercel.app/api/listProperties';
  const documentsAPI =
    'https://django-project-tn9e.onrender.com/api/documents/';

  // Determine user role from Cookies (or another source)
  const userRole = Cookies.get("userRole"); // Assume "buyer" or "seller" is stored here

  // Fetch Properties on Component Mount
  useEffect(() => {
    const fetchProperties = async () => {

 
      try {
        setIsFetchingProperties(true);
        const response = await fetch(propertiesAPI);
        if (!response.ok) throw new Error('Failed to fetch properties.');

        const data = await response.json();

        // If user is a seller, filter properties by seller_id
        if (userRole === "seller") {
          const sellerId = Cookies.get("authToken");
          if (!sellerId) {
            alert("You are not logged in!");
            window.location.href = "/login";
            return;
          }
          const userProperties = (data.data || []).filter(
            (property) => property.seller_id === sellerId
          );
          setProperties(userProperties);
        } else {
          // For buyers, list all properties and hardcode the status
          const allProperties = (data.data || []).map((property) => ({
            ...property,
            type: property.property_type || "Unknown",
            status: "Available for Sell", // Hardcode status for buyers
          }));
          setProperties(allProperties);
        }
      } catch (error) {

        console.error("Error fetching properties:", error.message);
        setError("Failed to fetch properties. Please try again later.");
      } finally {
        setIsFetchingProperties(false);

      }
    };

    fetchProperties();

  }, [userRole]);
  // Handle Document Upload

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedProperty || !selectedProperty.xata_id) {
      setError('No valid property selected. Please select a valid property.');
      return;
    }


    const propertyId = selectedProperty.xata_id;

    if (!newDocument.file) {
      setError("Please provide a file to upload.");
      return;
    }

    const allowedTypes = ["application/pdf", "application/msword", "text/plain"];

    if (!allowedTypes.includes(newDocument.file.type)) {
      setError('Only PDF, Word, or Text documents are allowed.');
      return;
    }


    setError(""); // Clear previous errors

    const formData = new FormData();
    formData.append("property", selectedProperty.xata_id);
    formData.append("title", newDocument.file.name); // Set title to file name
    formData.append("document_type", newDocument.document_type);
    formData.append("file", newDocument.file);

    

    try {
      setIsUploading(true);
      const response = await fetch(documentsAPI, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);
        throw new Error(errorResponse.message || 'Failed to upload document.');
      }

      const data = await response.json();
      setDocuments((prev) => [...prev, data]);

      setNewDocument({ document_type: "deed", file: null });
      alert("Document uploaded successfully.");

    } catch (error) {
      console.error('Error uploading document:', error.message);
      setError('Failed to upload document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Document Deletion
  const handleDelete = async (docId) => {
    try {
      setDeletingDocs((prev) => [...prev, docId]);
      const response = await fetch(`${documentsAPI}${docId}/`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete document.');

      setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
      alert('Document deleted successfully.');
    } catch (error) {

      console.error("Error deleting document:", error.message);
      setError("Failed to delete document. Please try again.");
    } finally {
      setDeletingDocs((prev) => prev.filter((id) => id !== docId));

    }
  };

  // Handle Document Download
  const handleDownload = async (docId, url, originalFileName) => {
    try {
      setDownloadingDocs((prev) => [...prev, docId]);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to download file.');

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = originalFileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {

      console.error("Error downloading file:", error.message);
      setError("Failed to download file. Please try again.");
    } finally {
      setDownloadingDocs((prev) => prev.filter((id) => id !== docId));
    }
  };


  // Fetch Documents for a Selected Property
  const fetchDocuments = async (xataId) => {
    try {
      setIsFetchingDocuments(true);
      const response = await fetch(`${documentsAPI}?property=${xataId}`);
      if (!response.ok) throw new Error("Failed to fetch documents.");

      const data = await response.json();
      setDocuments(data || []);
    } catch (error) {
      console.error("Error fetching documents:", error.message);
      setError("Failed to fetch documents. Please try again later.");
    } finally {
      setIsFetchingDocuments(false);

      
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 p-6">
      <Sidebar />
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Manage Documents
      </h1>

      {/* Global Loading Spinner for Fetching Properties */}
      {isFetchingProperties && (
        <div className="flex justify-center items-center mb-4">
          <FontAwesomeIcon icon={faSpinner} spin className="text-indigo-600 text-3xl" />
          <span className="ml-2 text-indigo-600">Loading properties...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Properties Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-500 uppercase bg-gray-100">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Address</th>
              <th className="p-4">Price</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr
                key={property.xata_id}
                className="bg-white hover:bg-gray-100 transition border-b"
              >
                <td className="p-4">
                  <img
                    src={property.image_url || 'https://via.placeholder.com/64'}
                    alt={property.address}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>
                <td className="p-4 font-medium text-gray-800">
                  {property.address}
                </td>
                <td className="p-4 text-gray-600">{property.price}</td>
                <td className="p-4 text-gray-600">{property.type}</td>
                <td
                  className={`p-4 font-semibold ${

                    property.status === "Available for Sell"
                      ? "text-green-600"
                      : "text-red-600"

                  }`}
                >
                  {property.status}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedProperty(property);
                      fetchDocuments(property.xata_id);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md flex items-center justify-center"
                    disabled={isFetchingDocuments}
                  >
                    {isFetchingDocuments && selectedProperty?.xata_id === property.xata_id ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                        Loading...
                      </>
                    ) : (
                      "View Documents"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedProperty && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg relative overflow-auto max-h-screen">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Close
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedProperty.address}
            </h2>

            {/* Documents List */}

            <h3 className="mt-6 text-lg font-semibold text-gray-700">Uploaded Documents</h3>
            {isFetchingDocuments ? (
              <div className="flex justify-center items-center mt-4">
                <FontAwesomeIcon icon={faSpinner} spin className="text-indigo-600 text-2xl" />
                <span className="ml-2 text-indigo-600">Loading documents...</span>
              </div>
            ) : (
              <ul className="space-y-3 mt-4">
                {documents.length > 0 ? (
                  documents
                    .filter(
                      (doc) =>
                        doc.property === selectedProperty.xata_id &&
                        ["application/pdf", "application/msword", "text/plain"].includes(
                          doc.mime_type
                        )
                    )
                    .map((doc) => {
                      const fileName = doc.download_url.split("/").pop();
                      const isDeleting = deletingDocs.includes(doc.id);
                      const isDownloading = downloadingDocs.includes(doc.id);
                      return (
                        <li
                          key={doc.id}
                          className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <FontAwesomeIcon
                              icon={
                                doc.mime_type === "application/pdf"
                                  ? faFilePdf
                                  : faFileWord
                              }
                              className={`text-2xl ${
                                doc.mime_type === "application/pdf"
                                  ? "text-red-600"
                                  : "text-blue-600"
                              }`}
                            />
                            <span className="text-gray-700 font-medium">
                              {doc.title || fileName}
                            </span>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() =>
                                handleDownload(doc.id, doc.download_url, fileName)
                              }
                              className="text-blue-600 hover:underline flex items-center"
                              disabled={isDownloading}
                            >
                              {isDownloading ? (
                                <>
                                  <FontAwesomeIcon icon={faSpinner} spin className="mr-1" />
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon icon={faDownload} /> Download
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(doc.id)}
                              className="text-red-600 hover:underline flex items-center"
                              disabled={isDeleting}
                            >
                              {isDeleting ? (
                                <>
                                  <FontAwesomeIcon icon={faSpinner} spin className="mr-1" />
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                                </>
                              )}
                            </button>
                          </div>
                        </li>
                      );
                    })
                ) : (
                  <p className="text-gray-600">No documents uploaded for this property.</p>
                )}
              </ul>
            )}

           

            {/* Upload Section */}
            <form className="mt-6 space-y-4" onSubmit={handleUpload}>
              {error && <p className="text-red-600">{error}</p>}
              <div>
                <label className="block text-gray-700 mb-2">Upload Document</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, file: e.target.files[0] })
                  }
                  accept=".pdf,.doc,.docx,.txt"
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 flex items-center justify-center"
                disabled={isUploading}
              >

                {isUploading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Uploading...
                  </>
                ) : (
                  "Upload Document"
                )}

               
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
