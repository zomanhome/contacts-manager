import {createStore} from "@badm/react-store"
import ContactsStore from "./contacts"
import {AppStore} from "./app"
import {configure} from "mobx"

configure({
  useProxies: "never",

})

export const store = createStore({
  AppStore,
  ContactsStore: new ContactsStore(),
})

store.setDefaultErrorsHandler((store, errors, request) => {
})