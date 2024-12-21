const express = require('express');
const authenticateToken = require('../middleware/auth');
const router = express.Router()
const controller = require('../controller/StudentController')

router.post('/Stu',controller.AddStudent)
router.get('/Student_/:id',controller.SearchStudent)
router.put('/students/:id',controller.updateStudent)
router.delete('/STUDENT/:id',controller.DeleteStudent)
router.post('/Login',authenticateToken, controller.Login)
router.post('/:id/borrow/:bookId', controller.borrowBook);
router.post('/return/:bookId', controller.returnBook);
router.get('/borrowedBooks/:id', controller.viewBorrowedBooks);

module.exports = router