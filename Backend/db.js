const mongoose = require('mongoose');
const mongooseUrl = 'mongodb://localhost:27017/iNotebook'
const connectToMongo = async () => {
    try {
      await mongoose.connect(mongooseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connected to MongoDB successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };



module.exports = connectToMongo