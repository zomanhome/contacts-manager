import {action, observable} from "mobx"

class ContactsStore {
  @observable
  _contacts = observable.array([])

  @action
  getAllContacts() {
    return this._contacts
  }

  @action
  setContacts(contacts) {
    this._contacts.replace(contacts)
  }

  @action
  addNewContact(contact) {
    this.setContacts([contact, ...this._contacts])
  }

  @action
  deleteNewContact() {
    this.setContacts([...this._contacts.slice(1)])
  }
}

export default ContactsStore
