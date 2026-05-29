import axios from 'axios'

const API = `${import.meta.env.VITE_API_URL}/api/memes`

export const getMemes = async () => {
  const res = await axios.get(API)
  return res.data
}

export const uploadMeme = async (formData) => {
  const res = await axios.post(`${API}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'  // ✅ added
    }
  })
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
  const res = await axios.delete(`${API}/${id}`)
  return res.data
}
