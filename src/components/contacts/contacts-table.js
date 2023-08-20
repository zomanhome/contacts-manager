import React, {useEffect, useState} from "react"
import {Table, Typography, Popconfirm, Form, InputNumber, Input, Space, Button} from "antd"
import {getAllContactsRequest, deleteContactRequest} from "../../api/contacts"
import {store} from "../../store"
import {observer} from "mobx-react-lite"
import {toJS} from "mobx"
import Title from "./helpers/title"
import {EditableCell} from "./helpers/editable-components"
import {CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons"

const ContactsTable = observer(() => {
  const contacts = store.get().ContactsStore.getAllContacts()
  const [getAllContacts, getAllContactsFly] = getAllContactsRequest.useLocal()
  const [deleteContact, deleteContactFly] = deleteContactRequest.useLocal()

  const isInFly = getAllContactsFly || deleteContactFly

  const [form] = Form.useForm()
  const [data, setData] = useState(contacts)
  const [editingKey, setEditingKey] = useState("")
  const isEditing = (record) => record.key === editingKey

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      phone: "",
      ...record,
    })
    setEditingKey(record.key)
  }
  const cancel = () => {
    setEditingKey("")
  }
  const save = async (record) => {
    try {
      const row = await form.validateFields()
      setEditingKey("")
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo)
    }
  }
  const remove = (record) => {
    deleteContact({id: record.key}).then()
  }

  useEffect(() => {
    getAllContacts().then()
  }, [])

  const columns = [
    {
      title: "Name Surname",
      dataIndex: "name",
      editable: true,
      width: "35%",
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
      width: "40%",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      editable: true,
      width: "25%",
    },
    {
      title: "Favorite",
      dataIndex: "favorite",
      render: (favorite) => favorite ? <>Yes</> : <>No</>,
      sorter: (a, b) => b["favorite"] - a["favorite"],
      sortDirections: ["ascend"],
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
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
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
          addContact={() => {
            console.log("Later...")
          }}
        />}
        dataSource={toJS(data)}
        loading={isInFly}
        columns={mergedColumns}
      />
    </Form>
  )
})

export default ContactsTable