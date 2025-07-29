export function setCurrentContact(contact) {
    return {
        type: 'setCurrentContact',
        payload: contact,
    };
}

export function resetCurrentContact() {
    return {
        type: 'resetCurrentContact',
    };
}
