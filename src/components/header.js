import React from "react"
import ThemeSwitcher from "./theme-switcher"
import styled from "styled-components"

const TopPanel = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 0;
`

const Header = () => {

  return (
    <TopPanel>
      <ThemeSwitcher/>
    </TopPanel>
  )
}

export default Header