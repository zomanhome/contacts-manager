import {store} from "../store"
import http from "@badm/react-store/lib/http"
import {runInAction} from "mobx";

http.setBaseUrl(process.env.API_URL)

http.requestInterceptor(options => {
  options.useBearerToken(localStorage.getItem("APP_TOKEN") || "")
  options.useResponseFormat("json")
  options.useHeaders({
    "Content-Type": "application/json",
  })
})

export const getAllContactsRequest = store.createRequest()
  .fetch(http.get(({request: {page = 1, limit = 10}}) => `/api/contacts?page=${page}&limit=${limit}`))
  .mutateStore((store, response, request, vars) => {
    const {items: contacts, totalCount} = response.data

    runInAction(() => {
      store.ContactsStore.setContacts(contacts)
      store.ContactsStore.setTotalCount(totalCount)
    })
  })

export const deleteContactRequest = store.createRequest()
  .fetch(http.delete(({request: {id}}) => `/api/contacts/${id}`))
  .immutable()

export const addContactRequest = store.createRequest()
  .fetch(http.post("/api/contacts"))
  .immutable()

export const editContactRequest = store.createRequest()
  .fetch(http.put(({request: {key}}) => `/api/contacts/${key}`))
  .immutable()

export const toggleFavoriteRequest = store.createRequest()
  .fetch(http.patch(({request: {key}}) => `/api/contacts/${key}/favorite`))
  .immutable()