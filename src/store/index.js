import {createStore} from "@badm/react-store"
import ContactsStore from "./contacts"
import AppStore from "./app"
import ErrorStore from "./errors"
import {configure} from "mobx"

configure({
  useProxies: "never",
})

export const store = createStore({
  AppStore: new AppStore(),
  ContactsStore: new ContactsStore(),
  Errors: new ErrorStore(),
})

store.setDefaultErrorsHandler((store, errors, request) => {
})