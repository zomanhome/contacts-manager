import React, {useEffect, useState} from 'react'
import {DatePicker, Space} from 'antd'
import {getContacts, useContacts} from "../api/contacts"
import {store} from "../store/contacts"
import {observer} from "mobx-react-lite"

const ContactsTable = observer(() => {
  // const [contacts, setContacts] = useState([])

  const contacts = store.get().ContactsStore.contacts
  const [execute, isInFly] = useContacts.useLocal()

  useEffect(() => {
    execute().then()
  }, [])

  return (
    <div>Contacts table</div>
  )
})

export default ContactsTable