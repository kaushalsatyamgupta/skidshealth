const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cors = require('cors');
const { mongoUri } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const linkRoutes = require("./routes/linkRoutes");

const app = express();

// app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/auth", authRoutes);
app.use("/", linkRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

