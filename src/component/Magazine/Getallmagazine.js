



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_magazine_getall } from '../Urls/Urls'; // Replace with your actual URL for getting all magazines
import './magazine.css';

const Getallmagazine = () => {
  const [magazines, setMagazines] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(''); // State for PDF URL
  const [currentMagazineName, setCurrentMagazineName] = useState(''); // State for the current magazine name

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        setLoading(true);
        setStatus('Fetching magazines...');
        const response = await axios.get(URL_magazine_getall);
        if (response.status === 200) {
          setMagazines(response.data);
          setStatus('');
        } else {
          setStatus('Failed to fetch magazines.');
        }
      } catch (error) {
        setStatus('Error fetching magazines.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMagazines();
  }, []);

  const handleViewPdf = (pdfUrl, magazineName) => {
    setPdfUrl(pdfUrl); // Set the PDF URL
    setCurrentMagazineName(magazineName); // Set the current magazine name
    setShowViewModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowViewModal(false);
    setPdfUrl(''); // Reset the PDF URL
    setCurrentMagazineName(''); // Reset the current magazine name
  };

  const convertToPreviewLink = (link) => {
    // Convert '/view?' to '/preview' and remove any query parameters like 'usp=drive_link'
    if (link.includes('/view?')) {
      const cleanLink = link.split('?')[0]; // Remove the query parameters after '?'
      return cleanLink.replace('/view', '/preview'); // Convert view to preview
    }
    return link;
  };

  return (
    <div>
     <center>
  <h3 className='head'>Jehovah Melech </h3>
  <hr/>
  Scerch:-
  <input /><hr/>
</center>
      {/* Show loading spinner or status */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>{status}</div>
           <div   className="table-responsive">
          {/* Show magazines list if available */}
          {magazines.length > 0 ? (
            <table className="table-bordered">
              <thead>
                <tr>
                  <th className='name'>Name</th>
                  <th className='date'>Date</th>
                  <th className='download'>Download</th>
                  <th className='reading'>Online</th>
                </tr>
              </thead>
              <tbody>
                {magazines.map((magazine) => (
                  <tr key={magazine._id}>
                    <td>{magazine.name}</td>
                    <td>{magazine.date}</td>
                    <td>
                      <a href={magazine.link} target="_blank" rel="noopener noreferrer">
                        Download PDF
                      </a>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleViewPdf(convertToPreviewLink(magazine.link), magazine.name)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No magazines available.</p>
          )}
</div>
          {/* Bootstrap Modal for viewing PDF */}
          {showViewModal && (
            <div className="modal fade show" style={{ display: 'block' }}>
              <div>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{currentMagazineName}</h5> {/* Use the current magazine name */}
                    <button type="button" className="close" onClick={closeModal}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {pdfUrl ? (
                      <iframe
                        src={pdfUrl}
                        title="PDF Viewer"
                        width="100%"
                        height="500px"
                        style={{ border: 'none' }}
                      />
                    ) : (
                      <p>No PDF available to view.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Getallmagazine;
