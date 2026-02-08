const mongoose = require('mongoose');

// Mongoose connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/uixom';
mongoose.connect(mongoURI)
  .then((x) =>{
    console.log(`Connected to MongoDB: ${x.connection.name}`);
  } )
  .catch(err => console.error('MongoDB connection error:', err));