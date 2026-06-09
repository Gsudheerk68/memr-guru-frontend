import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AuthCallbackPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      localStorage.setItem('token', token)
      window.location.href = '/'
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <p className='text-xl'>Logging you in...</p>
    </div>
  )
}
