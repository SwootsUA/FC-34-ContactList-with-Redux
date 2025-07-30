import ACTION_TYPES from './actionTypes';

export function setCurrentContact(contact) {
    return {
        type: ACTION_TYPES.SET_CURRENT_CONTACT,
        payload: contact,
    };
}

export function resetCurrentContact() {
    return {
        type: ACTION_TYPES.RESET_CURRENT_CONTACT,
    };
}
