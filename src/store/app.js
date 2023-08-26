import {makeAutoObservable, observable, action} from "mobx"
import http from "@badm/react-store/lib/http"

class AppStore {
  @observable isLoggedIn = false
  @observable user = {}

  constructor() {
    makeAutoObservable(this)
  }

  get user() {
    return this.user
  }

  get isLoggedIn() {
    return this.isLoggedIn
  }

  @action
  setLoggedIn = value => this.isLoggedIn = value
  @action
  setUser = value => this.user = value
}

export default AppStore