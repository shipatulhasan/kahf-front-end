import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: 'User',
      required: true
    },
    platform: {
      type: String
    },
    url: {
      type: String
    },
    isValid: {
      type: Boolean
    }
  },
  { timestamps: true }
)
const Link = mongoose.model('Link', LinkSchema)
export default Link
