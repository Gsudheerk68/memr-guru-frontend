import axios from 'axios'

<<<<<<< HEAD
const API = 'const API = 'https://memer-guru-version-2-o-1.onrender.com/api/memes''

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
})
=======
const API = `${import.meta.env.VITE_API_URL}/api/memes`
>>>>>>> f73a6c8795ef10aed46b6f4118506471efa36170

export const getMemes = async () => {
  const res = await axios.get(API)
  return res.data
}

export const uploadMeme = async (formData) => {
<<<<<<< HEAD
  const res = await axios.post(`${API}/upload`, formData, { headers: authHeaders() })
=======
  const res = await axios.post(`${API}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'  // ✅ added
    }
  })
>>>>>>> f73a6c8795ef10aed46b6f4118506471efa36170
  return res.data
}

export const likeMeme = async (id) => {
  const res = await axios.post(`${API}/${id}/like`)
  return res.data
}

export const viewMeme = async (id) => {
  const res = await axios.post(`${API}/${id}/view`)
  return res.data
}

export const deleteMeme = async (id) => {
<<<<<<< HEAD
  const res = await axios.delete(`${API}/${id}`, { headers: authHeaders() })
=======
  const res = await axios.delete(`${API}/${id}`)
>>>>>>> f73a6c8795ef10aed46b6f4118506471efa36170
  return res.data
}
