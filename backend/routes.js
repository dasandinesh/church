
const express = require('express');
const router = express.Router();
const Member = require('./member'); // Adjust the path based on your project structure

router.post('/members', async (req, res) => {
  try {
    const {
      Number,
      Cristianname,
      Formername,
      Gender,
      Dob,
      Abode,
      Profession,
      Parents,
      Witnessesname,
      Baptizedplace,
      Parsonbaptized,
    } = req.body;

    const newMember = new Member({
      Number,
      Cristianname,
      Formername,
      Gender,
      Dob,
      Abode,
      Profession,
      Parents,
      Witnessesname,
      Baptizedplace,
      Parsonbaptized,
    });

    // Save the new member to the database
    await newMember.save();

    res.status(201).json({ message: 'Member created successfully', data: newMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
});

module.exports = router;



















// const express = require('express');
// const router = express.Router();
// const Member = require('./member'); // Adjust the path based on your project structure

// // Create a new member
// router.post('/members', async (req, res) => {
//   const memberData = req.body;

//   try {
//     const member = new Member(memberData);
//     await member.save();
//     res.status(201).json({ success: true, data: member });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Errordddddd' });
//   }
// });

// // Get all members
router.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json({ success: true, data: members });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// // Get a specific member by ID
// router.get('/members/:id', async (req, res) => {
//   const memberId = req.params.id;

//   try {
//     const member = await Member.findById(memberId);
//     if (!member) {
//       return res.status(404).json({ success: false, error: 'Member not found' });
//     }

//     res.json({ success: true, data: member });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// // Update a member by ID
// router.put('/members/:id', async (req, res) => {
//   const memberId = req.params.id;
//   const updatedData = req.body;

//   try {
//     const member = await Member.findByIdAndUpdate(memberId, updatedData, { new: true });
//     if (!member) {
//       return res.status(404).json({ success: false, error: 'Member not found' });
//     }

//     res.json({ success: true, data: member });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// // Delete a member by ID
// router.delete('/members/:id', async (req, res) => {
//   const memberId = req.params.id;

//   try {
//     const member = await Member.findByIdAndDelete(memberId);
//     if (!member) {
//       return res.status(404).json({ success: false, error: 'Member not found' });
//     }

//     res.json({ success: true, data: member });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
