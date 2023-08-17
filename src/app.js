import React from "react"
import {ConfigProvider} from 'antd'
import ukUA from 'antd/locale/uk_UA'
import '../static/styles.css'
import ContactsTable from './components/contacts-table'

const App = () => {

  return (
    <ConfigProvider locale={ukUA}>
      <ContactsTable/>
    </ConfigProvider>
  )
}

export default App