import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { URL_shcdule } from '../Urls/Urls'; // Replace with your actual URL for getting all magazines

const Schedule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await axios.post(URL_shcdule, data);
      console.log("Response Data:", response.data);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Date Field */}
      <div>
        <label>Date:</label>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
        />
        {errors.date && <p>{errors.date.message}</p>}
      </div>

      {/* Day Dropdown */}
      <div>
        <label>Day:</label>
        <select {...register("day", { required: "Day is required" })}>

          <option value="">Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        {errors.day && <p>{errors.day.message}</p>}
      </div>

      {/* Time Range */}
      <div>
        <label>From Time:</label>
        <input
          type="time"
          {...register("fromTime", { required: "From time is required" })}
        />
        {errors.fromTime && <p>{errors.fromTime.message}</p>}
      </div>

      <div>
        <label>To Time:</label>
        <input
          type="time"
          {...register("toTime", { required: "To time is required" })}
        />
        {errors.toTime && <p>{errors.toTime.message}</p>}
      </div>

      {/* Service Field */}
      <div>
        <label>Service:</label>
        <input
          type="text"
          placeholder="Enter the service"
          {...register("service", { required: "Service is required" })}
        />
        {errors.service && <p>{errors.service.message}</p>}
      </div>

      <button type="submit">Submit Schedule</button>
    </form>
  );
};

export default Schedule;
