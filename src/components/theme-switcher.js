import React from "react"
import {Switch} from "antd"
import {useThemeSwitcher} from "react-css-theme-switcher"
import {currentTheme} from "../services/theme-service"

const ThemeSwitcher = () => {
  const {switcher, themes, status} = useThemeSwitcher()

  const isLight = currentTheme.get() === "light"

  const toggleDarkMode = () => {
    isLight ? currentTheme.set("dark") : currentTheme.set("light")
    switcher({theme: isLight ? themes.light : themes.dark})
  }

  return <Switch
    loading={status === "loading"}
    checkedChildren="Light"
    unCheckedChildren="Dark"
    defaultChecked={isLight}
    onChange={toggleDarkMode}
  />
}

export default ThemeSwitcher