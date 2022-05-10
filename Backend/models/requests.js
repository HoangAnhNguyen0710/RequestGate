const mongoose = require("mongoose");
const RequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    require: true
  },
  date_created: {
    type: Date,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  assignee: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  }
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
