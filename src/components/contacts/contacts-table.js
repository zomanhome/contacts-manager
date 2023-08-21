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
import moment from "moment"
import Favorite from "./helpers/favorite";
import Operations from "./helpers/operations"

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
  const isEditing = (record) => record.key === editingKey

  function shiftContact() {
    const data = [...contacts]
    data.shift()

    ContactsStore.setContacts(data)
  }

  function updateContacts(success, errorText) {
    if (success) {
      setEditingKey("")
      getAllContacts().then()
    } else {
      Errors.pushError(errorText)
    }
  }

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      phone: "",
      ...record,
    })
    setEditingKey(record.key)
  }
  const cancel = (record) => {
    if (/^_new\d+/.test(record.key)) {
      shiftContact()
    }

    setEditingKey("")
  }
  const save = async (record) => {
    try {
      const row = await form.validateFields()

      if (/^_new\d+/.test(record.key)) {
        addContact({
          name: row.name,
          email: row.email,
          phone: row.phone,
        }).then(({success, data, message}) => {
          updateContacts(success, message)
        })
      } else {
        editContact({
          key: record.key, // TODO: dirty fields only, remove key and use post.)
          name: row.name,
          email: row.email,
          phone: row.phone,
        }).then(({success, data, message}) => {
          updateContacts(success, message)
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
    const record = {
      name: "",
      email: "",
      phone: "",
      favorite: false,
    }
    const key = `_new${Math.random()}`

    form.setFieldsValue(record)
    setEditingKey(key)
    ContactsStore.setContacts([{...record, key}, ...contacts])
  }

  useEffect(() => {
    getAllContacts().then()
  }, [])

  const columns = [
    {
      title: "Name Surname",
      dataIndex: "name",
      editable: true,
      sorter: (a, b) => b.name.length - a.name.length,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      editable: true,
    },
    {
      title: "Favorite",
      dataIndex: "favorite",
      render: (_, record) =>
        /^_new\d+/.test(record.key) || isEditing(record)
          ? <></>
          : <Favorite
            record={record}
            toggleFavorite={toggleFavorite}
          />,
      filters: [
        {
          text: "Favorite",
          value: true,
        },
      ],
      onFilter: (value, record) => record.favorite,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: createdAt => moment(createdAt).format("DD MMM YYYY HH:mm"),
      sorter: (a, b) =>
        moment(a["createdAt"]).format("X") - moment(b["createdAt"]).format("X"),
      sortDirections: ["descend"],
    },
    {
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record)
        return <Operations
          record={record}
          editingKey={editingKey}
          save={save}
          cancel={cancel}
          edit={edit}
          remove={remove}
        />
      },
      width: 60,
    }
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <Form form={form} component={false}>
      <Table
        size="small"
        rowKey={record => record["_id"]}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        title={() => <Title
          isEditing={editingKey !== ""}
          updateContacts={() => getAllContacts()}
          addContact={() => add()}
        />}
        dataSource={toJS(contacts)}
        loading={isInFly}
        columns={mergedColumns}
        pagination={false}
      />
    </Form>
  )
})

export default ContactsTable