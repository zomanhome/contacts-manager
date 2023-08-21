import React from "react"
import {Switch} from "antd"
import {store} from "../../../store"

const Favorite = ({record, toggleFavorite}) => {
  const {ContactsStore} = store.get()

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