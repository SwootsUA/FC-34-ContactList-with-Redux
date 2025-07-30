import ACTION_TYPES from './actionTypes';

export function editContact(contact) {
    return {
        type: ACTION_TYPES.EDIT_CONTACT,
        payload: contact,
    };
}

export function addContact(contact) {
    return {
        type: ACTION_TYPES.ADD_CONTACT,
        payload: contact,
    };
}

export function deleteContact(id) {
    return {
        type: ACTION_TYPES.DELETE_CONTACT,
        payload: id,
    };
}

export function getContacts(contacts) {
    return {
        type: ACTION_TYPES.GET_CONTACTS,
        payload: contacts,
    };
}
