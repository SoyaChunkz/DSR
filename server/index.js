require("dotenv").config();

// const config = require("./config.json");
const mongoose = require("mongoose");
const CombinedModel = require("./models/user.model");
const Department = require("./models/dsr.model")
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const app = express();

//middleware to parse all incoming json from req into javascrip objects for server & make it accessible in req.body
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.ATLAS_DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// //middleware to enable cross-origin resource sharing from any domain (`*`) during development
// app.use(
//     cors({
//         origin: "*",
//     })
// );

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

//Create Account 
app.post('/create-account', async (req, res) => {
  const { fullName, email, password, role, departments } = req.body;

  try {
    // Basic validation
    if( !fullName ){
      return res
          .status(400)
          .json({ error: true,
              message: "Full Name is required"
          });
  }
  if( !email ){
      return res
          .status(400)
          .json({ error: true,
              message: "Email is required"
          });
  }
  if( !password ){
      return res
          .status(400)
          .json({ error: true,
              message: "Password is required"
          });
  }
  if( !role ){
      return res
          .status(400)
          .json({ error: true,
              message: "Role is required"
          });
  }
  if( !departments ){
      return res
          .status(400)
          .json({ error: true,
              message: "Department is required"
          });
  }

    // Check if the user already exists
    const isUser = await CombinedModel.findOne({ email });
    if (isUser) {
      return res.json({
        error: true,
        message: 'User already exists'
      });
    }

    // Create a new user based on the CombinedModel schema
    const newUser = new CombinedModel({
      fullName,
      email,
      password,
      role,
      departments
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT access token
    const accessToken = jwt.sign({ user: newUser }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '36000m'
    });

    // Respond with success message and user details
    return res.json({
      error: false,
      user: newUser,
      accessToken,
      message: 'Registration Successful'
    });
  } catch (error) {
    console.error('Error creating account:', error);
    return res.status(500).json({
      error: true,
      message: 'Internal Server Error'
    });
  }
});


//Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  const userInfo = await CombinedModel.findOne({
    email: email,
  });

  if (!userInfo) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = {
      user: userInfo,
    };

    // console.log("ACCESS_TOKEN_SECRET during token verification:", process.env.ACCESS_TOKEN_SECRET);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successfull",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

//Add dsr entries
// Define the add-entry route
app.post('/add-entry', async (req, res) => {
  try {
    const { deptName, labName, sectionName, dsrEntry } = req.body;

    // Find the department by name
    const dept = await Dept.findOne({ deptName });

    if (!dept) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Find the lab by name
    const lab = dept.sections.find((lab) => lab.labName === labName);

    if (!lab) {
      return res.status(404).json({ message: 'Lab not found' });
    }

    // Find the section by name
    const section = lab.sections.find((sec) => sec.sectionName === sectionName);

    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    // Add the new DSR entry to the section's dsrEntries array
    section.dsrEntries.push(dsrEntry);

    // Save the updated department document
    await dept.save();

    res.status(200).json({ message: 'DSR entry added successfully', dept });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Add dsr entries
app.post('/add-dsr-entry/department/:deptName/lab/:labName/section/:sectionName/dsr', async (req, res) => {
const { deptName, labName, sectionName } = req.params;
  const dsrData = req.body;

  try {
    // Find the relevant department
    const department = await Department.findOne({ deptName });
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Find the relevant lab within the department
    const lab = department.labs.find(lab => lab.labName === labName);
    if (!lab) {
      return res.status(404).json({ error: 'Lab not found' });
    }

    // Find the relevant section within the lab
    const section = lab.sections.find(section => section.sectionName === sectionName);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    // Add the new DSR entry to the section
    section.dsrEntries.push(dsrData);

    // Save the updated department document
    await department.save();

    res.status(201).json({ message: 'DSR entry added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add a department structure
app.post('/create-department-structure', async (req, res) => {
  const departmentData = req.body;

  try {
    const newDepartment = new Department(departmentData);
    await newDepartment.save();
    res.status(201).json({ message: 'Department structure created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = 5000;
app.listen(PORT, function () {
    console.log('Example app listening on port 5000!');
});

module.exports = app;