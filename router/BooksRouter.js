const express = require('express');
const router = express.Router()
const controller = require('../controller/BookController')

router.post('/book',controller.AddBook)
router.get('/books/:id',controller.SearchBook)
router.put('/Books/:id',controller.updateBook)
router.delete('/Book_/:id',controller.DeleteBook)

module.exports = router