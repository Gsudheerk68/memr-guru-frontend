import express from 'express'
import multer from 'multer'
import Template from '../models/Template.js'
import { storage } from '../config/cloudinary.js'

const router = express.Router()

const upload = multer({ storage })

router.post('/upload', upload.single('media'), async (req, res) => {
  try {
    const { movie, actor, dialogue } = req.body

    if (!movie || !actor || !dialogue || !req.file) {
      return res.status(400).json({
        message: 'All fields and media file are required',
      })
    }

    const template = await Template.create({
    
      movie,
      actor,
      dialogue,
      mediaUrl: req.file.path,
      mediaType: req.file.mimetype.startsWith('video')
        ? 'video'
        : 'image',
    })

    res.status(201).json(template)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const templates = await Template.find().sort({
      createdAt: -1,
    })

    res.json(templates)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
