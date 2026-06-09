import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/common/Hero'
import TemplateCard from '../components/cards/TemplateCard'
import { getTemplates } from '../services/templateService'

export default function HomePage() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [trendingCount, setTrendingCount] = useState(8)

  useEffect(() => {
    getTemplates()
      .then(data => {
        // Sort by likes + views combined score
        const sorted = data.sort((a, b) => b.likes - a.likes)
        setTemplates(sorted)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = (id) => {
    setTemplates(prev => prev.filter(t => t._id !== id))
  }

  return (
    <div>
      <Hero />
      <section className='max-w-7xl mx-auto px-4 py-12'>
        <div className='flex flex-wrap items-center justify-between gap-4 mb-8'>
          <h2 className='text-4xl font-bold'>🔥 Trending Templates</h2>
          <div className='flex items-center gap-3'>
            {/* Trending count filter */}
            <div className='flex items-center gap-2 glass px-4 py-2 rounded-xl'>
              <span className='text-sm text-gray-400'>Show</span>
              {[4, 8, 12, 16].map(n => (
                <button
                  key={n}
                  onClick={() => setTrendingCount(n)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                    trendingCount === n
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <Link to='/templates' className='text-primary hover:opacity-80 transition font-semibold'>
              View All →
            </Link>
          </div>
        </div>

        {loading ? (
          <div className='text-center py-20 text-xl'>Loading Templates...</div>
        ) : templates.length === 0 ? (
          <div className='text-center py-20 text-gray-400 text-xl'>
            No templates yet.{' '}
            <Link to='/upload' className='text-primary underline'>Upload the first one!</Link>
          </div>
        ) : (
          <>
            <div className='grid md:grid-cols-4 gap-6'>
              {templates.slice(0, trendingCount).map(template => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  onEdit={() => {}}
                  onDelete={() => handleDelete(template._id)}
                />
              ))}
            </div>
            <div className='text-center mt-10'>
              <Link
                to='/templates'
                className='bg-primary px-8 py-3 rounded-2xl font-semibold hover:opacity-90 transition inline-block'
              >
                View All Templates
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
