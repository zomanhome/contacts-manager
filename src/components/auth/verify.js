import React from "react"
import {observer} from "mobx-react-lite"
import {Button, Form, Input, notification} from "antd"
import {MailOutlined} from "@ant-design/icons"
import {sendVerifyEmailRequest} from "../../api/users"
import {store} from "../../store"

const VerifyForm = observer(() => {
  const [form] = Form.useForm()
  const [verify, isInFly] = sendVerifyEmailRequest.useLocal()
  const {Errors} = store.get()

  const onFinish = async (values) => {
    const {email} = values

    const response = await verify({email})

    if (!response.data.success) {
      Errors.pushError(response.data.message)
    } else {
      notification.success({
        message: "Success",
        description: "Check your email",
        placement: "bottomRight",
        duration: 5,
      })
    }
  }

  return (
    <Form
      form={form}
      name="verify"
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      onFinish={onFinish}
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

      <Form.Item>
        <Button loading={isInFly} type="primary" htmlType="submit">
          Send
        </Button>
      </Form.Item>
    </Form>
  )
})

export default VerifyForm