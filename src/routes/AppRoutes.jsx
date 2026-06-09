import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import TemplatesPage from '../pages/TemplatesPage'
import MemesPage from '../pages/MemesPage'
import UploadPage from '../pages/UploadPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import AuthCallbackPage from '../pages/AuthCallbackPage'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className='min-h-screen flex items-center justify-center text-xl'>Loading...</div>
  if (!user) return <Navigate to='/login' />
  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/auth/callback' element={<AuthCallbackPage />} />
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/templates' element={<TemplatesPage />} />
        <Route path='/memes' element={<MemesPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/upload' element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}
