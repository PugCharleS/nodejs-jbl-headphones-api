// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./apiRouter");

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
