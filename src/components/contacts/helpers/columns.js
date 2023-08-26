import Favorite from "./favorite"
import moment from "moment/moment"
import Operations from "./operations"
import React, {useEffect} from "react"
import {observable} from "mobx"
import {Switch} from "antd"

export const columnsSettings = observable({
  createdAt: true,
  sortOrder: "descend",
})

export const ColumnsSettingsSwitch = ({params}) => {

  useEffect(() => {
    return () => {
      columnsSettings.sortOrder = params?.sortOrder
    }
  }, [params])

  return (
    <span onClick={e => e.stopPropagation()}>
      <Switch
        checked={columnsSettings.createdAt}
        onChange={() => columnsSettings.createdAt = !columnsSettings.createdAt}
        checkedChildren="Created"
        unCheckedChildren={columnsSettings.sortOrder ? "Created ▼" : "Created"}
      />
    </span>)
}

export default function getTableColumns({editingKey, updateContacts, toggleFavorite, save, cancel, edit, remove}) {
  const isEditing = (record) => record.key === editingKey

  const columns = [
    {
      title: params => {
        if (params?.sortColumn?.dataIndex === "name") {
          columnsSettings.sortOrder = undefined
        }
        return <>Name Surname</>
      },
      dataIndex: "name",
      editable: true,
      // TODO: sort on server
      // sorter: (a, b) => b.name.length - a.name.length,
      // sortDirections: ["ascend", "descend"],
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
            updateContacts={updateContacts}
          />,
      // filters: [
      //   {
      //     text: "Favorite",
      //     value: true,
      //   },
      // ],
      // onFilter: (_, record) => record.favorite,
      display: true,
    },
    {
      title: params => <ColumnsSettingsSwitch params={params}/>,
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

