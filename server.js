require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();
app.use(express.json({ extended: false }));
app.use("/", require("./routes/api/dialogflow_routes.js"));
app.use("/", require("./routes/api/fulfillment_routes.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
