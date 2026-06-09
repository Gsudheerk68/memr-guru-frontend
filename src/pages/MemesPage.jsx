import { useEffect, useState, useRef } from 'react'
import { getMemes, likeMeme, viewMeme, deleteMeme } from '../services/memeService'

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

// ─── Grid Card ───────────────────────────────────────────────
function MemeCard({ meme, onDelete }) {
  const [likes, setLikes] = useState(meme.likes || 0)
  const [views, setViews] = useState(meme.views || 0)
  const [liked, setLiked] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleLike = async () => {
    if (liked) return
    const updated = await likeMeme(meme._id)
    setLikes(updated.likes)
    setLiked(true)
  }

  const handleView = async () => {
    const updated = await viewMeme(meme._id)
    setViews(updated.views)
  }

  const handleDownload = async () => {
    const ytInfo = getYouTubeInfo(meme.mediaUrl)
    if (ytInfo) { window.open(ytInfo.watchUrl, '_blank'); return }
    try {
      setDownloading(true)
      const response = await fetch(meme.mediaUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const ext = meme.mediaType === 'video' ? 'mp4' : 'jpg'
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `meme_${meme._id}.${ext}`
      a.click()
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error(error)
    } finally {
      setDownloading(false)
    }
  }

  const renderMedia = () => {
    const url = meme.mediaUrl || ''
    const ytInfo = getYouTubeInfo(url)
    if (ytInfo) {
      return (
        <div style={{ position: 'relative', width: '100%', height: '280px' }}>
          <img src={ytInfo.thumbnail} alt='meme' style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <a href={ytInfo.watchUrl} target='_blank' rel='noreferrer' onClick={handleView} style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width='28' height='28' viewBox='0 0 24 24' fill='white'><path d='M8 5v14l11-7z' /></svg>
            </a>
          </div>
        </div>
      )
    }
    if (meme.mediaType === 'video') {
      return <video src={url} controls playsInline preload='metadata' onPlay={handleView} style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block', background: '#000' }} />
    }
    return <img src={url} alt='meme' onClick={handleView} style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block', cursor: 'pointer' }} />
  }

  return (
    <div className='rounded-3xl overflow-hidden border border-white/10' style={{ background: '#1e293b' }}>
      {renderMedia()}
      <div className='p-4'>
        {meme.caption && <p className='text-white font-semibold mb-3 line-clamp-2'>{meme.caption}</p>}
        <div className='flex justify-between text-sm text-gray-400 mb-3'>
          <button onClick={handleLike} className={`flex items-center gap-1 transition ${liked ? 'text-red-400' : 'hover:text-red-400'}`}>
            {liked ? '❤️' : '🤍'} {likes}
          </button>
          <span>👁 {views}</span>
        </div>
        <div className='flex gap-2'>
          <button onClick={handleDownload} disabled={downloading} className='flex-1 py-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition text-sm font-semibold'>
            {downloading ? '⏳...' : '⬇️ Download'}
          </button>
          <button onClick={() => onDelete(meme._id)} className='flex-1 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm font-semibold'>
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Reel Card ────────────────────────────────────────────────
function ReelCard({ meme, onDelete, isActive }) {
  const [likes, setLikes] = useState(meme.likes || 0)
  const [views, setViews] = useState(meme.views || 0)
  const [liked, setLiked] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return
    if (isActive) {
      videoRef.current.play().catch(() => {})
      handleView()
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  const handleLike = async () => {
    if (liked) return
    const updated = await likeMeme(meme._id)
    setLikes(updated.likes)
    setLiked(true)
  }

  const handleView = async () => {
    const updated = await viewMeme(meme._id)
    setViews(updated.views)
  }

  const handleDownload = async () => {
    const ytInfo = getYouTubeInfo(meme.mediaUrl)
    if (ytInfo) { window.open(ytInfo.watchUrl, '_blank'); return }
    try {
      setDownloading(true)
      const response = await fetch(meme.mediaUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const ext = meme.mediaType === 'video' ? 'mp4' : 'jpg'
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `meme_${meme._id}.${ext}`
      a.click()
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error(error)
    } finally {
      setDownloading(false)
    }
  }

  const ytInfo = getYouTubeInfo(meme.mediaUrl)

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      position: 'relative',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      scrollSnapAlign: 'start',
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      {/* 9:16 media container centered */}
      <div style={{
        position: 'relative',
        height: '100vh',
        width: 'calc(100vh * 9 / 16)',
        maxWidth: '100vw',
        background: '#111',
        overflow: 'hidden',
      }}>
        {ytInfo ? (
          <>
            <img
              src={ytInfo.thumbnail}
              alt='meme'
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <a href={ytInfo.watchUrl} target='_blank' rel='noreferrer' style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width='36' height='36' viewBox='0 0 24 24' fill='white'><path d='M8 5v14l11-7z' /></svg>
              </a>
            </div>
          </>
        ) : meme.mediaType === 'video' ? (
          <video
            ref={videoRef}
            src={meme.mediaUrl}
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <img
            src={meme.mediaUrl}
            alt='meme'
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}

        {/* Bottom gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }} />

        {/* Caption */}
        {meme.caption && (
          <div style={{ position: 'absolute', bottom: '90px', left: '16px', right: '80px' }}>
            <p style={{ color: 'white', fontSize: '15px', fontWeight: '600', lineHeight: '1.4', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
              {meme.caption}
            </p>
          </div>
        )}

        {/* Action buttons — inside 9:16 frame on the right */}
        <div style={{ position: 'absolute', right: '12px', bottom: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <button onClick={handleLike} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: '30px' }}>{liked ? '❤️' : '🤍'}</span>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: '600', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{likes}</span>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '26px' }}>👁</span>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: '600', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{views}</span>
          </div>

          <button onClick={handleDownload} disabled={downloading} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: '26px' }}>⬇️</span>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: '600', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>Save</span>
          </button>

          <button onClick={() => onDelete(meme._id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: '26px' }}>🗑️</span>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: '600', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
// ─── Main Page ────────────────────────────────────────────────
export default function MemesPage() {
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid') // 'grid' | 'reel'
  const [activeReel, setActiveReel] = useState(0)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const reelContainerRef = useRef(null)

  useEffect(() => { fetchMemes() }, [])

  const fetchMemes = async () => {
    try {
      const data = await getMemes()
      setMemes(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Detect which reel is active using scroll
  useEffect(() => {
    const container = reelContainerRef.current
    if (!container) return
    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight)
      setActiveReel(index)
    }
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [view])

  const handleDelete = async () => {
    try {
      setDeleteLoading(true)
      await deleteMeme(deleteConfirm)
      setMemes(prev => prev.filter(m => m._id !== deleteConfirm))
      setDeleteConfirm(null)
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteLoading(false)
    }
  }

  const filtered = memes.filter(m =>
    m.caption?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header — hidden in reel mode */}
      {view === 'grid' && (
        <div className='max-w-7xl mx-auto px-4 py-10'>
          <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
            <div>
              <h1 className='text-5xl font-black'>😂 Memes</h1>
              <p className='text-gray-400 mt-1'>Community uploaded memes</p>
            </div>
            {/* View Toggle */}
            <div className='flex gap-2 glass p-1 rounded-2xl'>
              <button
                onClick={() => setView('grid')}
                className={`px-5 py-2 rounded-xl font-semibold text-sm transition ${view === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
              >
                ▦ Grid
              </button>
              <button
                onClick={() => setView('reel')}
                className={`px-5 py-2 rounded-xl font-semibold text-sm transition ${view === 'reel' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
              >
                ▶ Reels
              </button>
            </div>
          </div>

          <input
            type='text'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search by caption...'
            className='w-full p-4 rounded-2xl bg-surface outline-none mb-4'
          />
          {!loading && <p className='text-sm text-gray-400 mb-6'>Showing {filtered.length} memes</p>}

          {loading ? (
            <div className='text-center py-20 text-xl'>Loading Memes...</div>
          ) : filtered.length === 0 ? (
            <div className='text-center py-20 text-gray-400 text-xl'>No Memes Found</div>
          ) : (
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {filtered.map(meme => (
                <MemeCard key={meme._id} meme={meme} onDelete={setDeleteConfirm} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reel Mode */}
      {view === 'reel' && (
        <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 100 }}>
          {/* Back + toggle */}
          <div style={{ position: 'fixed', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', zIndex: 200 }}>
            <button
              onClick={() => setView('grid')}
              style={{ background: 'rgba(0,0,0,0.6)', border: 'none', color: 'white', borderRadius: '12px', padding: '8px 16px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
            >
              ← Back to Grid
            </button>
            <div style={{ background: 'rgba(0,0,0,0.6)', borderRadius: '12px', padding: '4px', display: 'flex', gap: '4px' }}>
              <button onClick={() => setView('grid')} style={{ background: view === 'grid' ? '#8B5CF6' : 'transparent', border: 'none', color: 'white', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>▦ Grid</button>
              <button onClick={() => setView('reel')} style={{ background: view === 'reel' ? '#8B5CF6' : 'transparent', border: 'none', color: 'white', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>▶ Reels</button>
            </div>
          </div>

          {/* Scrollable reels */}
          <div
            ref={reelContainerRef}
            style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
          >
            {filtered.map((meme, index) => (
              <ReelCard
                key={meme._id}
                meme={meme}
                onDelete={setDeleteConfirm}
                isActive={index === activeReel}
              />
            ))}
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4'>
          <div className='bg-surface rounded-3xl p-8 w-full max-w-md text-center'>
            <h2 className='text-2xl font-bold mb-3'>Delete Meme?</h2>
            <p className='text-gray-400 mb-6'>This cannot be undone.</p>
            <div className='flex gap-3'>
              <button onClick={handleDelete} disabled={deleteLoading} className='flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition disabled:opacity-50'>
                {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button onClick={() => setDeleteConfirm(null)} className='flex-1 glass py-3 rounded-xl font-semibold'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
