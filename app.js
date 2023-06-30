const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet"); // secure headers
const compression = require("compression"); // compress assets
const morgan = require("morgan"); // logging
const { MONGODB_URI } = require("./config/AppConst");

/**
 * Controllers
 */
const AppError = require("./controllers/errorController");

/**
 * Routes
 */
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodsRoute");
const merchantRoute = require("./routes/merchantRoute");
const authRoutes = require("./routes/authRoutes");

const app = express();

/**
 * Database Connection
 */
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

/**
 * Middlewares
 */

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/food", foodRoutes);
app.use("/merchant", merchantRoute); 
app.use("/user", userRoutes); // --- User Acccess

app.use("/auth", authRoutes);
app.use(AppError.unAuthorised); // -- Error Handler

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const data = error.data;
  res.status(status).json({ data: data });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
