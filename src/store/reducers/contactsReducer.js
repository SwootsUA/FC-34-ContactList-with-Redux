import {contactsState} from '../../model/initialContacts';

export default function contactsReducer(
    state = contactsState,
    {type, payload}
) {
    switch (type) {
        case 'addContact':
            return [...state, payload];
        case 'editContact':
            return state.map(contact =>
                contact.id === payload.id ? payload : contact
            );
        case 'deleteContact':
            return state.filter(contact => contact.id !== payload);
        case 'getContacts':
            return [...payload];
        default:
            return state;
    }
}
