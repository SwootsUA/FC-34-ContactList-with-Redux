export function editContact(contact) {
    return {
        type: 'editContact',
        payload: contact,
    };
}

export function addContact(contact) {
    return {
        type: 'addContact',
        payload: contact,
    };
}

export function deleteContact(id) {
    return {
        type: 'deleteContact',
        payload: id,
    };
}

export function getContacts(contacts) {
    return {
        type: 'getContacts',
        payload: contacts,
    };
}
