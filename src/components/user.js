import React from "react"
import {store} from "../store"
import {Space, Dropdown, Button, Avatar} from "antd"
import {DownOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons"
import {observer} from "mobx-react-lite"

const User = observer(() => {

  const {user, setLoggedIn, setUser, isLoggedIn} = store.get().AppStore
  const {name, avatarURL} = user

  const items = [
    {
      key: "user",
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
    <Space>
      <Avatar
        style={{cursor: "pointer"}}
        shape="square"
        icon={<UserOutlined />}
        src={avatarURL}
        onClick={() => {
          // TODO: changing
        }}
      />
      <Dropdown
        menu={{items}}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {name}
            <DownOutlined/>
          </Space>
        </a>
      </Dropdown>
    </Space>
  )
})

export default User