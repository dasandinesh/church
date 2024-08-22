import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { URL_family_member_list } from "../Urls/Urls";

const MemberList = () => {
  const [memberslist, setMembers] = useState([]);
  const [list, setList] = useState("");
  const [Gender, setGender] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Fromage, setFromage] = useState("");
  const [Toage, setToage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const membersPerPage = 100;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(URL_family_member_list);
        const data = res.data;

        if (Array.isArray(data)) {
          const membersdata = data.map(({ members }) => members).flat(Infinity);
          setMembers(membersdata);
        } else {
          console.error("Invalid API response:", data);
        }
      } catch (error) {
        console.error("Error fetching member list:", error);
      }
    };

    fetchMembers();
  }, []);

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
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

  const filteredMembers = memberslist.filter(
    (member) =>
      member.christianName.toLowerCase().includes(list.toLowerCase()) &&
      (Gender === "" || member.Gender.toLowerCase() === Gender.toLowerCase()) &&
      (Gender === "" || member.Gender.toLowerCase() === Gender.toLowerCase()) &&
      (startDate === "" || isWithinDateRange(member.Dob, startDate, endDate)) &&
      (Fromage === "" || calculateAge(member.Dob) >= parseInt(Fromage)) &&
      (Toage === "" || calculateAge(member.Dob) <= parseInt(Toage))
  );

  const pagesVisited = pageNumber * membersPerPage;
  const pageCount = Math.ceil(filteredMembers.length / membersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Filter inputs */}

        <div className="col-4">
          <label>Search by Name:</label>
          <br />
          <input
            className="smallinput"
            type="text"
            placeholder="search by name"
            onChange={(e) => {
              setList(e.target.value);
            }}
          />
        </div>
        <div className="col-4">
          <label>Search by Gender:</label>
          <br />
          <select
                    className="smallinput"
                    value={Gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-4">
          <label>Start Date:</label>
          <input
            className="smallinput"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input
          className="smallinput"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-4">
          <label>Search by Age:</label>
          <br />
          <label>Fromage:</label>
          <input
           className="smallinput"
            type="text"
            value={Fromage}
            onChange={(e) => setFromage(e.target.value)}
          />
          <label>Toage:</label>
          <input
          className="smallinput"
            type="text"
            value={Toage}
            onChange={(e) => setToage(e.target.value)}
          />
        </div>
      </div>
      <hr />
      {filteredMembers.length > 0 && (
        <div>
          <h2 style={{ color: "blue", textAlign: "center" }}>Member List</h2>
          <div className="table-responsive">
            {" "}
            <table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Baptized</th>
                  <th>Christian Name</th>
                  <th>Former name</th>
                  <th>Gender</th>
                  <th>Dob</th>
                  <th>Age</th>
                  <th>Abode</th>
                  <th>Profession</th>
                  <th>Parents</th>
                  <th>Witnesses name</th>
                  <th>Baptized place</th>
                  <th>Parson baptized</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers
                  .slice(pagesVisited, pagesVisited + membersPerPage)
                  .map((member, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td style={{ width: "140px" }}>{member.Bapticed}</td>
                      <td>{member.christianName}</td>
                      <td>{member.formerName}</td>
                      <td>{member.Gender}</td>
                      <td style={{ width: "140px" }}>{member.Dob}</td>
                      <td>{calculateAge(member.Dob)}</td>
                      <td>{member.Adobe}</td>
                      <td>{member.Profession}</td>
                      <td>{member.parents}</td>
                      <td>{member.Witnessesname}</td>
                      <td>{member.Baptizedplace}</td>
                      <td>{member.Parsonbaptized}</td>
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
        </div>
      )}
    </div>
  );
};

export default MemberList;
