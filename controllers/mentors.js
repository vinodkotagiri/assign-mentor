const Mentors = require('../models/mentors')
const Students = require('../models/students')
//create new student

const createMentor = async (req, res) => {
	const { name, email, mobile } = req.body

	try {
		//Check if student already in the database

		const check = await Mentors.findOne({ email })
		if (check) {
			return res.status(400).json({
				error: 'Mentor with email already exists',
			})

			if (check.mobile === mobile) {
				return res
					.status(400)
					.json({ error: 'Mentor with mobile number already exists' })
			}
		}

		//Update new student in database
		const mentor = await new Mentors({ name, email, mobile }).save()
		res.status(201).json(mentor)
	} catch (error) {
		res.status(500).json({ error: 'Error creating Mentor: ' + error })
	}
}

//Get all Mentors
const getMentors = async (req, res) => {
	try {
		const mentors = await Mentors.find().lean()
		res.status(200).json(mentors)
	} catch (error) {
		res.status(500).json({ error: 'Error getting Mentors' })
	}
}

//Assign students
const assignStudents = async (req, res) => {
	const { _id } = req.params
	const studentsToBeAssigned = req.body
	try {
		const mentor = await Mentors.findById(_id)

		//Update students with the mentor
		await Students.updateMany(
			{ _id: { $in: studentsToBeAssigned } },
			{ $set: { isMentorAssigned: true, assignedMentor: _id } },
			{ multi: true }
		)
		//Update mentor
		await Mentors.updateOne({ _id }, { assignedStudents: studentsToBeAssigned })
		res.status(200).send('Updated students successfully')
	} catch (error) {
		res.status(500).send('error assigning students: ' + error)
	}
}

module.exports = { createMentor, getMentors, assignStudents }
