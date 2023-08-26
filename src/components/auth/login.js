import React from "react"
import {observer} from "mobx-react-lite"
import {Button, Form, Input} from "antd"
import {LockOutlined, MailOutlined} from "@ant-design/icons"
import {loginRequest} from "../../api/users"
import {store} from "../../store"

const LoginForm = observer(() => {
  const [form] = Form.useForm()
  const [login, isInFly] = loginRequest.useLocal()
  const {Errors} = store.get()

  const onFinish = async (values) => {
    const {email, password} = values

    const response = await login({email, password})

    if (!response.data.success) {
      Errors.pushError(response.data.message)
    }
  }

  return (
    <Form
      form={form}
      name="login"
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      onFinish={onFinish}
      autoComplete="off"
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