import { createStore } from "@badm/react-store"
import { observable } from "mobx"

const ContactsStore = observable({
  contacts: observable.array([])
})

export const store = createStore({
  ContactsStore
})

store.setDefaultErrorsHandler((store, errors, request) => {
  // обработка ошибок возникающих при запросах
})