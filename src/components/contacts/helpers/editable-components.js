import React from "react"
import {Form, Input, InputNumber} from "antd"

export const EditableCell = ({
                               editing,
                               dataIndex,
                               title,
                               inputType,
                               record,
                               index,
                               children,
                               ...restProps
                             }) => {
  const inputNode = inputType === "number" ? <InputNumber/> : <Input/>

  const rules = {
    name: [{
      required: true,
      pattern: /^[a-zA-Z]+\s[a-zA-Z]+$/,
      min: (3),
      max: (40),
      message: "Name Surname",
    }],
    email: [{
      required: true,
      message: "name@domain.com",
      type: "email",
    }],
    phone: [{
      required: true,
      message: "10-15 digits",
      pattern: /^[0-9]{10,15}/,
    }],
  }

  return (
    <td {...restProps} style={{verticalAlign: "top"}}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={rules[dataIndex] ? rules[dataIndex] : []}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}