export function switchTheme() {
  const link = document.querySelector('#theme-switcher')
  const themes = {
    light: "/light-theme.css",
    dark: "/dark-theme.css",
  }

  link.href.includes(themes.light)
    ? link.href = themes.dark
    : link.href = themes.light
}
