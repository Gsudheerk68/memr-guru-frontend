import { useEffect, useState } from 'react'
import TemplateCard from '../components/cards/TemplateCard'
import { getTemplates, updateTemplate, deleteTemplate } from '../services/templateService'

const PER_PAGE_OPTIONS = [8, 12, 16, 24, 'All']

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  const [perPage, setPerPage] = useState(12)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [editForm, setEditForm] = useState({ movie: '', actor: '', dialogue: '' })
  const [editLoading, setEditLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => { fetchTemplates() }, [])

  const fetchTemplates = async () => {
    try {
      const data = await getTemplates()
      setTemplates(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditOpen = (template) => {
    setEditingTemplate(template)
    setEditForm({ movie: template.movie, actor: template.actor, dialogue: template.dialogue })
  }

  const handleEditSave = async () => {
    try {
      setEditLoading(true)
      const updated = await updateTemplate(editingTemplate._id, editForm)
      setTemplates(prev => prev.map(t => t._id === updated._id ? updated : t))
      setEditingTemplate(null)
    } catch (error) {
      console.error(error)
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setDeleteLoading(true)
      await deleteTemplate(deleteConfirm._id)
      setTemplates(prev => prev.filter(t => t._id !== deleteConfirm._id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteLoading(false)
    }
  }

  // Search filter
const searched = templates.filter(item =>
  item.movie?.toLowerCase().includes(search.toLowerCase()) ||
  item.actor?.toLowerCase().includes(search.toLowerCase()) ||
  item.dialogue?.toLowerCase().includes(search.toLowerCase())
)

  // Sort
  const sorted = [...searched].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes
    if (sortBy === 'views') return b.views - a.views
    if (sortBy === 'trending') return b.likes - a.likes
    return new Date(b.createdAt) - new Date(a.createdAt) // newest
  })

  // Paginate
  const displayed = perPage === 'All' ? sorted : sorted.slice(0, perPage)

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      <div className='mb-8'>
        <h1 className='text-5xl font-black mb-6'>Meme Templates</h1>

        {/* Search */}
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by movie or actor...'
          className='w-full p-4 rounded-2xl bg-surface outline-none mb-4'
        />

        {/* Filters row */}
        <div className='flex flex-wrap gap-3 items-center justify-between'>
          {/* Sort */}
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-400'>Sort by:</span>
            {[
              { value: 'newest', label: '🆕 Newest' },
              { value: 'trending', label: '🔥 Trending' },
              { value: 'likes', label: '❤️ Most Liked' },
              { value: 'views', label: '👁 Most Viewed' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                  sortBy === opt.value
                    ? 'bg-primary text-white'
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Per page */}
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-400'>Show:</span>
            {PER_PAGE_OPTIONS.map(n => (
              <button
                key={n}
                onClick={() => setPerPage(n)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                  perPage === n
                    ? 'bg-primary text-white'
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p className='text-sm text-gray-400 mt-3'>
            Showing {displayed.length} of {searched.length} templates
          </p>
        )}
      </div>

      {loading ? (
        <div className='text-center py-20 text-xl'>Loading Templates...</div>
      ) : displayed.length === 0 ? (
        <div className='text-center py-20 text-gray-400 text-xl'>No Templates Found</div>
      ) : (
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {displayed.map(template => (
            <TemplateCard
              key={template._id}
              template={template}
              onEdit={() => handleEditOpen(template)}
              onDelete={() => setDeleteConfirm(template)}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingTemplate && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4'>
          <div className='bg-surface rounded-3xl p-8 w-full max-w-lg'>
            <h2 className='text-2xl font-bold mb-6'>Edit Template</h2>
            <div className='grid gap-4'>
              <input
                value={editForm.movie}
                onChange={e => setEditForm({ ...editForm, movie: e.target.value })}
                placeholder='Movie Name'
                className='p-4 rounded-xl bg-background outline-none focus:ring-2 focus:ring-primary text-white'
              />
              <input
                value={editForm.actor}
                onChange={e => setEditForm({ ...editForm, actor: e.target.value })}
                placeholder='Actor Name'
                className='p-4 rounded-xl bg-background outline-none focus:ring-2 focus:ring-primary text-white'
              />
              <textarea
                value={editForm.dialogue}
                onChange={e => setEditForm({ ...editForm, dialogue: e.target.value })}
                placeholder='Dialogue'
                className='p-4 rounded-xl bg-background outline-none focus:ring-2 focus:ring-primary text-white min-h-[100px]'
              />
            </div>
            <div className='flex gap-3 mt-6'>
              <button
                onClick={handleEditSave}
                disabled={editLoading}
                className='flex-1 bg-primary py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50'
              >
                {editLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => setEditingTemplate(null)}
                className='flex-1 glass py-3 rounded-xl font-semibold hover:bg-white/10 transition'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirm && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4'>
          <div className='bg-surface rounded-3xl p-8 w-full max-w-md text-center'>
            <h2 className='text-2xl font-bold mb-3'>Delete Template?</h2>
            <p className='text-gray-400 mb-6'>
              Are you sure you want to delete <span className='text-white font-semibold'>{deleteConfirm.movie}</span>? This cannot be undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className='flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition disabled:opacity-50'
              >
                {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className='flex-1 glass py-3 rounded-xl font-semibold hover:bg-white/10 transition'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
