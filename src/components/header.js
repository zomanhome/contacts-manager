import React from "react"
import ThemeSwitcher from "./theme-switcher"
import styled from "styled-components"

const TopPanel = styled.div`
  //width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 8px 8px;
`

const Header = () => {

  return (
    <TopPanel>
      <ThemeSwitcher/>
    </TopPanel>
  )
}

export default Header