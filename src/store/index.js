import {createStore, combineReducers} from 'redux';
import contactsReducer from './reducers/contactsReducer';
import currentContactReducer from './reducers/currentContactReducer';

const rootReducer = combineReducers({
    contacts: contactsReducer,
    currentContact: currentContactReducer,
});

export default createStore(rootReducer);
