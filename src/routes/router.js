import Layout from "../components/layout"
import {Spin} from "antd"
import {createBrowserRouter} from "react-router-dom"
import React from "react"
import ContactsTable from "../components/contacts/contacts-table"

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return {user: "Test"}
    },
    Component: Layout,
    children: [
      {
        index: true,
        Component: () => <>Login Page</>,
      },
      {
        path: "contacts",
        loader: <Spin/>,
        Component: () => <ContactsTable/>,
      },
    ],
  },
]);

export default router