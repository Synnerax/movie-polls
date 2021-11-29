const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const helmet = require("helmet")
//require("dotenv").config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.listen(PORT, () => {
  console.log("Server is listening on:", PORT);
});

