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
import {observable, runInAction, toJS} from "mobx"
import Title from "./helpers/title"
import {EditableCell} from "./helpers/editable-components"
import getTableColumns from "./helpers/columns"

const ContactsTable = observer(() => {
  const {ContactsStore} = store.get()
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
  const [tableParams] = useState(() =>
    observable({
      favorite: false,
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
      }
    }))

  const handleTableChange = (pagination, filters, sorter) => {
    // console.log(pagination, filters, sorter) // TODO: add filters and sorter here
    tableParams.pagination = pagination
  }

  const onChangeFavorite = () => {
    runInAction(() => {
      tableParams.favorite = !tableParams.favorite
      tableParams.pagination = {
        current: 1,
        pageSize: 10,
      }
    })

  }

  const updateContacts = () => {
    getAllContacts({
      page: tableParams.pagination.current,
      limit: tableParams.pagination.pageSize,
      favorite: tableParams.favorite,
    }).then(() => {
      tableParams.pagination.total = ContactsStore.getTotalCount()
      setEditingKey("")
    })
  }

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
        }).then(() => updateContacts())
      } else {
        editContact({
          key: record.key, // TODO: dirty fields only
          name,
          email,
          phone,
        }).then(() => updateContacts())
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo)
    }
  }
  const remove = (record) => {
    deleteContact({id: record.key}).then(() => {
      const {current, pageSize, total} = tableParams.pagination

      if ((current - 1) * pageSize + 1 === total) {
        tableParams.pagination.current--
      }

      updateContacts()
    })
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
    ContactsStore.setTotalCount(ContactsStore.getTotalCount() + 1)
  }

  useEffect(() => {
    updateContacts()
  }, [tableParams.pagination, tableParams.favorite])

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
          updateContacts={updateContacts}
          addContact={add}
        />}
        dataSource={toJS(contacts)}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        loading={isInFly}
        columns={getTableColumns({
          editingKey,
          onChangeFavorite,
          updateContacts,
          toggleFavorite,
          save,
          cancel,
          edit,
          remove
        })}
      />
    </Form>
  )
})

export default ContactsTable