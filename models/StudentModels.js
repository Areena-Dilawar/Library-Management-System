const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    bookid:{ type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required: false
    },
    borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // age: { type: Number },
    role: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now }
});
const Student = mongoose.model('Student', StudentSchema);
module.exports = Student