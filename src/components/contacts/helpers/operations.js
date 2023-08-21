import React from "react"
import {Button, Popconfirm, Space, Typography} from "antd"
import {CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons"

const Operations = ({record, editingKey, save, cancel, edit, remove}) => {
  const isEditing = (record) => record.key === editingKey
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
}

export default Operations