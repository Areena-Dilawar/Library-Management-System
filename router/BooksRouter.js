const express = require('express');
const router = express.Router()
const authenticateToken = require('../middleware/auth');
const controller = require('../controller/BookController')

router.post('/book',authenticateToken,controller.AddBook)
router.get('/books/:id',controller.SearchBook)
router.put('/Books/:id',authenticateToken,controller.updateBook)
router.delete('/Book_/:id',authenticateToken,controller.DeleteBook)

module.exports = router