import React from "react"
import io from "socket.io-client"
import {Button} from "antd"
import {observable} from "mobx"
import {observer} from "mobx-react-lite"

const wsUrl = process.env.NODE_ENV !== "production"
  ? "ws://localhost:3001"
  : "https://contacts-manager-08of.onrender.com:3001"

const socket = io.connect(wsUrl)
const messages = observable.array([])

socket.on("message", data => {
  messages.push(data)
})

export const WebSocketDemo = observer(() => {
  const handleClickSendMessage = () => socket.emit("message", {
    name: "User Name",
    data: "Hello",
  })

  return (
    <div>
      <Button
        onClick={handleClickSendMessage}
      >
        Click Me to send "Hello"
      </Button>
      <ul>
        {messages.map((message, idx) => (
          <div key={idx}>{message.name}: {message.data}</div>
        ))}
      </ul>
    </div>
  )
})