import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    platform: {
      type: String
    },
    link: {
      type: String
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Link', LinkSchema)
