import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    profile_picture: { type: String },
    email_address: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)
const User = mongoose.model('User', UserSchema)
export default User
