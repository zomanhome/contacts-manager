import axios from "axios"

const BASE_URL = 'http://127.0.0.1:3000'

export const getContacts = async () => {
  const url = `${BASE_URL}/api/contacts`

  return await axios.get(url, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}