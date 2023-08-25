import {store} from "../store"
import http from "@badm/react-store/lib/http"

http.setBaseUrl(process.env.API_URL)

http.requestInterceptor(options => {
  options.useBearerToken(localStorage.getItem("APP_TOKEN") || "")
  options.useResponseFormat("json")
  options.useHeaders({
    "Content-Type": "application/json",
  })
})

export const getAllContactsRequest = store.createRequest()
  .fetch(http.get("/api/contacts"))
  .mutateStore((store, data, request, vars) => {
    store.ContactsStore.setContacts(data)
  })

export const deleteContactRequest = store.createRequest()
  .fetch(http.delete(({request: {id}}) => `/api/contacts/${id}`))
  .mutateStore((store, data, request, vars) => {
    getAllContactsRequest.getExecutor().execute().then()
  })

export const addContactRequest = store.createRequest()
  .fetch(http.post("/api/contacts"))
  .immutable()

export const editContactRequest = store.createRequest()
  .fetch(http.put(({request: {key}}) => `/api/contacts/${key}`))
  .immutable()

export const toggleFavoriteRequest = store.createRequest()
  .fetch(http.patch(({request: {key}}) => `/api/contacts/${key}/favorite`))
  .mutateStore((store, data, request, vars) => {
    getAllContactsRequest.getExecutor().execute().then()
  })