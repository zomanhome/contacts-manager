import React from "react"
import {ConfigProvider} from "antd"
import enUS from "antd/locale/en_US"
import "../static/styles.css"
import ContactsTable from "./components/contacts-table"
import Header from "./components/header"

const App = () => {
  return (
    <ConfigProvider locale={enUS}>
      <Header/>
      <ContactsTable/>
    </ConfigProvider>
  )
}

export default App