import {store} from "../store"
import http from "@badm/react-store/lib/http"
import {runInAction} from "mobx"

http.requestInterceptor(options => {
  options.useBearerToken(localStorage.getItem("APP_TOKEN") || "")
  options.useResponseFormat("json")
  options.useHeaders({
    "Content-Type": "application/json",
  })
})

export const registerRequest = store.createRequest()
  .fetch(http.post("/api/auth/register"))
  .immutable()

export const loginRequest = store.createRequest()
  .fetch(http.post("/api/auth/login"))
  .mutateStore((store, data, request, vars) => {
    if (data.success) {
      localStorage.setItem("APP_TOKEN", data.data.token)
      store.AppStore.setLoggedIn(true)
      currentRequest.getExecutor().execute().then()
    }
  })

export const currentRequest = store.createRequest()
  .fetch(http.get("/api/auth/current"))
  .mutateStore((store, data, request, vars) => {
    if (data.success) {
      runInAction(() => {
        store.AppStore.setUser(data.data)
        store.AppStore.setLoggedIn(true)
      })
    }
  })