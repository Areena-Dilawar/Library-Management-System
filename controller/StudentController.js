const mongoose = require('mongoose');
const Student = require('../models/StudentModels');
const Book = require('../models/BookModels');


const AddStudent = async (req, res) => {
    try {
        const userData = req.body;
        const user = await Student.create(userData);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
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
        console.log(bookId,'sdasdas')

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
        console.log(book,"asdasd")
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

module.exports = {
    AddStudent,
    SearchStudent,
    updateStudent,
    DeleteStudent,
    borrowBook,
    returnBook,
    viewBorrowedBooks
};
