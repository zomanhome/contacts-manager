import {action, observable} from "mobx"

class ContactsStore {
  @observable
  _contacts = observable.array([], {deep: true})

  @action
  getAllContacts() {
    return this._contacts
  }

  setContacts(contacts) {
    this._contacts.replace(contacts.map(contact =>
      contact.key ? contact : {...contact, key: contact["_id"]}
    ))
  }
}

export default ContactsStore
