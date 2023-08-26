import {action, observable} from "mobx"

class ContactsStore {
  @observable
  _contacts = observable.array([])
  _totalCount = 0

  @action
  getTotalCount() {
    return this._totalCount
  }

  @action
  setTotalCount(count) {
    this._totalCount = count
  }

  @action
  getAllContacts() {
    return this._contacts
  }

  @action
  setContacts(contacts) {
    this._contacts.replace(contacts.map(contact =>
      contact.key ? contact : {...contact, key: contact["_id"]}
    ))
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
