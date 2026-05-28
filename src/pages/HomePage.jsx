
import Hero from '../components/common/Hero'
import TemplateCard from '../components/cards/TemplateCard'
import templates from '../data/templates'

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className='max-w-7xl mx-auto px-4 py-12'>
        <h2 className='text-4xl font-bold mb-8'>Trending Templates</h2>

        <div className='grid md:grid-cols-4 gap-6'>
          {templates.slice(0, 8).map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>
    </div>
  )
}
