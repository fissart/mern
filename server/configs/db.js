const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect('mongodb://localhost/fgpa', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${connection.connection.host}`);
};
module.exports = connectDB;
