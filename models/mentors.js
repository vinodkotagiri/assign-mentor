const mongoose = require('mongoose')
const { Schema } = mongoose

const mentorsSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		mobile: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		assignedStudents: {
			type: [mongoose.Types.ObjectId],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Mentors', mentorsSchema)
