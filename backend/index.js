const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const memberRouter = require('./routes');

const app = express();
const port = 5000; // Or any port of your choice
app.use(cors());

const MONGODB_URI = 'mongodb+srv://dasandinesh:dasandinesh%40123%23@chit.5zhbfbd.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGODB_URI);

// Middleware for parsing JSON
app.use(express.json());

// Use the memberRouter for '/members' routes
app.use('/api', memberRouter); // You can adjust the base path ('/api') as needed

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // try {
  //   // Create a new member instance and save it to the database
  //   const savedata = new member({ Number: 10 });
  //   await savedata.save();
  //   console.log('Member data saved successfully!');
  // } catch (error) {
  //   console.error('Error saving member data:', error);
  // }

  // Start the server after connecting to the database
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
