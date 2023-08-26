import React from "react"
import {Switch} from "antd"

const Favorite = ({record, toggleFavorite, updateContacts}) => {
  const onChange = () => {
    toggleFavorite({
      favorite: !record.favorite,
      key: record.key,
    }).then(() => {
      updateContacts()
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