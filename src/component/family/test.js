import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import {
  URL_family_list,
  URL_family_add,
  URL_familydelete,
  URL_family_update,
  URL_family_member_list,
} from "../Urls/Urls";
import FamilyDetails from "./FamilyDetails";

const FamilyList = () => {
  const [families, setFamilies] = useState([]);
  const { register, handleSubmit, control, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedFamilyid, setSelectedFamilyid] = useState("");

  useEffect(() => {
    fetchFamilies();
  }, []);

  const fetchFamilies = async () => {
    try {
      const res = await axios.get(URL_family_list);
      setFamilies(res.data);
    } catch (error) {
      console.error("Error fetching family list:", error);
    }
  };

  const handleEdit = (id, family) => {
    setSelectedFamily(family);
    setSelectedFamilyid(id);
    setShowEditModal(true);
    reset(family);
  };

  const handleViews = (family) => {
    setSelectedFamily(family);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedFamily(null);
    reset(); // Reset the form when the modal is closed
  };

  const onSubmit = async (data) => {
    alert(selectedFamilyid);
    try {
      const payload = {
        arg1: selectedFamilyid,
        formData: data,
      };
      const response = await axios.post(URL_family_update, payload);
      console.log("Server Response:", response.data);
      closeModal();
      // Refresh family list after edit
      fetchFamilies();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h2>Family List</h2>
      <table>
        <thead>
          <tr>
            <th>Family Number</th>
            <th>Family Name</th>
            <th>Marriage Date</th>
            <th>Home Address</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {families.map((family, index) => (
            <tr key={index}>
              <td>{family.familyNumber}</td>
              <td>{family.familyName}</td>
              <td>{family.marriageDate}</td>
              <td>{family.homeAddress}</td>
              <td>{family.phoneNumber}</td>
              <td>
                <button onClick={() => handleEdit(family._id, family)}>
                  &#xf044;
                </button>
                <button onClick={() => handleViews(family)}>Views</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showViewModal && (
        <FamilyDetails
          selectedFamily={selectedFamily}
          closeModal={closeModal}
        />
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Edit Family</h2>
            {/* Edit form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" {...register("id")} />
              <div className="row">
                <div className="col-4">
                  <label>Family Number</label>
                  <input {...register("familyNumber", { required: true })} />
                  <br />
                  <label>Family Name</label>
                  <input {...register("familyName", { required: true })} />
                </div>
                <div className="col-4">
                  <label>Marriage Date</label>
                  <input
                    type="date"
                    {...register("marriageDate", { required: true })}
                  />
                  <br />
                  <label>Home Address</label>
                  <input {...register("homeAddress", { required: true })} />
                </div>
                <div className="col-4">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    {...register("phoneNumber", { required: true })}
                  />
                </div>
              </div>
              {/* Render fields from the field array */}
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>Member Number</th>
                      <th>Bapticed</th>
                      <th>Christian Name</th>
                      <th>Former Name</th>
                      <th>Gender</th>
                      <th>DOB</th>
                      <th>Adobe</th>
                      <th>Profession</th>
                      <th>Parents</th>
                      <th>Witnesses Name</th>
                      <th>Baptized Place</th>
                      <th>Parson Baptized</th>
                      <th>DOC</th>
                      <th>Education</th>
                      <th>Income</th>
                      <th>Marital Status</th>
                      <th>Mobile</th>
                      <th>Email</th>
                      <th>Church</th>
                      <th>Sangam</th>
                      <th>Sangam 1</th>
                      <th>Sangam 2</th>
                      <th>Door No</th>
                      <th>Street</th>
                      <th>Area</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((member, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.name`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.memberNo`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Bapticed`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.christianName`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.formerName`)}
                          />
                        </td>
                        <td>
                          <select {...register(`members.${index}.Gender`)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="date"
                            {...register(`members.${index}.Dob`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Adobe`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Profession`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.parents`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Witnessesname`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Baptizedplace`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Parsonbaptized`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Doc`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Education`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Income`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Marital`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Mobile`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Email`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Church`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Sangam`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Sangam1`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Sangam2`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Doorno`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Street`)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.area`)}
                          />
                        </td>
                        <td>
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add new member button */}
              <button type="button" onClick={() => append({})}>
                Add Member
              </button>

              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyList;
