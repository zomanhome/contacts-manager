import React from "react"
import "../static/styles.css"
import Header from "./components/header"
import {observer} from "mobx-react-lite"
import Layout from "./components/layout"
import ContactsTable from "./components/contacts/contacts-table"
import {ThemeSwitcherProvider} from 'react-css-theme-switcher'
import {ConfigProvider} from "antd"
import enUS from "antd/locale/en_US"
import {themes, algorithm, currentTheme} from "./services/theme-service"
import {store} from "./store"
import LoginRegister from "./components/auth"
import {Routes, Route, BrowserRouter} from "react-router-dom"

const App = observer(() => {

  const {isLoggedIn} = store.get().AppStore

  return (
    <ConfigProvider locale={enUS} theme={algorithm()}>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme={currentTheme.get()}>
        <BrowserRouter>
          <Layout>
            <Header/>
            <Routes>
              <Route path="*" element={isLoggedIn
                ? <ContactsTable/>
                : <LoginRegister/>
              }/>
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeSwitcherProvider>
    </ConfigProvider>
  )
})

export default App