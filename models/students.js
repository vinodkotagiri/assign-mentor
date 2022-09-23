const mongoose = require('mongoose')
const { Schema } = mongoose

const studentsSchema = new Schema(
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
		isMentorAssigned: {
			type: Boolean,
			default: false,
		},
		assignedMentor: {
			type: Schema.Types.ObjectId,
			ref: 'Mentors',
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Students', studentsSchema)
