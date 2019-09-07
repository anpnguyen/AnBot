const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  address: {
    type: String,
    
  },
  phone: {
    type: String,
    
  },
  date:{
    type: Date,
    default: Date.now
  }
});

Registration = mongoose.model("registration", UserSchema);

module.exports = Registration;


