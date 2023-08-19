import {action, observable} from "mobx"

class ContactsStore {
  @observable
  _contacts = observable.array([])

  @action
  getAllContacts() {
    return this._contacts
  }

  setContacts(contacts) {
    this._contacts.replace(contacts)
  }
}

export default ContactsStore
