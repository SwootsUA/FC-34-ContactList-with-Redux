import {contactsState} from '../../model/initialStates';
import ACTION_TYPES from '../actions/actionTypes';

export default function contactsReducer(
    state = contactsState,
    {type, payload}
) {
    switch (type) {
        case ACTION_TYPES.ADD_CONTACT:
            return [...state, payload];
        case ACTION_TYPES.EDIT_CONTACT:
            return state.map(contact =>
                contact.id === payload.id ? payload : contact
            );
        case ACTION_TYPES.DELETE_CONTACT:
            return state.filter(contact => contact.id !== payload);
        case ACTION_TYPES.GET_CONTACTS:
            return [...payload];
        default:
            return state;
    }
}
