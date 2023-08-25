import {action} from "mobx"
import {notification} from "antd"

class ErrorsStore {
  @action
  pushError(errorText) {
    notification.error({
      message: "Error",
      description: `${errorText}`,
      placement: "bottomRight",
      duration: 5,
    })
  }
}

export default ErrorsStore