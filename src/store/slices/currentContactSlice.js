import {createSlice} from '@reduxjs/toolkit';
import {currentContactState} from '../../model/initialStates';
import {deleteContact} from './contactsSlice';

const currentContactSlice = createSlice({
    name: 'currentContact',
    initialState: currentContactState,
    reducers: {
        setCurrentContactId(state, {payload}) {
            return payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(deleteContact.fulfilled, (state, {payload}) => {
            if (payload === state) {
                return currentContactState;
            }
        });
    },
});

const {actions, reducer} = currentContactSlice;
export const {setCurrentContactId} = actions;
export default reducer;
