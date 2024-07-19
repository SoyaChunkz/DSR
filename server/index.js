require("dotenv").config();

// const config = require("./config.json");
const mongoose = require("mongoose");
const CombinedModel = require("./models/user.model");
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

  const userInfo = await User.findOne({
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

const PORT = 5000;
app.listen(PORT, function () {
    console.log('Example app listening on port 5000!');
});

module.exports = app;