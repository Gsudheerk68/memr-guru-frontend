import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async () => {
    if (!name || !email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    try {
      setLoading(true)
      setError('')
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    window.location.href = 'https://memer-guru-version-2-o-1.onrender.com/api/auth/google'
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='glass rounded-3xl p-8 w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-2'>Create Account 🎭</h1>
        <p className='text-gray-400 mb-8'>Join Memers Guru and start sharing</p>

        {error && <div className='mb-4 px-4 py-3 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-sm'>{error}</div>}

        <div className='grid gap-4'>
          <input value={name} onChange={e => setName(e.target.value)} placeholder='Full Name' className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' />
          <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' />
          <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Password (min 6 chars)' className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary'
            onKeyDown={e => e.key === 'Enter' && handleRegister()} />

          <button onClick={handleRegister} disabled={loading} className='bg-primary py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50'>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className='flex items-center gap-3'>
            <div className='flex-1 h-px bg-white/10' />
            <span className='text-gray-400 text-sm'>or</span>
            <div className='flex-1 h-px bg-white/10' />
          </div>

          <button onClick={handleGoogle} className='glass py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-white/10 transition'>
            <img src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' alt='Google' width='22' />
            Continue with Google
          </button>
        </div>

        <p className='text-center text-gray-400 mt-6 text-sm'>
          Already have an account?{' '}
          <Link to='/login' className='text-primary font-semibold hover:underline'>Login</Link>
        </p>
      </div>
    </div>
  )
}
