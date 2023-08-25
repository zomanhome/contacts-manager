import React from "react"
import {observer} from "mobx-react-lite"
import {Button, Form, Input, Spin} from "antd"
import {LockOutlined, MailOutlined} from "@ant-design/icons"
import {loginRequest} from "../../api/users"

const LoginForm = observer(() => {
  const [form] = Form.useForm()
  const [login, isInFly] = loginRequest.useLocal()

  const onFinish = async (values) => {
    const {email, password} = values

    await login({email, password})
  }

  return (
    <Form
      form={form}
      name="login"
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      onFinish={onFinish}
      // autoComplete="off"
      validateTrigger="onSubmit"
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please input your email!",
          },
        ]}
      >
        <Input prefix={<MailOutlined/>} placeholder="Email"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Password incorrect!",
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\\[-`{-~]).{6,64}$/,
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
      </Form.Item>

      <Form.Item>
        <Button loading={isInFly} type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
})

export default LoginForm