import mongoose from 'mongoose'

const templateSchema = new mongoose.Schema({
  movie: String,
  actor: String,
  dialogue: String,
  mediaUrl: String,
  mediaType: String,
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Template', templateSchema)
