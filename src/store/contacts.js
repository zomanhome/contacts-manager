import {action, observable} from "mobx"

class ContactsStore {
  @observable
  _contacts = observable.array([], {deep: true})

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
    this._contacts.replace([contact, ...this._contacts])
  }

  @action
  deleteNewContact() {
    this._contacts.replace([...this._contacts.slice(1)])
  }
}

export default ContactsStore
