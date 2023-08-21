import React from "react"
import {Switch} from "antd"

const Favorite = ({record, toggleFavorite}) => {
  const onChange = () => {
    toggleFavorite({
      favorite: !record.favorite,
      key: record.key,
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