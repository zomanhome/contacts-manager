import React from "react"
import {ConfigProvider, theme} from "antd"
import enUS from "antd/locale/en_US"
import "../static/styles.css"
import ContactsTable from "./components/contacts-table"
import Header from "./components/header"
import {observer} from "mobx-react-lite"
import {algorithm} from "./services/theme-service"


const App = observer(() => {
  return (
    <ConfigProvider locale={enUS} theme={algorithm()}>
      <Header/>
      <ContactsTable/>
    </ConfigProvider>
  )
})

export default App