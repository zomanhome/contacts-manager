import React, {useEffect, useState} from "react"
import {Spin, Tabs, notification} from "antd"
import LoginForm from "./login"
import RegisterForm from "./register"
import styled from "styled-components"
import {currentRequest, verifyRequest} from "../../api/users"
import {useNavigate, useSearchParams} from "react-router-dom"
import VerifyForm from "./verify"
import {WebSocketDemo} from "../../services/ws"

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const AuthTabs = styled(Tabs)`
  width: 100%;
`

const LoginRegister = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const verificationToken = searchParams.get("verificationToken")

  const [activeKey, setActiveKey] = useState("login")
  const [current, isInFly] = currentRequest.useLocal({initialStateIsFly: !verificationToken})
  const [verify, isVerifyInFly] = verifyRequest.useLocal()

  useEffect(() => {
    !verificationToken && current().then()
    verificationToken && verify({}, {variables: verificationToken}).then(({data}) => {
      if (data.success) {
        notification.success({
          message: "Success",
          description: "Now you can login",
          placement: "bottomRight",
          duration: 5,
        })
      } else {
        notification.error({
          message: "Error",
          description: "Incorrect token",
          placement: "bottomRight",
          duration: 5,
        })
      }
    })
      .finally(() => process.env.NODE_ENV === "development"
        ? navigate("/")
        : navigate("/contacts-manager"))
  }, [])

  if (isInFly || isVerifyInFly) return <Spin/>

  return (
    <TabsWrapper>
      <AuthTabs
        onChange={key => setActiveKey(key)}
        activeKey={activeKey}
        type="card"
        items={[
          {
            label: "Login",
            key: "login",
            children: <LoginForm/>,
            onClick: () => setActiveKey("login"),
          },
          {
            label: "Register",
            key: "register",
            children: <RegisterForm setActiveKey={setActiveKey}/>,
            onClick: () => setActiveKey("register"),
          },
          {
            label: "Verification",
            key: "verify",
            children: <VerifyForm setActiveKey={setActiveKey}/>,
            onClick: () => setActiveKey("verify")
          },
          {
            label: "Chat",
            key: "chat",
            children: <WebSocketDemo/>,
            onClick: () => {
              setActiveKey("chat")
            },
          },
        ]}
      />
    </TabsWrapper>
  )
}

export default LoginRegister