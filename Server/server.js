const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const Port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/openai", require("./routes/routes"));
app.listen(Port, () => {
  console.log("This is Running on Port: ", Port);
});
