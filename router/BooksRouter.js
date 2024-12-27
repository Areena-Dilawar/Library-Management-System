const express = require('express');
const router = express.Router()
const authenticateToken = require('../middleware/auth');
const controller = require('../controller/BookController')

router.post('/book',controller.AddBook)
router.get('/books/:id',controller.SearchBook)
router.put('/Books/:id',controller.updateBook)
router.delete('/Book_/:id',authenticateToken,controller.DeleteBook)

module.exports = router