import {store} from "../store"
import {theme} from "antd"

const link = document.querySelector('#theme-switcher')
const themes = {
  light: "/light-theme.css",
  dark: "/dark-theme.css",
}

export function switchTheme() {
  const theme = store.get().AppStore.theme

  theme.set(link.href.includes(themes.light) ? "dark" : "light")

  link.href.includes(themes.light)
    ? link.href = themes.dark
    : link.href = themes.light
}

export function algorithm() {
  const isLight = store.get().AppStore.theme.get() === "light"
  return  {algorithm: isLight ? theme.defaultAlgorithm : theme.darkAlgorithm}
}
