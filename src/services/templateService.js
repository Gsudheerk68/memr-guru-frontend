import axios from 'axios'

const API = `${import.meta.env.VITE_API_URL}/api/templates`

export const getTemplates = async () => {
  const res = await axios.get(API)
  return res.data
}

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

export const getTemplates = async () => {
  const res = await axios.get(API)
  return res.data
}

export const uploadTemplate = async (formData) => {
<<<<<<< HEAD
  const res = await axios.post(`${API}/upload`, formData, { headers: authHeaders() })
=======
  const res = await axios.post(`${API}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'  // ✅ add this
    }
  })
>>>>>>> f73a6c8795ef10aed46b6f4118506471efa36170
  return res.data
}

export const updateTemplate = async (id, data) => {
<<<<<<< HEAD
  const res = await axios.put(`${API}/${id}`, data, { headers: authHeaders() })
=======
  const res = await axios.put(`${API}/${id}`, data)
>>>>>>> f73a6c8795ef10aed46b6f4118506471efa36170
  return res.data
}

export const deleteTemplate = async (id) => {
<<<<<<< HEAD
  const res = await axios.delete(`${API}/${id}`, { headers: authHeaders() })
=======
  const res = await axios.delete(`${API}/${id}`)
>>>>>>> f73a6c8795ef10aed46b6f4118506471efa36170
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
