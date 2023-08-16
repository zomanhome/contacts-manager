import React, {useState, useEffect} from "react"
import {getContacts} from './api/contacts'
import '../static/styles.css'

const App = () => {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    getContacts().then(response => {
      const {data: {data}} = response

      setContacts(data)
    })
  }, [])

  return (
    <>
      {contacts.map(contact => {
        return (
          <div key={contact['_id']}>
            <h2>{contact.name}</h2>
            <h3>{contact.email}</h3>
          </div>
        )
      })}
    </>
  )
}

export default App