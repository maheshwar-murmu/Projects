const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/signifya')
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((e) => {
        console.log(`Error connecting to MongoDB: ${e}`);
    });
