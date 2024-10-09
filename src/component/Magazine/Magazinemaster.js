import React, { useState } from 'react';
import axios from 'axios';
import { URL_magazine_add } from '../Urls/Urls'; // Replace with your actual App Service URL

function Magazinemaster() {
  const [formdata, setFormdata] = useState({
    name: '',
    date: '',
    link: ''
  });
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading...');

    try {
      const response = await axios.post(URL_magazine_add, {
        name: formdata.name,
        date: formdata.date,
        link: formdata.link,
      });

      if (response.status === 200) {
        setStatus('File uploaded successfully.');
      } else {
        setStatus('Failed to upload the file.');
      }
    } catch (error) {
      setStatus('Error uploading the file.');
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <h1>Upload PDF to MongoDB</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formdata.name}
          onChange={handleInputChange}
          placeholder="Enter name"
          required
        />
        <input
          type="date"
          name="date"
          value={formdata.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="link"
          value={formdata.link}
          onChange={handleInputChange}
          placeholder="Enter link"
          required
        />
        <button type="submit">Upload PDF</button>
      </form>
      <div>{status}</div>
    </div>
  );
}

export default Magazinemaster;
