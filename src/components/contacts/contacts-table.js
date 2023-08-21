import React, {useEffect, useState} from "react"
import {Button, Form, Popconfirm, Space, Table, Typography} from "antd"
import {addContactRequest, deleteContactRequest, getAllContactsRequest} from "../../api/contacts"
import {store} from "../../store"
import {observer} from "mobx-react-lite"
import {toJS} from "mobx"
import Title from "./helpers/title"
import {EditableCell} from "./helpers/editable-components"
import {CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons"
import moment from "moment"

const ContactsTable = observer(() => {
  const {ContactsStore} = store.get()
  const contacts = ContactsStore.getAllContacts()

  const [getAllContacts, getAllContactsFly] = getAllContactsRequest.useLocal()
  const [deleteContact, deleteContactFly] = deleteContactRequest.useLocal()
  const [addContact, addContactFly] = addContactRequest.useLocal()

  const isInFly = getAllContactsFly || deleteContactFly || addContactFly

  const [form] = Form.useForm()
  // const [data, setData] = useState(contacts)
  const [editingKey, setEditingKey] = useState("")
  const isEditing = (record) => record.key === editingKey

  function shiftContact() {
    const data = [...contacts]
    data.shift()

    ContactsStore.setContacts(data)
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

      addContact({
        name: row.name,
        email: row.email,
        phone: row.phone,
      }).then(({success, data}) => {
        if (success) {
          ContactsStore.setContacts([...contacts], data)
          setEditingKey("")
        }
      })
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
      key,
      name: "",
      email: "",
      phone: "",
      favorite: false,
    }
    setEditingKey(key)
    ContactsStore.setContacts([record, ...contacts])
  }

  useEffect(() => {
    getAllContacts().then()
  }, [])

  const columns = [
    {
      title: "Name Surname",
      dataIndex: "name",
      editable: true,
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
      render: favorite => favorite ? <>Yes</> : <>No</>,
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
        return editable ? (
          <Space>
            <Typography.Link onClick={() => save(record)}>
              <Button type="primary"><SaveOutlined/></Button>
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record)}>
              <Button><CloseOutlined/></Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
              <Button><EditOutlined/></Button>
            </Typography.Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => remove(record)}>
              <Button><DeleteOutlined/></Button>
            </Popconfirm>
          </Space>
        )
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
        // inputType: col.dataIndex === "age" ? "number" : "text",
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
      />
    </Form>
  )
})

export default ContactsTable