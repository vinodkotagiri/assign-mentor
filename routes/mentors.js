var express = require('express')
const {
	createMentor,
	getMentors,
	assignStudents,
} = require('../controllers/mentors')
var router = express.Router()

router.get('/', getMentors)
router.post('/create', createMentor)
router.post('/:_id', assignStudents)
module.exports = router
