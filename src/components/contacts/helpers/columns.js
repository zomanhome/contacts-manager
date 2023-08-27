import Favorite from "./favorite"
import moment from "moment/moment"
import Operations from "./operations"
import React, {useEffect} from "react"
import {observable} from "mobx"
import {Checkbox, Switch} from "antd"

// TODO: for all hidden columns
export const columnsSettings = observable({
  createdAt: false,
  sortOrder: "",
})

// TODO: refactor this
export const ColumnsSettingsSwitch = ({params}) => {
  useEffect(() => {
    return () => {
      columnsSettings.sortOrder = params?.sortOrder
    }
  }, [params])

  return (
    <Switch
      checked={columnsSettings.createdAt}
      onChange={() => columnsSettings.createdAt = !columnsSettings.createdAt}
      checkedChildren="Created"
      unCheckedChildren={columnsSettings.sortOrder ? "Created ▼" : "Created"}
    />
  )
}

export default function getTableColumns({
                                          editingKey,
                                          onChangeFavorite,
                                          updateContacts,
                                          toggleFavorite,
                                          save,
                                          cancel,
                                          edit,
                                          remove
                                        }) {
  const isEditing = (record) => record.key === editingKey

  const columns = [
    {
      title: "Name Surname",
      dataIndex: "name",
      editable: true,
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
      title: () => <Checkbox onChange={onChangeFavorite}>Favorite</Checkbox>,
      dataIndex: "favorite",
      render: (_, record) =>
        /^_new\d+/.test(record.key) || isEditing(record)
          ? <></>
          : <Favorite
            record={record}
            toggleFavorite={toggleFavorite}
            updateContacts={updateContacts}
          />,
      display: true,
    },
    {
      title: params => <ColumnsSettingsSwitch params={params}/>,
      dataIndex: "createdAt",
      render: createdAt => moment(createdAt).format("DD MMM YYYY HH:mm"),
      display: columnsSettings.createdAt,
    },
    {
      dataIndex: "operation",
      render: (_, record) => {
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
      onCell: record => ({
        record,
        inputType: col.dataIndex === "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
}

