const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();
const app = express();
const StudentRouter = require('./router/StudentRouter');
const BooksRouter = require('./router/BooksRouter');

mongoose.connect('mongodb://localhost:27017/Users')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Connection error:", err));
    
// console.log(process.env.MONGO_URL , 'abcd')
// mongoose.connect(process.env.MONGO_URL)    
app.use(express.json());
app.use('/Student',StudentRouter)
app.use('/Book', BooksRouter)
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
