import React from "react"
import {store} from "../store"
import {Space, Dropdown, Button} from "antd"
import {DownOutlined, LogoutOutlined} from "@ant-design/icons"
import {observer} from "mobx-react-lite"

const User = observer(() => {

  const {user, setLoggedIn, setUser, isLoggedIn} = store.get().AppStore

  const items = [
    {
      key: "1",
      label: (
        <Button
          type="link"
          onClick={() => {
            setLoggedIn(false)
            setUser({})
            localStorage.removeItem("APP_TOKEN")
          }}
        >
          Logout
        </Button>
      ),
      icon: <LogoutOutlined/>,
    },
  ]

  if (!isLoggedIn) {
    return null
  }

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {user.name}
          <DownOutlined/>
        </Space>
      </a>
    </Dropdown>
  )
})

export default User