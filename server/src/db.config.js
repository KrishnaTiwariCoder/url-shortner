const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (data) => console.log("DB connected !!")
);
