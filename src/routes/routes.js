const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController')
const internController = require('../controllers/internController')

//-------------------- create college data ----------------------
router.post('/functionup/colleges', collegeController.createCollege)

//-------------------- create student data ----------------------
router.post('/functionup/interns', internController.createStudent)

//-------------------- get college detail with interns ----------------------
router.get('/functionup/collegeDetails', collegeController.getCollegeDetail)

module.exports = router