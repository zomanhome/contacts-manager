import React, {useEffect, useState} from "react"
import {Form, Table} from "antd"
import {
  addContactRequest,
  deleteContactRequest,
  getAllContactsRequest,
  editContactRequest,
  toggleFavoriteRequest
} from "../../api/contacts"
import {store} from "../../store"
import {observer} from "mobx-react-lite"
import {toJS} from "mobx"
import Title from "./helpers/title"
import {EditableCell} from "./helpers/editable-components"
import getTableColumns from "./helpers/columns"

const ContactsTable = observer(() => {
  const {ContactsStore, Errors} = store.get()
  const contacts = ContactsStore.getAllContacts()

  const [getAllContacts, getAllContactsFly] = getAllContactsRequest.useLocal()
  const [deleteContact, deleteContactFly] = deleteContactRequest.useLocal()
  const [addContact, addContactFly] = addContactRequest.useLocal()
  const [editContact, editContactFly] = editContactRequest.useLocal()
  const [toggleFavorite, toggleFavoriteFly] = toggleFavoriteRequest.useLocal()

  const isInFly =
    getAllContactsFly
    || deleteContactFly
    || addContactFly
    || editContactFly
    || toggleFavoriteFly

  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState("")

  const edit = (record) => {
    form.setFieldsValue(record)
    setEditingKey(record.key)
  }
  const cancel = (record) => {
    if (/^_new\d+/.test(record.key)) {
      ContactsStore.deleteNewContact()
    }

    setEditingKey("")
  }
  const save = async (record) => {
    try {
      const {name, email, phone} = await form.validateFields()

      if (/^_new\d+/.test(record.key)) {
        addContact({
          name,
          email,
          phone,
        }).then(() => {
          setEditingKey("")
        })
      } else {
        editContact({
          key: record.key, // TODO: dirty fields only
          name,
          email,
          phone,
        }).then(({success, data, message}) => {
          setEditingKey("")
        })
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo)
    }
  }
  const remove = (record) => {
    deleteContact({id: record.key}).then()
  }
  const add = () => {
    const key = `_new${Math.random()}`
    const record = {
      name: "",
      email: "",
      phone: "",
      favorite: false,
    }

    form.setFieldsValue(record)
    setEditingKey(key)

    ContactsStore.addNewContact({...record, key})
  }

  useEffect(() => {
    getAllContacts().then()
  }, [contacts])

  return (
    <Form form={form} component={false}>
      <Table
        size="small"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        title={() => <Title
          isEditing={editingKey !== ""}
          updateContacts={() => getAllContacts()}
          addContact={add}
        />}
        dataSource={toJS(contacts)}
        loading={isInFly}
        columns={getTableColumns({editingKey, toggleFavorite, save, cancel, edit, remove})}
      />
    </Form>
  )
})

export default ContactsTable