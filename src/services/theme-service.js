import {autorun, observable} from "mobx"
import {theme} from "antd"

export const themes = {
  light: "./light-theme.css",
  dark: "./dark-theme.css",
}

const THEME = "THEME"

export const currentTheme = observable.box(localStorage.getItem(THEME) || "light")

autorun(() => {
  localStorage.setItem(THEME, currentTheme.get())
})

export function algorithm() {
  const isLight = currentTheme.get() === "light"

  return {
    algorithm: isLight
      ? theme.defaultAlgorithm
      : theme.darkAlgorithm
  }
}