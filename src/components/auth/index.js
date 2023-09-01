import React, {useEffect, useState} from "react"
import {Spin, Tabs, notification} from "antd"
import LoginForm from "./login"
import RegisterForm from "./register"
import styled from "styled-components"
import {currentRequest, verifyRequest} from "../../api/users"
import {useNavigate, useSearchParams} from "react-router-dom"

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
  const verifyBody = {email: searchParams.get("email"), key: searchParams.get("key")}
  const isVerifyBody = verifyBody.key && verifyBody.email

  const [activeKey, setActiveKey] = useState("login")
  const [current, isInFly] = currentRequest.useLocal({initialStateIsFly: !isVerifyBody})
  const [verify, isVerifyInFly] = verifyRequest.useLocal()

  useEffect(() => {
    !isVerifyBody && current().then()
    isVerifyBody && verify(verifyBody).then(({data}) => {
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
          description: "Incorrect data",
          placement: "bottomRight",
          duration: 5,
        })
      }
    }).finally(() => navigate(process.env.NODE_ENV === "production" ? "/contacts-manager" : "/"))
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
        ]}
      />
    </TabsWrapper>
  )
}

export default LoginRegister