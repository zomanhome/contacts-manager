import React from "react"
import {Alert} from "antd"
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: 0 0 24px 0;
`

const Help = () => <Wrapper><Alert type="info" message="This project is R in MERN 🔱"/></Wrapper>

export default Help