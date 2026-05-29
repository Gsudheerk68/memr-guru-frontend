import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'memers-guru',
    allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'webm'],
    resource_type: 'auto',
    transformation: [
      { width: 1080, height: 1920, crop: 'fill', gravity: 'auto' }
    ],
  },
})

export { cloudinary }
