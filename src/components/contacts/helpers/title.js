import React from "react"
import styled from "styled-components"
import {Button, Space} from "antd"
import {CloudDownloadOutlined} from "@ant-design/icons"

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Title = ({updateContacts, addContact, isEditing}) => (
  <TitleWrapper>
    <h1>Contacts</h1>
    <Space>
      <Button onClick={updateContacts}><CloudDownloadOutlined/></Button>
      <Button disabled={isEditing} type="primary" onClick={addContact}>Add contact</Button>
    </Space>
  </TitleWrapper>
)

export default Title