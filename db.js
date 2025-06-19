const mongoose = require('mongoose');

// ✅ Just the connection string (no MONGO_URI= prefix)
const mongooseUrl = 'mongodb+srv://myUser:Rajat%4054315@cluster0.taepjyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongooseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
