require('dotenv').config()
const express = require("express");
const app = express();

app.use(express.json({ extended: false }));


app.use("/api/df_routes", require("./routes/api/df_routes.js"));


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("server running");
});
