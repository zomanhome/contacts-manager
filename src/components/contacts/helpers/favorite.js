import React, {useTransition} from "react"
import {Switch} from "antd"

const Favorite = ({record, toggleFavorite, updateContacts}) => {
  const [isPending, startTransition] = useTransition()

  const onChange = () => {
    startTransition(() => {
      toggleFavorite({
        favorite: !record.favorite,
        key: record.key,
      }).then(() => {
        updateContacts()
      })
    })
  }

  return <Switch
    loading={isPending}
    checked={record.favorite}
    checkedChildren="Yes"
    unCheckedChildren="No"
    onChange={onChange}
  />
}

export default Favorite