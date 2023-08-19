import {observable} from "mobx"

export const AppStore = observable({
  theme: observable.box("light")
})