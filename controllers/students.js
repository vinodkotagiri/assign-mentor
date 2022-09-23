const Students = require('../models/students')
const Mentors = require('../models/mentors')
const mongoose = require('mongoose')
//create new student

const createStudent = async (req, res) => {
	const { name, email, mobile } = req.body

	try {
		//Check if student already in the database

		const check = await Students.findOne({ email })
		if (check) {
			return res.status(400).json({
				error: 'Student with email already exists',
			})

			if (check.mobile === mobile) {
				return res
					.status(400)
					.json({ error: 'Student with mobile number already exists' })
			}
		}

		//Update new student in database
		const student = await new Students({ name, email, mobile }).save()
		res.status(201).json(student)
	} catch (error) {
		res.status(500).json({ error: 'Error creating Student: ' + error })
	}
}

//Get all students
const getStudents = async (req, res) => {
	try {
		const students = await Students.find()
		res.status(200).json(students)
	} catch (error) {
		res.status(500).json({ error: 'Error getting Students' })
	}
}

//Assign Mentor
const assignMentor = async (req, res) => {
	const { _id } = req.params
	const { selectedMentor } = req.body
	try {
		const mentorTobeAssigned = await Mentors.findById(selectedMentor)
		const student = await Students.findById(_id)
		if (student.isMentorAssigned)
			return res.status(400).send('Already assigned')

		//update student
		await Students.updateOne(
			{ _id },
			{
				assignedMentor: mongoose.Types.ObjectId(selectedMentor),
				isMentorAssigned: true,
			}
		)
		//Update mentor
		const updatedStudents = [
			...mentorTobeAssigned.assignedStudents,
			mongoose.Types.ObjectId(_id),
		]
		await Mentors.updateOne(
			{ _id: selectedMentor },
			{ assignedStudents: updatedStudents }
		)
		res.status(200).send('Assigned successfully')
	} catch (error) {
		res.status(500).json({ error: 'Error assigning Mentor: ' + error })
	}
}

module.exports = { createStudent, getStudents, assignMentor }
