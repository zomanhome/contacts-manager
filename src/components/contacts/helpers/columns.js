import Favorite from "./favorite"
import moment from "moment/moment"
import Operations from "./operations"
import React from "react"

export default function getTableColumns ({editingKey, toggleFavorite, save, cancel, edit, remove}) {
  const isEditing = (record) => record.key === editingKey

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
      onFilter: (_, record) => record.favorite,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: createdAt => moment(createdAt).format("DD MMM YYYY HH:mm"),
      sorter: (a, b) =>
        moment(a["createdAt"]).format("X") - moment(b["createdAt"]).format("X"),
      sortDirections: ["descend"],
      defaultSortOrder: "descend",
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

  return columns.map((col) => {
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
}

