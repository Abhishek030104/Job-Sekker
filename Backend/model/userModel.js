import mongoose from 'mongoose'
import validator from 'validator'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Provide Your Name'],
    },
    email: {
      type: String,
      required: [true, 'Please Provide Your Email'],
      validator: [validator.isEmail, 'Please Provide a Valid Email'],
    },
    phone: {
      type: Number,
      required: [true, 'Provide Your Phone Number'],
    },
    password: {
      type: String,
      required: [true, 'Must Procide Password'],
      minLength: [6, 'Passowrd Must Contains Minimum 6 Characters'],
    },
    role: {
      type: String,
      required: [true, 'Please Provide Role'],
      enum: ['Job Seeker', 'Employer'],
    },
  },
  { timestamps: true },
)

export default mongoose.model('User', UserSchema)
