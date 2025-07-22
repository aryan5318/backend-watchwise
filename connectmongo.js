const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Mongodb Successfully");
    } catch (error) {
        console.log("Mongodb Atal connection error:" + error);
    }
}

module.exports = connectDB;