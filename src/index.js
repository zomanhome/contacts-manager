import reactDOM from "react-dom"
import React from "react"
import "../static/styles.css"

const App = () => {
  return (
    <div>Contacts manager</div>
  )
}

const app = document.querySelector('.app')

reactDOM.render(<App/>, app)