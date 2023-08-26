import React from "react"
import {Switch} from "antd"

const Favorite = ({record, toggleFavorite, tableParams, getAllContacts}) => {
  const onChange = () => {
    toggleFavorite({
      favorite: !record.favorite,
      key: record.key,
    }).then(() => {
      getAllContacts({
        page: tableParams.pagination.current,
        limit: tableParams.pagination.pageSize,
      })
    })
  }

  return <Switch
    checked={record.favorite}
    checkedChildren="Yes"
    unCheckedChildren="No"
    onChange={onChange}
  />
}

export default Favorite