import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import ReactPaginate from "react-paginate";

import { URL_family_list, URL_family_update } from "../Urls/Urls";
import FamilyDetails from "./FamilyDetails";

const FamilyList = () => {
  const [families, setFamilies] = useState([]);
  const { register, handleSubmit, control, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedFamilyid, setSelectedFamilyid] = useState("");
  const [familyNumberFilter, setFamilyNumberFilter] = useState("");
  const [familyNameFilter, setFamilyNameFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const membersPerPage = 100;
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
    console.log(data);
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

  const isWithinDateRange = (date, startDate, endDate) => {
    const dob = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMonthDay = `${start.getMonth() + 1}-${start.getDate()}`;
    const endMonthDay = `${end.getMonth() + 1}-${end.getDate()}`;
    const dobMonthDay = `${dob.getMonth() + 1}-${dob.getDate()}`;

    return (
      (startMonthDay <= endMonthDay &&
        dobMonthDay >= startMonthDay &&
        dobMonthDay <= endMonthDay) ||
      (startMonthDay > endMonthDay &&
        (dobMonthDay >= startMonthDay || dobMonthDay <= endMonthDay))
    );
  };

  // Filtering function
  const filteredFamilies = families.filter((family) => {
    return (
      family.familyNumber.includes(familyNumberFilter) &&
      family.familyName.includes(familyNameFilter) &&
      (startDate === "" ||
        isWithinDateRange(family.marriageDate, startDate, endDate))
    );
  });

  const pagesVisited = pageNumber * membersPerPage;
  const pageCount = Math.ceil(filteredFamilies.length / membersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
      {/* Filter inputs */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="familyNumberFilter">Family Number</label>
            <input
              type="text"
              className="form-control"
              id="familyNumberFilter"
              placeholder="Filter by Family Number"
              value={familyNumberFilter}
              onChange={(e) => setFamilyNumberFilter(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="familyNameFilter">Family Name</label>
            <input
              type="text"
              className="form-control"
              id="familyNameFilter"
              placeholder="Filter by Family Name"
              value={familyNameFilter}
              onChange={(e) => setFamilyNameFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              id="startDate"
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              id="endDate"
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <h2 style={{ color: "blue", textAlign: "center" }}>Family List</h2>

      <div className="table-responsive">
        <table className="table">
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
            {filteredFamilies
              .slice(pagesVisited, pagesVisited + membersPerPage)
              .map((family, index) => (
                <tr key={index}>
                  <td>{family.familyNumber}</td>
                  <td>{family.familyName}</td>
                  <td>{family.marriageDate}</td>
                  <td>{family.homeAddress}</td>
                  <td>{family.phoneNumber}</td>
                  <td>
                    <button onClick={() => handleEdit(family._id, family)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleViews(family)}>Views</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
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
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Family Number</label>
                    <input
                      {...register("familyNumber", { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Family Name</label>
                    <input
                      {...register("familyName", { required: true })}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Marriage Date</label>
                    <input
                      type="date"
                      {...register("marriageDate", { required: true })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Home Address</label>
                    <input
                      {...register("homeAddress", { required: true })}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      {...register("phoneNumber", { required: true })}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              {/* Render fields from the field array */}
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>Member ID</th>
                      <th>Bapticed date</th>
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((member, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.name`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.memberNo`)}
                            className="form-control"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            {...register(`members.${index}.Bapticed`)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.christianName`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.formerName`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Gender`)}
                            className="form-control"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            {...register(`members.${index}.Dob`)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Adobe`)}
                            className="form-control"
                            style={{ width: "170px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Profession`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.parents`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Witnessesname`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Baptizedplace`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Parsonbaptized`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            {...register(`members.${index}.Doc`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Education`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Income`)}
                            className="form-control"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Marital`)}
                            className="form-control"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Mobile`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Email`)}
                            className="form-control"
                            style={{ width: "200px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Church`)}
                            className="form-control"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Sangam`)}
                            className="form-control"
                            style={{ width: "80px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Sangam1`)}
                            className="form-control"
                            style={{ width: "80px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Sangam2`)}
                            className="form-control"
                            style={{ width: "80px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Doorno`)}
                            style={{ width: "80px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.Street`)}
                            className="form-control"
                            style={{ width: "150px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            {...register(`members.${index}.area`)}
                            className="form-control"
                            style={{ width: "150px" }}
                          />
                        </td>

                        {/* Rest of the input fields */}
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add new member button */}
              <button
                type="button"
                onClick={() => append({})}
                className="btn btn-primary"
              >
                Add Member
              </button>

              <button type="submit" className="btn btn-success">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyList;
