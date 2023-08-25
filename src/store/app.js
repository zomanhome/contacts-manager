import {action, observable} from "mobx"

class AppStore {
  @observable
  _isLoggedIn = false

  @action
  get isLoggedIn() {
    return this._isLoggedIn
  }
}

export default AppStore