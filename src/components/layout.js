import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 8px 8px;
`

const Layout = ({children}) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default Layout