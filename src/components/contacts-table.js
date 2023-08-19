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

  const columns = [
    {
      title: "Name Surname",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
  ]

  return (
    <Table
      title={() => <strong>Contacts</strong>}
      dataSource={toJS(contacts)}
      loading={isInFly}
      columns={columns}
    />
  )
})

export default ContactsTable