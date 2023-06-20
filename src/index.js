// app.js
const express = require("express");
const cors = require("cors");
const apiRouter = require("./apiRouter");

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.use(express.json());
app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
