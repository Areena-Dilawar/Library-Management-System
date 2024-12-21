const mongoose = require('mongoose');
const Student = require('../models/StudentModels');
const Book = require('../models/BookModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AddStudent = async (req, res) => {
    try {
        const data = new Student(req.body);
        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        data.password = hashedPassword;
        await data.save();
        res.json({
            message: "Successful",
            data: data
        })
        // const object = await User.create(data);
        // res.json({ "message": "object created successfully", object });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const SearchStudent = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Student.findById(userId).populate('borrowedBooks');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User found', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateStudent = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const updatedUser = await Student.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const DeleteStudent = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await Student.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const borrowBook = async (req, res) => {
    try {
        const userId = req.params.id;
        const bookId = req.params.bookId;
        console.log(bookId, 'sdasdas')

        const user = await Student.findById(userId).populate('borrowedBooks');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.borrowedBooks.length >= 3) {
            return res.status(400).json({ message: 'You cannot borrow more than 3 books' });
        }
        // const objectId = new mongoose.Types.ObjectId(bookId)
        // console.log(objectId,"sdasdas")
        const book = await Book.findById(bookId);
        console.log(book, "asdasd")
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        user.borrowedBooks.push(bookId);
        await user.save();

        res.status(200).json({ message: 'Book borrowed successfully', borrowedBooks: user.borrowedBooks, });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const returnBook = async (req, res) => {
    try {
        const userId = req.params.id;
        const bookId = req.params.bookId;

        const user = await Student.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const bookIndex = user.borrowedBooks.indexOf(bookId);
        if (bookIndex === -1) {
            return res.status(400).json({ message: 'Book not found in borrowed list' });
        }

        user.borrowedBooks.splice(bookIndex, 1);
        await user.save();

        const updatedStudent = await Student.findById(userId).populate('borrowedBooks');

        res.status(200).json({
            message: 'Book returned successfully',
            borrowedBooks: updatedStudent.borrowedBooks
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const viewBorrowedBooks = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await Student.findById(userId).populate('borrowedBooks');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Borrowed books retrieved successfully', borrowedBooks: user.borrowedBooks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const Login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const object = await Student.findOne({ email: email });
        if (object) {
            if (!password || !object.password) {
                return res.status(400).json({ message: "Password is missing" });
            }
            const validate = await bcrypt.compare(password, object.password); 
            if (validate) {
                const token = await jwt.sign({ id: object.id, email: object.email }, process.env.JWT_KEY, { algorithm: 'HS256' });
                console.log("Generated Token:", token);
                return res.status(200).json({ message: "Login successful", token: token });
            } else {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        } else {
            return res.status(404).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};   

module.exports = {
    AddStudent,
    SearchStudent,
    updateStudent,
    DeleteStudent,
    borrowBook,
    returnBook,
    viewBorrowedBooks,
    Login
};