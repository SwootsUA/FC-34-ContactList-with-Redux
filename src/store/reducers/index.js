import {combineReducers} from 'redux';
import contactsReducer from './contactsReducer';
import currentContactReducer from './currentContactReducer';

const rootReducer = combineReducers({
    contacts: contactsReducer,
    currentContactId: currentContactReducer,
});

export default rootReducer;
