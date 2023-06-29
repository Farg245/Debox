const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/admin");
const { MONGODB_URI } = require("./config/AppConst");

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // Create a new admin document
    const email = "admin@example.com";
    const password = "adminpassword";

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email: email,
      password: hashedPassword,
    });

    // Save the admin document to the database
    admin.save().then(() => {
      console.log("Admin document created successfully");
      mongoose.connection.close();
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });