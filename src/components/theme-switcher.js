import React from "react"
import {Switch} from "antd"
import {switchTheme} from "../services/theme-service"

const ThemeSwitcher = () => {
  return <Switch
    checkedChildren="Light"
    unCheckedChildren="Dark"
    defaultChecked
    onChange={switchTheme}
  />
}

export default ThemeSwitcher