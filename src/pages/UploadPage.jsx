import { useState } from 'react'
import { uploadTemplate } from '../services/templateService'
import { uploadMeme } from '../services/memeService'

export default function UploadPage() {
  // Template state
  const [movie, setMovie] = useState('')
  const [actor, setActor] = useState('')
  const [dialogue, setDialogue] = useState('')
  const [templateUploadType, setTemplateUploadType] = useState('file')
  const [templateFile, setTemplateFile] = useState(null)
  const [templatePreview, setTemplatePreview] = useState(null)
  const [templateLink, setTemplateLink] = useState('')
  const [templateLoading, setTemplateLoading] = useState(false)
  const [templateStatus, setTemplateStatus] = useState(null)

  // Meme state
  const [caption, setCaption] = useState('')
  const [memeUploadType, setMemeUploadType] = useState('file')
  const [memeFile, setMemeFile] = useState(null)
  const [memePreview, setMemePreview] = useState(null)
  const [memeLink, setMemeLink] = useState('')
  const [memeLoading, setMemeLoading] = useState(false)
  const [memeStatus, setMemeStatus] = useState(null)

  const handleTemplateFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setTemplateFile(f)
    setTemplatePreview(URL.createObjectURL(f))
    setTemplateStatus(null)
  }

  const handleMemeFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setMemeFile(f)
    setMemePreview(URL.createObjectURL(f))
    setMemeStatus(null)
  }

  const handleTemplateUpload = async () => {
    if (!movie || !actor || !dialogue) { setTemplateStatus({ type: 'error', message: 'Please fill in all fields.' }); return }
    if (templateUploadType === 'file' && !templateFile) { setTemplateStatus({ type: 'error', message: 'Please select a file.' }); return }
    if (templateUploadType === 'link' && !templateLink.trim()) { setTemplateStatus({ type: 'error', message: 'Please enter a link.' }); return }

    try {
      setTemplateLoading(true)
      setTemplateStatus(null)
      const formData = new FormData()
      formData.append('movie', movie)
      formData.append('actor', actor)
      formData.append('dialogue', dialogue)
      if (templateUploadType === 'file') formData.append('media', templateFile)
      else formData.append('mediaLink', templateLink.trim())
      await uploadTemplate(formData)
      setTemplateStatus({ type: 'success', message: '🎉 Template uploaded successfully!' })
      setMovie(''); setActor(''); setDialogue(''); setTemplateFile(null); setTemplatePreview(null); setTemplateLink('')
    } catch (error) {
      setTemplateStatus({ type: 'error', message: 'Upload failed. Please try again.' })
    } finally {
      setTemplateLoading(false)
    }
  }

  const handleMemeUpload = async () => {
    if (memeUploadType === 'file' && !memeFile) { setMemeStatus({ type: 'error', message: 'Please select a file.' }); return }
    if (memeUploadType === 'link' && !memeLink.trim()) { setMemeStatus({ type: 'error', message: 'Please enter a link.' }); return }

    try {
      setMemeLoading(true)
      setMemeStatus(null)
      const formData = new FormData()
      formData.append('caption', caption)
      if (memeUploadType === 'file') formData.append('media', memeFile)
      else formData.append('mediaLink', memeLink.trim())
      await uploadMeme(formData)
      setMemeStatus({ type: 'success', message: '😂 Meme uploaded successfully!' })
      setCaption(''); setMemeFile(null); setMemePreview(null); setMemeLink('')
    } catch (error) {
      setMemeStatus({ type: 'error', message: 'Upload failed. Please try again.' })
    } finally {
      setMemeLoading(false)
    }
  }

  const StatusBar = ({ status }) => status ? (
    <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
      {status.message}
    </div>
  ) : null

  const UploadToggle = ({ type, setType, clearFile }) => (
    <div className='flex rounded-xl overflow-hidden border border-white/10'>
      <button onClick={() => { setType('file'); clearFile() }} className={`flex-1 py-3 text-sm font-semibold transition ${type === 'file' ? 'bg-primary text-white' : 'bg-surface text-gray-400 hover:text-white'}`}>
        📁 Upload File
      </button>
      <button onClick={() => setType('link')} className={`flex-1 py-3 text-sm font-semibold transition ${type === 'link' ? 'bg-primary text-white' : 'bg-surface text-gray-400 hover:text-white'}`}>
        🔗 Paste Link
      </button>
    </div>
  )

  return (
    <div className='max-w-3xl mx-auto px-4 py-12 grid gap-10'>

      {/* Template Upload */}
      <div className='glass rounded-3xl p-8'>
        <h1 className='text-3xl font-bold mb-2'>🎭 Upload Meme Template</h1>
        <p className='text-gray-400 mb-6'>Upload image/video templates for others to use</p>
        <StatusBar status={templateStatus} />
        <div className='grid gap-4'>
          <input value={movie} onChange={e => setMovie(e.target.value)} className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' placeholder='Movie Name' />
          <input value={actor} onChange={e => setActor(e.target.value)} className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' placeholder='Actor Name' />
          <textarea value={dialogue} onChange={e => setDialogue(e.target.value)} className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary min-h-[100px]' placeholder='Dialogue' />
          <UploadToggle type={templateUploadType} setType={setTemplateUploadType} clearFile={() => { setTemplateFile(null); setTemplatePreview(null) }} />
          {templateUploadType === 'file' ? (
            <label className='border-2 border-dashed border-primary rounded-2xl p-8 text-center cursor-pointer hover:bg-white/5 transition'>
              <p className='font-semibold'>{templateFile ? templateFile.name : 'Upload Image or Video'}</p>
              <p className='text-sm text-gray-400 mt-1'>{templateFile ? `${(templateFile.size / 1024 / 1024).toFixed(2)} MB` : 'Click to browse'}</p>
              <input type='file' accept='image/*,video/*' hidden onChange={handleTemplateFile} />
            </label>
          ) : (
            <input value={templateLink} onChange={e => setTemplateLink(e.target.value)} className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' placeholder='https://example.com/image.jpg or YouTube link' />
          )}
          {templatePreview && (
            templateFile?.type.startsWith('video')
              ? <video src={templatePreview} controls className='rounded-2xl w-full h-56 object-cover' />
              : <img src={templatePreview} alt='preview' className='rounded-2xl w-full h-56 object-cover' />
          )}
          {templateUploadType === 'link' && templateLink && (
            /\.(mp4|webm|ogg|mov)$/i.test(templateLink)
              ? <video src={templateLink} controls className='rounded-2xl w-full h-56 object-cover' />
              : <img src={templateLink} alt='preview' className='rounded-2xl w-full h-56 object-cover' onError={e => e.target.style.display = 'none'} />
          )}
          <button onClick={handleTemplateUpload} disabled={templateLoading} className='bg-primary hover:opacity-90 transition rounded-2xl py-4 font-semibold text-lg disabled:opacity-50'>
            {templateLoading ? '⏳ Uploading...' : 'Upload Template'}
          </button>
        </div>
      </div>

      {/* Meme Upload */}
      <div className='glass rounded-3xl p-8'>
        <h1 className='text-3xl font-bold mb-2'>😂 Upload Your Meme</h1>
        <p className='text-gray-400 mb-6'>Share your memes with the community</p>
        <StatusBar status={memeStatus} />
        <div className='grid gap-4'>
          <input value={caption} onChange={e => setCaption(e.target.value)} className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' placeholder='Caption (optional)' />
          <UploadToggle type={memeUploadType} setType={setMemeUploadType} clearFile={() => { setMemeFile(null); setMemePreview(null) }} />
          {memeUploadType === 'file' ? (
            <label className='border-2 border-dashed border-primary rounded-2xl p-8 text-center cursor-pointer hover:bg-white/5 transition'>
              <p className='font-semibold'>{memeFile ? memeFile.name : 'Upload Meme Image or Video'}</p>
              <p className='text-sm text-gray-400 mt-1'>{memeFile ? `${(memeFile.size / 1024 / 1024).toFixed(2)} MB` : 'Click to browse'}</p>
              <input type='file' accept='image/*,video/*' hidden onChange={handleMemeFile} />
            </label>
          ) : (
            <input value={memeLink} onChange={e => setMemeLink(e.target.value)} className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' placeholder='https://example.com/meme.jpg or YouTube link' />
          )}
          {memePreview && (
            memeFile?.type.startsWith('video')
              ? <video src={memePreview} controls className='rounded-2xl w-full h-56 object-cover' />
              : <img src={memePreview} alt='preview' className='rounded-2xl w-full h-56 object-cover' />
          )}
          {memeUploadType === 'link' && memeLink && (
            /\.(mp4|webm|ogg|mov)$/i.test(memeLink)
              ? <video src={memeLink} controls className='rounded-2xl w-full h-56 object-cover' />
              : <img src={memeLink} alt='preview' className='rounded-2xl w-full h-56 object-cover' onError={e => e.target.style.display = 'none'} />
          )}
          <button onClick={handleMemeUpload} disabled={memeLoading} className='bg-secondary hover:opacity-90 transition rounded-2xl py-4 font-semibold text-lg disabled:opacity-50'>
            {memeLoading ? '⏳ Uploading...' : 'Upload Meme'}
          </button>
        </div>
      </div>

    </div>
  )
}
