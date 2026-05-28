import { motion } from 'framer-motion'

export default function TemplateCard({ template }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className='bg-card rounded-3xl overflow-hidden'
    >
      {template.mediaType === 'video' ? (
        <video
          src={template.mediaUrl}
          controls
          className='w-full h-72 object-cover'
        />
      ) : (
        <img
          src={template.mediaUrl}
          alt={template.movie}
          className='w-full h-72 object-cover'
        />
      )}

      <div className='p-5'>
        <h3 className='font-bold text-xl'>
          {template.movie}
        </h3>

        <p className='text-sm text-primary mt-1'>
          {template.actor}
        </p>

        <p className='text-gray-400 mt-3 line-clamp-3'>
          {template.dialogue}
        </p>

        <div className='flex justify-between mt-4 text-sm text-gray-400'>
          <span>❤️ {template.likes || 0}</span>
          <span>👁 {template.views || 0}</span>
        </div>
      </div>
    </motion.div>
  )
}
