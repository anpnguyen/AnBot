require('dotenv').config()
const express = require("express");
const app = express();

app.use(express.json({ extended: false }));


app.use("/api", require("./routes/api/df_routes.js"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running");
});
