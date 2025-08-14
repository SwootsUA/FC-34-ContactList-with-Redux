import {configureStore} from '@reduxjs/toolkit';
import contactsReducer from './slices/contactsSlice';
import currentContactReducer from './slices/currentContactSlice';

export default configureStore({
    reducer: {
        contactsState: contactsReducer,
        currentContact: currentContactReducer,
    },
});
