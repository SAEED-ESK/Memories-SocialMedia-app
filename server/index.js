const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");

const app = express();

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use(cors());

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb://0.0.0.0:27017/memories";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
  })
  .then(() => app.listen(PORT, () => console.log(`connect on db port ${PORT}`)))
  .catch((err) => console.error(err));
