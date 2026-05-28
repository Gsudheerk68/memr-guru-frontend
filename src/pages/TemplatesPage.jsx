import { useEffect, useState } from 'react'
import TemplateCard from '../components/cards/TemplateCard'
import { getTemplates } from '../services/templateService'

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTemplates()
  }, [])

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

  const filtered = templates.filter((item) => {
    return (
      item.movie?.toLowerCase().includes(search.toLowerCase()) ||
      item.actor?.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      <div className='mb-10'>
        <h1 className='text-5xl font-black mb-6'>
          Meme Templates
        </h1>

        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by movie or actor...'
          className='w-full p-4 rounded-2xl bg-surface outline-none'
        />
      </div>

      {loading ? (
        <div className='text-center py-20 text-xl'>
          Loading Templates...
        </div>
      ) : filtered.length === 0 ? (
        <div className='text-center py-20 text-gray-400 text-xl'>
          No Templates Found
        </div>
      ) : (
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {filtered.map((template) => (
            <TemplateCard
              key={template._id || template.id}
              template={template}
            />
          ))}
        </div>
      )}
    </div>
  )
}
