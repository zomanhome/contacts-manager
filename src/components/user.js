import React, {useRef, useState} from "react"
import {store} from "../store"
import {Space, Dropdown, Button, Avatar, Progress} from "antd"
import {DownOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons"
import {observer} from "mobx-react-lite"
import uploadFiles from "../services/upload-files"
import {currentRequest} from "../api/users"
import styled from "styled-components"

const AvatarProgress = styled.div`
  font-size: 10px;
`

const User = observer(() => {
  const inputFile = useRef(null)
  const {user, setLoggedIn, setUser, isLoggedIn} = store.get().AppStore
  const {pushError} = store.get().Errors
  const {id, name, avatarURL} = user
  const [progress, setProgress] = useState(0)
  const [current] = currentRequest.useLocal()

  const uploadAvatar = async e => {
    e.stopPropagation()
    e.preventDefault()

    const file = e.target.files[0]

    uploadFiles(`${process.env.API_URL}/users/avatars`, file, id, setProgress, complete => {
      current().then(() => {
        !complete && pushError("Loading error. Try again!")
        setProgress(0)
      })
    })
  }

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
      <input onChange={uploadAvatar} type="file" id="file" ref={inputFile} style={{display: "none"}}/>
      {progress
        ? <Progress
          className="ant-avatar ant-avatar-square ant-avatar-image"
          style={{lineHeight: "30px"}}
          percent={progress}
          strokeLinecap="square"
          format={percent => <AvatarProgress>{`${percent}%`}</AvatarProgress>}
        />
        : <Avatar
          style={{cursor: "pointer"}}
          shape="square"
          src={avatarURL}
          onClick={() => inputFile.current.click()}
        />
      }
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