import React, {useEffect, useState} from "react"
import {Spin, Tabs} from "antd"
import LoginForm from "./login"
import RegisterForm from "./register"
import styled from "styled-components"
import {currentRequest} from "../../api/users";

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const AuthTabs = styled(Tabs)`
  width: 100%;
`

const LoginRegister = () => {
  const [activeKey, setActiveKey] = useState("login")
  const [current, isInFly] = currentRequest.useLocal({initialStateIsFly: true})

  useEffect(() => {
    current().then()
  }, [current])

  if (isInFly) return <Spin/>

  return (
    <TabsWrapper>
      <AuthTabs
        destroyInactiveTabPane={true}
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
        ]}
      />
    </TabsWrapper>
  )
}

export default LoginRegister