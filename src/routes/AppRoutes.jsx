
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import TemplatesPage from '../pages/TemplatesPage'
import UploadPage from '../pages/UploadPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='templates' element={<TemplatesPage />} />
        <Route path='upload' element={<UploadPage />} />
      </Route>
    </Routes>
  )
}
