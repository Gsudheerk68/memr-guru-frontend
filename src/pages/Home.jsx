import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>

      <section className="min-h-[90vh] flex items-center justify-center">

        <div className="text-center">

          <motion.h1
            initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
            className="text-7xl font-bold"
          >
            Create Viral Memes
          </motion.h1>

          <p className="text-slate-400 mt-6 text-xl">
            Largest meme template library for Indian Memers
          </p>

          <button className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600">
            Explore Templates
          </button>

        </div>

      </section>

    </div>
  );
}
