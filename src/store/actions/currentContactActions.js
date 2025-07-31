import ACTION_TYPES from './actionTypes';

export function setCurrentContactId(id) {
    return {
        type: ACTION_TYPES.SET_CURRENT_CONTACT_ID,
        payload: id,
    };
}