import React, {useState, useEffect} from "react"
import {getContacts} from './api/contacts'

const App = () => {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    getContacts().then(response => {
      const {data: {data}} = response

      setContacts(data)
    })
  }, [])

  return <pre>{JSON.stringify(contacts, null, 2)}</pre>
}

export default App