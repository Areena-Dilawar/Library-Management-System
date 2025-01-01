const express = require('express');
const {authenticateToken, authorization} = require('../middleware/auth');
const router = express.Router()
const controller = require('../controller/StudentController')

router.post('/Stu',controller.AddStudent)
router.get('/Student_/:id',authenticateToken, authorization("admin") ,controller.SearchStudent)
router.put('/students/:id', controller.updateStudent)
router.delete('/STUDENT/:id',authenticateToken, authorization("admin") ,controller.DeleteStudent)
router.post('/login', controller.Login)
router.post('/:id/borrow/:bookId', controller.borrowBook);
router.post('/return/:bookId', controller.returnBook);
router.get('/borrowedBooks/:id', controller.viewBorrowedBooks);
router.post('/forgetpassword', controller.forgetPassword);
router.post('/resetPassword', controller.resetPassword);
router.post('/generateOTP', controller.generateOTP);
module.exports = router