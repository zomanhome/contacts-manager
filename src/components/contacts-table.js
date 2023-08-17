import React, {useEffect, useState} from 'react'
import {DatePicker, Space} from 'antd'
import {getContacts} from "../api/contacts"

const ContactsTable = () => {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    getContacts().then(response => {
      const {data: {data}} = response

      setContacts(data)
    })
  }, [])

  return (
    <Space direction='vertical'>
      {contacts.map(contact => {
        return (
          <Space key={contact['_id']}>
            <h2>{contact.name}</h2>
            <h3>{contact.email}</h3>
          </Space>
        )
      })}
    </Space>
  )
}

export default ContactsTable