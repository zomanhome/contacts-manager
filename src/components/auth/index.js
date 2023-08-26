import React, {useState} from "react"
import {Tabs} from "antd"
import LoginForm from "./login"
import RegisterForm from "./register"
import styled from "styled-components"

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const AuthTabs = styled(Tabs)`
  width: 100%;
`

const LoginRegister = () => {
  const [activeKey, setActiveKey] = useState("1")

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
            key: "1",
            children: <LoginForm/>,
            onClick: () => setActiveKey("1"),
          },
          {
            label: "Register",
            key: "2",
            children: <RegisterForm setActiveKey={setActiveKey}/>,
            onClick: () => setActiveKey("2"),
          },
        ]}
      />
    </TabsWrapper>
  )
}

export default LoginRegister