import React from "react"
import {Switch} from "antd"
import {useThemeSwitcher} from "react-css-theme-switcher"
import {currentTheme} from "../services/theme-service"

const ThemeSwitcher = () => {
  const {switcher, themes, status} = useThemeSwitcher()
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const toggleDarkMode = () => {
    currentTheme.set(isDarkMode ? "light" : "dark")

    setTimeout(() => {
      setIsDarkMode(previous => {
        switcher({theme: previous ? themes.light : themes.dark})
        return !previous
      })
    }, 0)

  }

  return <Switch
    loading={status === "loading"}
    checkedChildren="Light"
    unCheckedChildren="Dark"
    defaultChecked
    onChange={toggleDarkMode}
  />
}

export default ThemeSwitcher