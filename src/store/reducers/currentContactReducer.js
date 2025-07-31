import {currentContactState} from '../../model/initialStates';
import ACTION_TYPES from '../actions/actionTypes';

export default function currentContactReducer(
    state = currentContactState,
    {type, payload}
) {
    switch (type) {
        case ACTION_TYPES.SET_CURRENT_CONTACT_ID:
            return payload;
        case ACTION_TYPES.DELETE_CONTACT:
            if (payload === state) {
                return currentContactState;
            }
            return state;
        default:
            return state;
    }
}
