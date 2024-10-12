import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    profile_picture: { type: String },
    email_address: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)
module.exports = mongoose.model('User', UserSchema)
