import {currentContactState} from '../../model/initialCurrentContact';

export default function currentContactReducer(
    state = currentContactState,
    {type, payload}
) {
    switch (type) {
        case 'editContact':
        case 'setCurrentContact':
            return {...payload};
        case 'addContact':
        case 'resetCurrentContact':
            return {...currentContactState};
        case 'deleteContact':
            if (payload === state.id) {
                return {...currentContactState};
            }
            return state;
        default:
            return state;
    }
}
