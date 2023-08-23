import Favorite from "./favorite"
import moment from "moment/moment"
import Operations from "./operations"
import React from "react"
import {observable} from "mobx"
import {Space, Switch} from "antd"

export const columnsSettings = observable({
  createdAt: true,
})

export const ColumnsSettingsSwitch = ({checkedText, uncheckedText}) => {
  return <Switch
    defaultChecked={columnsSettings.createdAt}
    onChange={() => columnsSettings.createdAt = !columnsSettings.createdAt}
    checkedChildren={checkedText || "_"}
    unCheckedChildren={uncheckedText || "_"}
  />
}

export default function getTableColumns({editingKey, toggleFavorite, save, cancel, edit, remove}) {
  const isEditing = (record) => record.key === editingKey

  const columns = [
    {
      title: "Name Surname",
      dataIndex: "name",
      editable: true,
      sorter: (a, b) => b.name.length - a.name.length,
      sortDirections: ["ascend", "descend"],
      display: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
      display: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      editable: true,
      display: true,
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
      display: true,
    },
    {
      title: () => <ColumnsSettingsSwitch checkedText="Created"/>,
      dataIndex: "createdAt",
      render: createdAt => moment(createdAt).format("DD MMM YYYY HH:mm"),
      sorter: (a, b) =>
        moment(a["createdAt"]).format("X") - moment(b["createdAt"]).format("X"),
      sortDirections: ["descend"],
      defaultSortOrder: "descend",
      display: columnsSettings.createdAt,
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
      display: true,
    }
  ]

  return columns.filter(col => col.display).map(col => {
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

