import React, { useState } from "react";
import axios from "axios";
import { URL_familydelete } from "../Urls/Urls";

const FamilyDetails = ({ selectedFamily, closeModal }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [enteredId, setEnteredId] = useState("");

  const handleDelete = async () => {
    if (enteredId === selectedFamily._id) {
      try {
        const response = await axios.delete(
          `${URL_familydelete}?id=${selectedFamily._id}`
        );
        console.log("Server Response:", response.data);
        closeModal(); // For example, closing the modal after deletion
      } catch (error) {
        console.error("Error deleting family:", error);
        // Handle error or display error message to user
      }
    } else {
      alert("Entered ID doesn't match!");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Family Details</h2>
        {selectedFamily && (
          <div>
            <p>Family Number: {selectedFamily.familyNumber}</p>
            <p>Family Name: {selectedFamily.familyName}</p>
            <p>Marriage Date: {selectedFamily.marriageDate}</p>
            <p>Home Address: {selectedFamily.homeAddress}</p>
            <p>Phone Number: {selectedFamily.phoneNumber}</p>
            <p>Family Number: {selectedFamily._id}</p>

            <h3>Members:</h3>
            {selectedFamily.members.map((member, index) => (
              <div key={index}>
                <h4>Member {index + 1}</h4>
                <table className="table">
                  <tbody>
                    {Object.entries(member).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
        {confirmDelete ? (
          <>
            <input
              type="text"
              placeholder="Enter ID to confirm deletion"
              value={enteredId}
              onChange={(e) => setEnteredId(e.target.value)}
            />
            <button onClick={handleDelete}>Confirm Delete</button>
            <button onClick={() => setConfirmDelete(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setConfirmDelete(true)}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default FamilyDetails;
