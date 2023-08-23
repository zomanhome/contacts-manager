import React from "react"
import styled from "styled-components"
import {Button, Space, Switch} from "antd"
import {CloudDownloadOutlined, UserAddOutlined} from "@ant-design/icons"
import {columnsSettings, ColumnsSettingsSwitch} from "./columns"

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Title = ({updateContacts, addContact, isEditing}) => (
  <TitleWrapper>
    <h1>Contacts</h1>
    <Space>
      {!columnsSettings.createdAt && <ColumnsSettingsSwitch/>}
      <Button onClick={updateContacts}><CloudDownloadOutlined/></Button>
      <Button disabled={isEditing} type="primary" onClick={addContact}>Add <UserAddOutlined/></Button>
    </Space>
  </TitleWrapper>
)

export default Title