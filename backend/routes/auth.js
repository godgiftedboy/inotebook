const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser'); 

const JWT_SECRET = "harryisagoodb$boy";
//Route 1: Creating a user using : POST method at endpoint "/api/auth/createUser/   It doesnot require auth  - No Login required"

router.post(
  "/createUser",
  [
    body("name", "Enter the valid name").isLength({ min: 3 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check whether the email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exists " });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          userId: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      // res.json(user);
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({ error: "Please enter a unique value for email",message: err.message });
    // });
  }
);

//Route 2: Authenticate a user using : POST method at endpoint "/api/auth/login/   It doesnot require auth  - No Login required"
router.post(
  "/login",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter valid email and password" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please enter valid email and password" });
      }
      const payload = {
        user: {
          userId: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      success=true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error occured");
    }
  }
);

//Route 3: Get logged in user details using :  PST method at endpoint "/api/auth/getUser/   It require auth  -Login required"

router.post("/getUser", fetchuser, async (req, res) => {
  try {
    userId = req.user.userId;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error occured");
  }
});

module.exports = router;
