
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className='fixed top-0 left-0 right-0 glass z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between p-4'>
        <Link to='/' className='text-3xl font-bold gradient-text'>
          Memers Guru
        </Link>

        <nav className='flex gap-6'>
          <Link to='/'>Home</Link>
          <Link to='/templates'>Templates</Link>
          <Link to='/upload'>Upload</Link>
        </nav>
      </div>
    </header>
  )
}
