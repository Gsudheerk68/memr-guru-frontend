import { useState } from 'react'
import { motion } from 'framer-motion'
import { likeTemplate, viewTemplate } from '../../services/templateService'
import { useAuth } from '../../context/AuthContext'

const getYouTubeInfo = (url) => {
  const match = url.match(/(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (!match) return null
  const id = match[1]
  return {
    id,
    thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    watchUrl: `https://www.youtube.com/shorts/${id}`,
  }
}

const isCloudinaryVideo = (url) => {
  return url.includes('res.cloudinary.com') && (url.includes('/video/') || /\.(mp4|webm|ogg|mov)$/i.test(url))
}

export default function TemplateCard({ template, onEdit, onDelete }) {
  const { user } = useAuth()
  const [likes, setLikes] = useState(template.likes || 0)
  const [views, setViews] = useState(template.views || 0)
  const [liked, setLiked] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
console.log('uploadedBy:', template.uploadedBy)
  console.log('currentUser:', currentUser)

  // Check if current user is the template owner
  const isOwner = user && (user._id === template.userId || user._id === template.createdBy)

  const handleLike = async (e) => {
    e.stopPropagation()
    if (liked || likeLoading) return
    try {
      setLikeLoading(true)
      const updated = await likeTemplate(template._id)
      setLikes(updated.likes)
      setLiked(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLikeLoading(false)
    }
  }

  const handleView = async () => {
    try {
      const updated = await viewTemplate(template._id)
      setViews(updated.views)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDownload = async () => {
    const ytInfo = getYouTubeInfo(template.mediaUrl)
    if (ytInfo) { window.open(ytInfo.watchUrl, '_blank'); return }
    try {
      setDownloading(true)
      const response = await fetch(template.mediaUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const ext = template.mediaType === 'video' ? 'mp4' : 'jpg'
      const filename = `${template.movie.replace(/\s+/g, '_')}_${template.actor.replace(/\s+/g, '_')}.${ext}`
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = filename
      a.click()
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error(error)
    } finally {
      setDownloading(false)
    }
  }

  const handleMediaClick = () => {
    handleView()
    setFullscreen(true)
  }

  const url = template.mediaUrl || ''
  const ytInfo = getYouTubeInfo(url)

  const renderMedia = () => {
    if (ytInfo) {
      return (
        <div onClick={handleMediaClick} style={{ position: 'relative', width: '100%', aspectRatio: '9/16', cursor: 'pointer' }}>
          <img src={ytInfo.thumbnail} alt={template.movie} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.src = `https://img.youtube.com/vi/${ytInfo.id}/mqdefault.jpg` }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='white'><path d='M8 5v14l11-7z' /></svg>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', borderRadius: '6px', padding: '2px 8px', fontSize: '11px', color: 'white' }}>▶ YouTube</div>
        </div>
      )
    }

    if (template.mediaType === 'video' || isCloudinaryVideo(url)) {
      return (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16' }}>
          <video src={url} controls playsInline preload='metadata' onPlay={handleView} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000' }} />
          <button onClick={handleMediaClick} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', border: 'none', color: 'white', borderRadius: '8px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer' }}>⛶ Fullscreen</button>
        </div>
      )
    }

    return (
      <div onClick={handleMediaClick} style={{ width: '100%', aspectRatio: '9/16', cursor: 'pointer', overflow: 'hidden' }}>
        <img src={url} alt={template.movie} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    )
  }

  return (
    <>
      <motion.div whileHover={{ y: -5 }} className='rounded-3xl overflow-hidden border border-white/10' style={{ background: '#1e293b' }}>
        {renderMedia()}
        <div className='p-5'>
          <h3 className='font-bold text-xl text-white'>{template.movie}</h3>
          <p className='text-sm text-purple-400 mt-1'>{template.actor}</p>
          <p className='text-gray-400 mt-3 line-clamp-3'>{template.dialogue}</p>
          <div className='flex justify-between mt-4 text-sm text-gray-400'>
            <button onClick={handleLike} disabled={liked || likeLoading} className={`flex items-center gap-1 transition ${liked ? 'text-red-400' : 'hover:text-red-400'}`}>
              {liked ? '❤️' : '🤍'} {likes}
            </button>
            <span>👁 {views}</span>
          </div>
          
          {/* Only show Edit/Delete buttons if user is the template owner */}
          {isOwner && (
            <div className='flex gap-2 mt-4'>
              <button onClick={onEdit} className='flex-1 py-2 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition text-sm font-semibold'>✏️ Edit</button>
              <button onClick={onDelete} className='flex-1 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm font-semibold'>🗑️ Delete</button>
            </div>
          )}
          
          <button onClick={handleDownload} disabled={downloading} className='w-full mt-2 py-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition text-sm font-semibold disabled:opacity-50'>
            {downloading ? '⏳ Downloading...' : '⬇️ Download'}
          </button>
        </div>
      </motion.div>

      {fullscreen && (
        <FullscreenViewer
          media={{ url: template.mediaUrl, type: template.mediaType }}
          caption={`${template.movie} • ${template.actor} — "${template.dialogue}"`}
          onClose={() => setFullscreen(false)}
        />
      )}
    </>
  )
}
