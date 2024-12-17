const Book = require('../models/BookModels')
const AddBook = async (req, res) => {
    try {
        const data = req.body;
        const object = await Book.create(data);
        res.json({ "message": "object created successfully", object });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message:"Internal Server Error" });
    }
}
const SearchBook = async (req, res) => {
    try {
        const id = req.params.id;
        const object = await Book.findById(id);
        res.json({ "message": "object found", object });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message:"Internal Server Error" });
    }
}
const updateBook = async (req, res) => {
    try {
        const id = req.params.id
        const object = req.body
        const updatedBook = await Book.findByIdAndUpdate(id, object, { new: true });
        if (updatedBook === null) {
            return res.status(404).send("Book not found");
        }
        res.status(200).send(updatedBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message:"Internal Server Error" });
    }
}
const DeleteBook = async (req, res) => {
    try{
        const id = req.params.id
        const DeletedBook = await Book.findByIdAndDelete(id);
        if (DeletedBook === null) {
            return res.status(404).send("Book not found");
        }
        res.status(200).send(DeletedBook);
    }catch(err){
        console.error(err);
        res.status(500).json({ message:"Internal Server Error" });
    }
}
module.exports = {
    AddBook,
    SearchBook,
    updateBook,
    DeleteBook
}