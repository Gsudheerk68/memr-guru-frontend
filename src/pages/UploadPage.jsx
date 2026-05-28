import { useState } from 'react'
import { uploadTemplate } from '../services/templateService'

export default function UploadPage() {
  const [movie, setMovie] = useState('')
  const [actor, setActor] = useState('')
  const [dialogue, setDialogue] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    if (!selectedFile) return

    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
  }

  const handleUpload = async () => {
    if (!movie || !actor || !dialogue || !file) {
      alert('Please fill all fields')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append('movie', movie)
      formData.append('actor', actor)
      formData.append('dialogue', dialogue)
      formData.append('media', file)

      await uploadTemplate(formData)

      alert('Upload Successful')

      setMovie('')
      setActor('')
      setDialogue('')
      setFile(null)
      setPreview(null)

      window.location.href = '/templates'
    } catch (error) {
      console.log(error)
      alert('Upload Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-3xl mx-auto px-4 py-12'>
      <div className='glass rounded-3xl p-8'>
        <h1 className='text-4xl font-bold mb-8'>
          Upload Meme Template
        </h1>

        <div className='grid gap-6'>
          <input
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            className='p-4 rounded-xl bg-surface text-white outline-none'
            placeholder='Movie Name'
          />

          <input
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            className='p-4 rounded-xl bg-surface text-white outline-none'
            placeholder='Actor Name'
          />

          <textarea
            value={dialogue}
            onChange={(e) => setDialogue(e.target.value)}
            className='p-4 rounded-xl bg-surface text-white outline-none min-h-[120px]'
            placeholder='Dialogue'
          />

          <label className='border-2 border-dashed border-primary rounded-2xl p-10 text-center cursor-pointer hover:bg-white/5 transition'>
            <div className='space-y-2'>
              <p className='text-lg font-semibold'>
                Upload Image or Video
              </p>

              <p className='text-sm text-gray-400'>
                Click to browse files
              </p>
            </div>

            <input
              type='file'
              accept='image/*,video/*'
              hidden
              onChange={handleFileChange}
            />
          </label>

          {preview && (
            file.type.startsWith('video') ? (
              <video
                src={preview}
                controls
                className='rounded-2xl h-96 w-full object-cover'
              />
            ) : (
              <img
                src={preview}
                alt='preview'
                className='rounded-2xl h-96 w-full object-cover'
              />
            )
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className='bg-primary hover:opacity-90 transition rounded-2xl py-4 font-semibold text-lg'
          >
            {loading ? 'Uploading...' : 'Upload Template'}
          </button>
        </div>
      </div>
    </div>
  )
}
