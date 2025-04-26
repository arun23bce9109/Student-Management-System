const mongoose = require('mongoose');

// Replace <password> and <dbname> with your actual MongoDB connection details
const uri = "mongodb+srv://username:password21@cluster11.kcl10df.mongodb.net/";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB Atlas:', err);
  });
