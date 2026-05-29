import axios from 'axios'

const API = 'http://localhost:5000/api/memes'

export const getMemes = async () => {
  const res = await axios.get(API)
  return res.data
}

export const uploadMeme = async (formData) => {
  const res = await axios.post(`${API}/upload`, formData)
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
