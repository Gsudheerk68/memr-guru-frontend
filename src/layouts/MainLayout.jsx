
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main className='pt-24'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
