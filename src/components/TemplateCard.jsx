import { motion } from 'framer-motion'

const getYouTubeInfo = (url) => {
  const match = url.match(
    /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  if (!match) return null
  const id = match[1]
  return {
    id,
    thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    watchUrl: `https://www.youtube.com/shorts/${id}`,
  }
}

export default function TemplateCard({ template, onEdit, onDelete }) {
  const renderMedia = () => {
    if (template.mediaType === 'video') {
      const ytInfo = getYouTubeInfo(template.mediaUrl)

      if (ytInfo) {
        return (
          <div style={{ position: 'relative', width: '100%', height: '280px' }}>
            <img
              src={ytInfo.thumbnail}
              alt={template.movie}
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.src = `https://img.youtube.com/vi/${ytInfo.id}/mqdefault.jpg` }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              
                href={ytInfo.watchUrl}
                target='_blank'
                rel='noreferrer'
                style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(255,0,0,0.9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width='28' height='28' viewBox='0 0 24 24' fill='white'>
                  <path d='M8 5v14l11-7z' />
                </svg>
              </a>
            </div>
            <div style={{
              position: 'absolute', bottom: '8px', right: '8px',
              background: 'rgba(0,0,0,0.7)', borderRadius: '6px',
              padding: '2px 8px', fontSize: '11px', color: 'white'
            }}>
              ▶ YouTube
            </div>
          </div>
        )
      }

      return (
        <video
          src={template.mediaUrl}
          controls
          style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
        />
      )
    }

    return (
      <img
        src={template.mediaUrl}
        alt={template.movie}
        style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
      />
    )
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className='rounded-3xl overflow-hidden border border-white/10'
      style={{ background: '#1e293b' }}
    >
      {renderMedia()}

      <div className='p-5'>
        <h3 className='font-bold text-xl text-white'>{template.movie}</h3>
        <p className='text-sm text-purple-400 mt-1'>{template.actor}</p>
        <p className='text-gray-400 mt-3 line-clamp-3'>{template.dialogue}</p>
        <div className='flex justify-between mt-4 text-sm text-gray-400'>
          <span>❤️ {template.likes || 0}</span>
          <span>👁 {template.views || 0}</span>
        </div>
        <div className='flex gap-2 mt-4'>
          <button
            onClick={onEdit}
            className='flex-1 py-2 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition text-sm font-semibold'
          >
            ✏️ Edit
          </button>
          <button
            onClick={onDelete}
            className='flex-1 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm font-semibold'
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </motion.div>
  )
}
