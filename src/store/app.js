import {makeAutoObservable, observable, action} from "mobx"
import http from "@badm/react-store/lib/http"

class AppStore {
  @observable isLoggedIn = false

  constructor() {
    makeAutoObservable(this)
  }

  get isLoggedIn() {
    return this.isLoggedIn
  }

  @action
  setLoggedIn = value => this.isLoggedIn = value
}

export default AppStore