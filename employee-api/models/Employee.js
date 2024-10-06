const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  employeeId: { type: String, required: true, unique: true },
  employeeName: { type: String, required: true },
  role: { type: String, required: true },
  employeeType: { type: String, required: true },
  status: { type: String, required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
  workType: { type: String, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);  
