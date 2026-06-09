import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API = 'https://memer-guru-version-2-o-1.onrender.com/api/auth'

export default function ProfilePage() {
  const { user, updateUser, logout, getToken } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [avatar, setAvatar] = useState(user?.avatar || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [profileStatus, setProfileStatus] = useState(null)
  const [passwordStatus, setPasswordStatus] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)

  const headers = { Authorization: `Bearer ${getToken()}` }

  const handleProfileSave = async () => {
    try {
      setProfileLoading(true)
      setProfileStatus(null)
      const res = await axios.put(`${API}/profile`, { name, bio, avatar }, { headers })
      updateUser(res.data)
      setProfileStatus({ type: 'success', message: '✅ Profile updated successfully!' })
    } catch (err) {
      setProfileStatus({ type: 'error', message: err.response?.data?.message || 'Update failed.' })
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) { setPasswordStatus({ type: 'error', message: 'Fill in both fields.' }); return }
    if (newPassword.length < 6) { setPasswordStatus({ type: 'error', message: 'New password must be at least 6 characters.' }); return }
    try {
      setPasswordLoading(true)
      setPasswordStatus(null)
      await axios.put(`${API}/password`, { currentPassword, newPassword }, { headers })
      setPasswordStatus({ type: 'success', message: '✅ Password changed successfully!' })
      setCurrentPassword('')
      setNewPassword('')
    } catch (err) {
      setPasswordStatus({ type: 'error', message: err.response?.data?.message || 'Failed to change password.' })
    } finally {
      setPasswordLoading(false)
    }
  }

  const StatusBar = ({ status }) => status ? (
    <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
      {status.message}
    </div>
  ) : null

  return (
    <div className='max-w-2xl mx-auto px-4 py-12 grid gap-8'>

      {/* Avatar + name header */}
      <div className='flex items-center gap-6 glass rounded-3xl p-6'>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', background: '#1e293b', flexShrink: 0 }}>
          {user?.avatar
            ? <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', background: 'linear-gradient(to right, #8B5CF6, #EC4899)' }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
          }
        </div>
        <div>
          <h1 className='text-2xl font-bold'>{user?.name}</h1>
          <p className='text-gray-400 text-sm'>{user?.email}</p>
          {user?.bio && <p className='text-gray-300 text-sm mt-1'>{user.bio}</p>}
        </div>
        <button onClick={logout} className='ml-auto px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm font-semibold'>
          Logout
        </button>
      </div>

      {/* Edit Profile */}
      <div className='glass rounded-3xl p-8'>
        <h2 className='text-2xl font-bold mb-6'>Edit Profile</h2>
        <StatusBar status={profileStatus} />
        <div className='grid gap-4'>
          <input value={name} onChange={e => setName(e.target.value)} placeholder='Full Name' className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' />
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder='Bio (optional)' className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary min-h-[80px]' />
          <input value={avatar} onChange={e => setAvatar(e.target.value)} placeholder='Avatar URL (optional)' className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' />
          {avatar && <img src={avatar} alt='avatar preview' className='w-20 h-20 rounded-full object-cover' onError={e => e.target.style.display = 'none'} />}
          <button onClick={handleProfileSave} disabled={profileLoading} className='bg-primary py-3 rounded-2xl font-semibold hover:opacity-90 transition disabled:opacity-50'>
            {profileLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Change Password — only for email users */}
      {user?.email && !user?.googleId && (
        <div className='glass rounded-3xl p-8'>
          <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
          <StatusBar status={passwordStatus} />
          <div className='grid gap-4'>
            <input value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} type='password' placeholder='Current Password' className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' />
            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type='password' placeholder='New Password' className='p-4 rounded-xl bg-surface text-white outline-none focus:ring-2 focus:ring-primary' />
            <button onClick={handlePasswordChange} disabled={passwordLoading} className='bg-primary py-3 rounded-2xl font-semibold hover:opacity-90 transition disabled:opacity-50'>
              {passwordLoading ? 'Updating...' : 'Change Password'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
