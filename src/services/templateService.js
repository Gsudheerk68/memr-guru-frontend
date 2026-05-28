import axios from 'axios'

const API = 'http://localhost:5000/api/templates'

export const uploadTemplate = async (formData) => {
  const res = await axios.post(
    `${API}/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return res.data
}

export const getTemplates = async () => {
  const res = await axios.get(API)
  return res.data
}
