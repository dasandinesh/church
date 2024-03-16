// models/member.js

const mongoose = require('mongoose');

// Define the Member schema
const memberSchema = new mongoose.Schema({
  Number: {
    type: String,
  },
  // baptized: {
  //   type: Date,
  // },
  Cristianname: {
    type: String,
  },
  Formername: String,
  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Adjust as needed
  },
  Dob: {
    type: Date,

  },
  Abode: String,
  Profession: String,
  Parents: String,
  Witnessesname: String,
  Baptizedplace: String,
  Parsonbaptized: String,
});

// Create the Member model
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
