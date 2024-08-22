import React, { useState } from "react";
import './MemberAdd.css'
import {URL_CUS_chit} from '../Urls/Urls'
import axios from "axios";


const MemberAdd = () => {
  const [Number, setNumber] = useState("");
  const [baptized, setBaptized] = useState("");
  const [Cristianname, setCristianname] = useState("");
  const [Formername, setFormername] = useState("");
  const [Gender, setGender] = useState("");
  const [Dob, setDob] = useState("");

  const [Abode, setAbode] = useState("");
  const [Profession, setProfession] = useState("");
  const [Parents, setParents] = useState("");
  const [Witnessesname, setWitnessesname] = useState("");
  const [Baptizedplace, setBaptizedplace] = useState("");
  const [Parsonbaptized, setParsonbaptized] = useState("");

  const [Doc, setDoc] = useState("");
  const [Eduction, setEduction] = useState("");
  const [Income, setIncome] = useState("");
  const [Marital, setMarital] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [Church,setChurch] =useState("");
  const [Sangam,setSangam] =useState("");
  const [Sangam1,setSangam1] =useState("");
  const [Sangam2,setSangam2] =useState("");
  const [Doorno,setDoorno] =useState("");
  const [Street,setStreet] =useState("");
  const [area,setArea] =useState("");


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const member = {
        Number: Number,
        baptized: baptized,
        Cristianname: Cristianname,
        Formername: Formername,
        Gender: Gender,
        Dob: Dob,
        Abode: Abode,
        Profession: Profession,
        Parents: Parents,
        Witnessesname: Witnessesname,
        Baptizedplace: Baptizedplace,
        Parsonbaptized: Parsonbaptized,
        Doc: Doc,
        Eduction: Eduction,
        Income: Income,
        Marital: Marital,
        Mobile: Mobile,
        Email: Email,
        Church: Church,
        Sangam: Sangam,
        Sangam1: Sangam1,
        Sangam2: Sangam2,
        Doorno: Doorno,
        Street: Street,
        area: area,
      };
      const response = await axios.post(URL_CUS_chit, member);


      console.log('Server Response:', response.data);
      setNumber("");
      setBaptized("");
      setCristianname("");
      setFormername("");
      setGender("");
      setDob("");
      setAbode("");
      setProfession("");
      setParents("");
      setWitnessesname("");
      setBaptizedplace("");
      setParsonbaptized("");
      setDoc("");
      setEduction("");
      setIncome("");
      setMarital("");
      setMobile("");
      setEmail("");
      setChurch("");
      setSangam("");
      setSangam1("");
      setSangam2("");
      setDoorno("");
      setStreet("");
      setArea("");

    } catch (error) {
    }

  }

  return (
    <div className="formdiv">

      <h1>Add Member</h1>
      <form onSubmit={handleSubmit}>
        <table>
        <tbody>
          <tr><th>Number</th><td><input  type="text"
            value={Number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Number"
          /></td></tr>
         {/* <tr>
          <th>Baptized</th>
          <td>
            <input
              type="date"
              value={baptized}
              onChange={(e) => setBaptized(e.target.value || null)}
              style={{ width: "150px" }}
            />
          </td>
        </tr> */}
          <tr><th>Cristianname</th><td><input
            type="text"
            value={Cristianname}
            onChange={(e) => setCristianname(e.target.value)}
            placeholder="Cristianname"
          /></td></tr>
          <tr><th>Former name</th><td> <input
            type="text"
            value={Formername}
            onChange={(e) => setFormername(e.target.value)}
            placeholder="Former name"
          /></td></tr>
          <tr><th>Gender</th><td> <label>
            <input
              type="radio"
              value="Male"
              checked={Gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              value="Female"
              checked={Gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
          <p>Selected Gender: {Gender}</p></td></tr>
          <tr><th>Dob</th><td><input
            type="date"
            value={Dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
            style={{ width: "150px" }}
            placeholder="Dob"
          /></td></tr>
          <tr><th>Abode</th><td>  <input
            type="text"
            value={Abode}
            onChange={(e) => setAbode(e.target.value)}
            placeholder="Abode"
          /></td></tr>
          <tr><th>Profession</th><td>
          <input
            type="text"
            value={Profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Profession"
          /></td></tr>
          
          <tr><th>Parents</th><td> <input
            type="text"
            value={Parents}
            onChange={(e) => setParents(e.target.value)}
            placeholder="Parents"
          /></td></tr>
          <tr><th>Witnessesname</th><td>
          <input
            type="text"
            value={Witnessesname}
            onChange={(e) => setWitnessesname(e.target.value)}
            style={{ width: "150px" }}
            placeholder="Witnessesname"
          /></td></tr>
          <tr><th>Baptizedplace</th><td>
          <input
            type="text"
            value={Baptizedplace}
            onChange={(e) => setBaptizedplace(e.target.value)}
            placeholder="Baptizedplace"
          /></td></tr>
          <tr><th>Parson by baptized</th><td>  <input
            type="text"
            value={Parsonbaptized}
            onChange={(e) => setParsonbaptized(e.target.value)}
            placeholder="Parson baptized"
          /></td></tr>

<tr><th>Doc</th><td>  <input
            type="date"
            value={Doc}
            onChange={(e) => setDoc(e.target.value)}
            placeholder="Doc"
          /></td></tr>

<tr><th>Eduction</th><td>  <input
            type="text"
            
            value={Eduction}
            onChange={(e) => setEduction(e.target.value)}
            placeholder="Eduction"
          /></td></tr>

<tr><th>Income</th><td>  <input
            type="text"
            value={Income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Income"
          /></td></tr>

<tr>
  <th>Marital</th>
  <td>
    <select
      value={Marital}
      onChange={(e) => setMarital(e.target.value)}
    >
      <option value="" disabled hidden>
        Select Marital Status
      </option>
      <option value="single">Single</option>
      <option value="married">Married</option>
      <option value="divorced">Divorced</option>
      <option value="widowed">Widowed</option>
    </select>
  </td>
</tr>



<tr><th>Mobile</th><td>  <input
            type="text"
            value={Mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Parson baptized"
          /></td></tr>

<tr><th>Email</th><td>  <input
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Parson baptized"
          /></td></tr>

<tr><th>Church</th><td>  <input
            type="text"
            value={Church}
            onChange={(e) => setChurch(e.target.value)}
            placeholder="Parson baptized"
          /></td></tr>

<tr><th>Sangamn current year</th><td>  <input
            type="text"
            value={Sangam}
            onChange={(e) => setSangam(e.target.value)}
            placeholder="Parson baptized"
          /></td></tr>

<tr><th>Sangamn last year</th><td>  <input
            type="text"
            value={Sangam1}
            onChange={(e) => setSangam1(e.target.value)}
            placeholder="Parson baptized"
          /></td></tr>

<tr><th>Sangamn Before last year</th><td>  <input
            type="text"
            value={Sangam2}
            onChange={(e) => setSangam2(e.target.value)}
            placeholder="Parson baptized"
          /></td></tr>


<tr><th>Doorno</th><td>  <input
            type="text"
            value={Doorno}
            onChange={(e) => setDoorno(e.target.value)}
            placeholder="Parson baptized"
          /></td></tr>

<tr><th>Street</th><td>  <input
            type="text"
            value={Street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Parson baptized"
          /></td></tr>

<tr><th>Area</th><td>  <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Parson baptized"
          /></td></tr>
        </tbody>
        </table>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default MemberAdd;
