const express = require('express');
const router = express.Router()
const {authenticateToken, authorization} = require('../middleware/auth');
const controller = require('../controller/BookController')

router.post('/book',authenticateToken, authorization("admin"),controller.AddBook)
router.get('/books/:id',controller.SearchBook)
router.put('/Books/:id',authenticateToken,authorization("admin"),controller.updateBook)
router.delete('/Book_/:id',authenticateToken, authorization("admin"),controller.DeleteBook)

module.exports = router