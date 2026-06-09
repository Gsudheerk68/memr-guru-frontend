
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


import { Link } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className='fixed top-0 left-0 right-0 glass z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between p-4'>

        <Link to='/' className='text-3xl font-bold gradient-text'>Memers Guru</Link>
        <nav className='flex items-center gap-6'>
          <Link to='/'>Home</Link>
          <Link to='/templates'>Templates</Link>
          <Link to='/memes'>Memes</Link>
          {user && <Link to='/upload'>Upload</Link>}
          {user ? (
            <div className='flex items-center gap-3'>
              <Link to='/profile' className='flex items-center gap-2'>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(to right, #8B5CF6, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {user.avatar
                    ? <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : user.name?.charAt(0).toUpperCase()
                  }
                </div>
                <span className='text-sm font-semibold'>{user.name?.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout} className='px-3 py-1 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm font-semibold'>
                Logout
              </button>
            </div>
          ) : (
            <Link to='/login' className='bg-primary px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition text-sm'>
              Login
            </Link>
          )}

        <Link to='/' className='text-3xl font-bold gradient-text'>
          Memers Guru
        </Link>
        <nav className='flex gap-6'>
          <Link to='/'>Home</Link>
          <Link to='/templates'>Templates</Link>
          <Link to='/memes'>Memes</Link>
          <Link to='/upload'>Upload</Link>

        </nav>
      </div>
    </header>
  )
}
