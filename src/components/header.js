import React from "react"
import ThemeSwitcher from "./theme-switcher"
import styled from "styled-components"
import User from "./user"

const TopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin: 1rem 0;
`

const Header = () => {

  return (
    <TopPanel>
      <ThemeSwitcher/>
      <User/>
    </TopPanel>
  )
}

export default Header