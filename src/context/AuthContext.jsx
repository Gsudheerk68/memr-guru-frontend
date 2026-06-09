import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const API = 'https://memer-guru-version-2-o-1.onrender.com/api/auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      axios
        .get(`${API}/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          setUser(res.data)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  // Login
  const login = async (email, password) => {
    const res = await axios.post(`${API}/login`, {
      email,
      password
    })

    localStorage.setItem('token', res.data.token)
    setUser(res.data)

    return res.data
  }

  // Register
  const register = async (name, email, password) => {
    const res = await axios.post(`${API}/register`, {
      name,
      email,
      password
    })

    localStorage.setItem('token', res.data.token)
    setUser(res.data)

    return res.data
  }

  // Google Login
  const googleLogin = () => {
    window.location.href =
      'https://memer-guru-version-2-o-1.onrender.com/api/auth/google'
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  // Update User
  const updateUser = (updatedUser) => {
    setUser(updatedUser)
  }

  // Get Token
  const getToken = () => {
    return localStorage.getItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        googleLogin,
        logout,
        updateUser,
        getToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
