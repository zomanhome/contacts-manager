import React, {useEffect} from 'react'
import {Table} from 'antd'
import {getAllContacts} from "../api/contacts"
import {store} from "../store"
import {observer} from "mobx-react-lite"
import {toJS} from "mobx"

const ContactsTable = observer(() => {
  const contacts = store.get().ContactsStore.getAllContacts()
  const [execute, isInFly] = getAllContacts.useLocal()

  useEffect(() => {
    execute().then()
  }, [])

  return (
    <Table
      title={() => "Contacts"}
      dataSource={toJS(contacts)}
      loading={isInFly}
    />
  )
})

export default ContactsTable