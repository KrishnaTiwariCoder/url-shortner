const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  slug: {
    type: String,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("urls", urlSchema);
