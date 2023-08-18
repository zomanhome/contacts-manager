import axios from "axios"
import {store} from "../store/contacts"
import {FetchFunction} from "@badm/react-store"

const BASE_URL = 'http://127.0.0.1:3000'

export const getContacts = async () => {
  const url = `${BASE_URL}/api/contacts`

  return await axios.get(url, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const useContacts = store.createRequest()
  .fetch(new FetchFunction(getContacts))
  .mutateStore((store, data, request, vars) => {
    store.ContactsStore.contacts = data.data
  })
  .registerErrorsHandler((store, errors, request, variables) => {
    console.log(errors)
  })