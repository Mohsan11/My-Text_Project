const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const app = express();
//Enale Cors
app.use(express.json());
app.use(cors());

const Port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use static folder
// app.use(express.static(path.join(__dirname, "Public")));
app.use("/openai", require("./routes/routes"));
app.listen(Port, () => {
  console.log("This is Running on Port: ", Port);
});
