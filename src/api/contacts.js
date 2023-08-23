import {store} from "../store"
import http from "@badm/react-store/lib/http"

const BASE_URL = "https://contacts-manager-08of.onrender.com"

http.setBaseUrl(BASE_URL)

// Перед выполнением любой запрос можно модифицировать.
// Те же параметры доступны для каждого запроса по отдельности.
http.requestInterceptor(options => {
  // options.useBearerToken("...")
  options.useResponseFormat("json") // json | text | blob
  options.useBodyFormatter(request => JSON.stringify(request)) // default value
  options.useHeaders({
    "Content-Type": "application/json",
  })
  // можно добавить обработчики для конкретных статусов
  options.onStatus([401, 403], context => {
    context.setResult({
      errors: [
        {unauthorized: true}
      ]
    })
    context.stopPipe() // останавливает выполнение цепочки (не будет вызван onResponseComplete)
  })

  // Необходим для того, чтобы дать понять библиотеке успешно выполнился запрос или нет.
  // setResult принимает объект вида { data, errors }
  // где оба свойства могут принимать любые значения.
  // Если будет передано свойство errors, мутация хранилища не будет вызываться.
  // Также, будет вызван зарегестрированный обработчик ошибок (в setDefaultErrorsHandler)
  options.onResponseComplete((responseResult, context) => {
    if (responseResult.error) {
      context.setResult({
        errors: [{message: "Request error!"}]
      })
      return
    }
    context.setResult(responseResult)
  })

  // Если возникла проблема при подключение к хосту или, к примеру, не удалось распарсить json.
  // Можно использовать для более точечного логирования, или переопределить ошибку, которая
  // будет направлена в обработчик установленный setDefaultErrorsHandler-ом.
  options.onError((type, exception, context) => {
    if (type === "network") {
      // some logs, or custom result (context.setErrors())
    }
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