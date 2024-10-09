import React, { useEffect, useState } from 'react';
import axios from 'axios';
import chrch1 from '../assets/images/chrch1.jpeg';
import chrch2 from '../assets/images/charch2.jpeg';
import chrch3 from '../assets/images/charch3.jpeg';
import chrch4 from '../assets/images/charch4.jpeg';
import { URL_shcdule_get } from './Urls/Urls'; // Ensure the correct URL for your GET request
import './home.css';

const Home = () => {
  const [schedules, setSchedules] = useState([]); // State to store fetched data
  const [error, setError] = useState(null); // State to handle error
  const [currentImage, setCurrentImage] = useState(0); // State to handle slideshow index

  const images = [chrch1, chrch2, chrch3, chrch4]; // Array of images

  useEffect(() => {
    // Function to fetch schedule data
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(URL_shcdule_get);
        setSchedules(response.data); // Assuming the response contains an array of schedules
      } catch (err) {
        setError('Error fetching schedules');
        console.error('Error:', err);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    // Auto-rotation for the slideshow (changes every 3 seconds)
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [images.length]);

  // Handle Next and Back button click
  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handleBack = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  return (
    <div>
      <center>
        <div className="slideshow-container">
          <button className="prev-button" onClick={handleBack}>Back</button>
          <img src={images[currentImage]} alt="Church" className="slide-image" />
          <button className="next-button" onClick={handleNext}>Next</button>
        </div>
      </center>
     <hr></hr>
      {/* Display fetched schedule data */}
       {/* <center><h3>Service Schedules</h3></center> */}
        
        <div  className="table-responsive">

        {error && <p>{error}</p>}
        {schedules.length > 0 ? (

          <table >
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>From Time</th>
                <th>To Time</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index}>
                  <td>{schedule.date}</td>
                  <td>{schedule.day}</td>
                  <td>{schedule.fromTime}</td>
                  <td>{schedule.toTime}</td>
                  <td>{schedule.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No schedules available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
