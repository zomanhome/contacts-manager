import {action} from "mobx"
import {message, notification} from "antd"

class ErrorsStore {
  @action
  pushError(errorText) {
    message.error(`Error: ${errorText}`).then()
  }
}

export default ErrorsStore