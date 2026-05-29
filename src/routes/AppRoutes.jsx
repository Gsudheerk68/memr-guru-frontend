import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import TemplatesPage from '../pages/TemplatesPage'
import UploadPage from '../pages/UploadPage'
import MemesPage from '../pages/MemesPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/templates' element={<TemplatesPage />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/memes' element={<MemesPage />} />
      </Route>
    </Routes>
  )
}
