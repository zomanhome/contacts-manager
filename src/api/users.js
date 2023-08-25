import {store} from "../store"
import http from "@badm/react-store/lib/http"

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
    }
  })
  .registerErrorsHandler(() => store.get().Errors.pushError("Login failed"))

export const currentRequest = store.createRequest()
  .fetch(http.get("/api/auth/current"))
  .mutateStore((store, data, request, vars) => {
    if (data.success) {
      store.AppStore.setLoggedIn(true)
    }
  })