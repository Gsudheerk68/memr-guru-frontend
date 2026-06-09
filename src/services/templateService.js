import axios from 'axios'

const API = 'http://localhost:5000/api/templates'

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

export const getTemplates = async () => {
  const res = await axios.get(API)
  return res.data
}

export const uploadTemplate = async (formData) => {
  const res = await axios.post(`${API}/upload`, formData, { headers: authHeaders() })
  return res.data
}

export const updateTemplate = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data, { headers: authHeaders() })
  return res.data
}

export const deleteTemplate = async (id) => {
  const res = await axios.delete(`${API}/${id}`, { headers: authHeaders() })
  return res.data
}

export const likeTemplate = async (id) => {
  const res = await axios.post(`${API}/${id}/like`)
  return res.data
}

export const viewTemplate = async (id) => {
  const res = await axios.post(`${API}/${id}/view`)
  return res.data
}
