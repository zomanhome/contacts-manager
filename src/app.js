import React from "react"
import {ConfigProvider, theme} from "antd"
import enUS from "antd/locale/en_US"
import "../static/styles.css"
import ContactsTable from "./components/contacts-table"
import Header from "./components/header"
import {observer} from "mobx-react-lite"
import {algorithm} from "./services/theme-service"
import Layout from "./components/layout";

const App = observer(() => {
  return (
    <ConfigProvider locale={enUS} theme={algorithm()}>
      <Layout>
        <Header/>
        <ContactsTable/>
      </Layout>
    </ConfigProvider>
  )
})

export default App