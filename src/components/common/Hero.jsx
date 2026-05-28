
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className='py-32 text-center px-4'>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-6xl font-black'
      >
        Find The Perfect
        <span className='gradient-text block'>
          Meme Template Instantly
        </span>
      </motion.h1>

      <div className='mt-8 flex justify-center gap-4'>
        <button className='bg-primary px-6 py-4 rounded-2xl'>
          Explore Templates
        </button>

        <button className='glass px-6 py-4 rounded-2xl'>
          Upload Template
        </button>
      </div>
    </section>
  )
}
