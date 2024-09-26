const mongoose = require('mongoose');

const connectDatabase = async () => {
 try{
  await mongoose.connect('mongodb+srv://remotesync:12345@cluster0.l9z5a.mongodb.net/shaheertest');
      console.log("Connection to database successfully");
    }
catch(error){
  console.error("MongoDB connection error:", error);
 }
}

module.exports = {connectDatabase};
