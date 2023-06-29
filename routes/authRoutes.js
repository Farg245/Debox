const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ADMIN_SECRET_KEY } = require("../config/AppConst");
const Admin = require("../models/admin");

// Login route
router.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Check if the email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      // Find the admin by email
      const admin = await Admin.findOne({ email });
  
      // Check if the admin exists and the password is correct
      if (!admin || !bcrypt.compareSync(password, admin.password)) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Generate admin token with isAdmin: true
      const token = jwt.sign({ isAdmin: true }, ADMIN_SECRET_KEY);
  
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
