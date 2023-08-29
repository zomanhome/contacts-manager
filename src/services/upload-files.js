const uploadFiles = (url, file, id, onProgress, onComplete) => {
  const xhr = new XMLHttpRequest()

  xhr.upload.onprogress = function (event) {
    const percent = ((event.loaded / event.total) * 100)
    onProgress(percent.toFixed(0))
  }

  xhr.onload = xhr.onerror = function () {
    if (this.status === 200) {
      onComplete(true)
    } else {
      onComplete(false)
    }
  }

  xhr.open("PATCH", url, true)
  xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("APP_TOKEN") || ""}`)

  const formData = new FormData()
  formData.append("avatar", file)
  formData.append("id", id)

  xhr.send(formData)
}

export default uploadFiles