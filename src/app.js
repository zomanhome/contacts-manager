import React from "react"
import {Button, ConfigProvider} from "antd"
import ukUA from "antd/locale/uk_UA"
import "../static/styles.css"
import ContactsTable from "./components/contacts-table"
import ThemeSwitcher from "./components/theme-switcher"
import Header from "./components/header"

const App = () => {
  return (
    <ConfigProvider locale={ukUA}>
      <Header/>
      <ContactsTable/>
    </ConfigProvider>
  )
}

export default App