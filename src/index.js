import {createRoot} from "react-dom/client"
import React from "react"

import App from "./app"

const app = document.querySelector(".app")
const root = createRoot(app)

root.render(<App/>)