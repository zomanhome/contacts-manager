import {observable} from "mobx"
import {theme} from "antd"

export const themes = {
  light: "./light-theme.css",
  dark: "./dark-theme.css",
}

export const currentTheme = observable.box("light")

export function algorithm() {
  return {
    algorithm: currentTheme.get() === "light"
      ? theme.defaultAlgorithm
      : theme.darkAlgorithm
  }
}