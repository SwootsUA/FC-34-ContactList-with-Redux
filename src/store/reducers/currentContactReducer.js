import {currentContactState} from '../../model/initialStates';
import ACTION_TYPES from '../actions/actionTypes';

export default function currentContactReducer(
    state = currentContactState,
    {type, payload}
) {
    switch (type) {
        case ACTION_TYPES.EDIT_CONTACT:
        case ACTION_TYPES.SET_CURRENT_CONTACT:
            return {...payload};
        case ACTION_TYPES.ADD_CONTACT:
        case ACTION_TYPES.RESET_CURRENT_CONTACT:
            return {...currentContactState};
        case ACTION_TYPES.DELETE_CONTACT:
            if (payload === state.id) {
                return {...currentContactState};
            }
            return state;
        default:
            return state;
    }
}
