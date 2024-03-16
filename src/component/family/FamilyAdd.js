import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import {
  URL_family_list,
  URL_family_add,
  URL_familydelete,
  URL_family_update,
} from "../Urls/Urls";
import { URL_CUS } from "../Urls/Urls";
import "./familyadd.css";

const FamilyAdd = () => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      familyNumber: "",
      familyName: "",
      marriageDate: "",
      homeAddress: "",
      phoneNumber: "",
      members: [
        {
          name: "",
          memberNo: "",
          Bapticed: "",
          christianName: "",
          formerName: "",
          Gender: "",
          Dob: "",
          Adobe: "",
          Profession: "",
          parents: "",
          Witnessesname: "",
          Baptizedplace: "",
          Parsonbaptized: "",
          Doc: "",
          Education: "",
          Income: "",
          Marital: "",
          Mobile: "",
          Email: "",
          Church: "",
          Sangam: "",
          Sangam1: "",
          Sangam2: "",
          Doorno: "",
          Street: "",
          area: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(URL_family_add, data);
      console.log("Server Response:", response.data);

      // Reset form values
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <br />
      <center>
        <h3>Add Family Lists</h3>
      </center>
      <br />
      <div className="row">
        <div className="col-4">
          <label>Family Number</label>
          <input {...register("familyNumber", { required: true })} />
          <br />
          <label>Family Head Name</label>
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
          <input type="tel" {...register("phoneNumber", { required: true })} />
        </div>
      </div>
      <br />
      {/* Family Details */}

      <center>
        <h3>Add Member Lists</h3>
      </center>
      <br />
      {/* Render fields from the field array */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Member ID</th>
              <th>Baptized Date</th>
              <th>Adhaar Number</th>
              <th>Certification Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Adobe</th>
              <th>Profession</th>
              <th>Father/guardian</th>
              <th>,</th>
              <th>Baptized Place</th>
              <th>Zone</th>
              <th>Date of confirmation</th>
              <th>Education</th>
              <th>Monthly Income</th>
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
                  <input {...register(`members.${index}.name`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.memberNo`)} />
                </td>
                <td>
                  <input
                    type="date"
                    {...register(`members.${index}.Bapticed`)}
                  />
                </td>
                <td>
                  <input {...register(`members.${index}.christianName`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.formerName`)} />
                </td>
                <td>
                  <select {...register(`members.${index}.Gender`)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </td>
                <td>
                  <input type="date" {...register(`members.${index}.Dob`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Adobe`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Profession`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.parents`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Witnessesname`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Baptizedplace`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Parsonbaptized`)} />
                </td>
                <td>
                  <input type="date" {...register(`members.${index}.Doc`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Education`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Income`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Marital`)} />
                </td>
                <td>
                  <input type="tel" {...register(`members.${index}.Mobile`)} />
                </td>
                <td>
                  <input type="email" {...register(`members.${index}.Email`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Church`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Sangam`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Sangam1`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Sangam2`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Doorno`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.Street`)} />
                </td>
                <td>
                  <input {...register(`members.${index}.area`)} />
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
      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            memberNo: "",
            Bapticed: "",
            christianName: "",
            formerName: "",
            Gender: "",
            Dob: "",
            Adobe: "",
            Profession: "",
            parents: "",
            Witnessesname: "",
            Baptizedplace: "",
            Parsonbaptized: "",
            Doc: "",
            Education: "",
            Income: "",
            Marital: "",
            Mobile: "",
            Email: "",
            Church: "",
            Sangam: "",
            Sangam1: "",
            Sangam2: "",
            Doorno: "",
            Street: "",
            area: "",
          })
        }
      >
        Add Member
      </button>

      {/* Submit button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FamilyAdd;
