import React from "react"
import {observer} from "mobx-react-lite"
import {Button, Form, Input, notification} from "antd"
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons"
import {registerRequest} from "../../api/users"
import {store} from "../../store"

const RegisterForm = observer(({setActiveKey}) => {
  const [form] = Form.useForm()
  const [register, isInFly] = registerRequest.useLocal()

  const onFinish = async (values) => {
    const {name, email, password} = values
    const {Errors} = store.get()

    const response = await register({name, email, password})

    if (response.data.success) {
      form.resetFields()
      setActiveKey("login")

      notification.success({
        message: "Please confirm email",
        description: `${response.data.message}`,
        placement: "bottomRight",
        duration: 5,
      })
    } else {
      Errors.pushError(response.data.message)
    }
  }

  return (
    <Form
      form={form}
      name="register"
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      onFinish={onFinish}
      autoComplete="off"
      validateTrigger="onSubmit"
      initialValues={{email: "zomanhome@gmail.com", password: "Windows1!", confirm: "Windows1!", name: "A S"}}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your Name Surname!",
            pattern: /^[a-zA-Z]+\s[a-zA-Z]+$/,
          },
        ]}
      >
        <Input prefix={<UserOutlined/>} placeholder="Name Surname"/>
      </Form.Item>

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
            message: "Password require lowercase letter, uppercase letter, digit, special character (6 min)!",
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\\[-`{-~]).{6,64}$/,
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
      </Form.Item>

      <Form.Item
        name="confirm"
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error("The new password that you entered do not match!"))
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined/>} placeholder="Confirm password"/>
      </Form.Item>

      <Form.Item>
        <Button loading={isInFly} type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
})

export default RegisterForm