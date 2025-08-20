import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api/contacts-service';
import {contactsState} from '../../model/initialStates';
import {CONTACTS_SLICE_NAME} from '../../constants/constants';

const initialState = {
    contacts: contactsState,
    isPending: false,
    error: null,
};

export const addContact = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/addContact`,
    async function (contact, {rejectWithValue}) {
        try {
            const response = await api.post(CONTACTS_SLICE_NAME, contact);
            if (response.status >= 400) {
                throw new Error(`Error status: ${response.status}`);
            }
            const {data} = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getContacts = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/getContacts`,
    async function (_, {rejectWithValue}) {
        try {
            const response = await api.get(CONTACTS_SLICE_NAME);
            if (response.status >= 400) {
                throw new Error(`Error status: ${response.status}`);
            }
            const {data} = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editContact = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/editContact`,
    async function (contact, {rejectWithValue}) {
        try {
            const response = await api.put(
                `${CONTACTS_SLICE_NAME}/${contact.id}`,
                contact
            );
            if (response.status >= 400) {
                throw new Error(`Error status: ${response.status}`);
            }
            const {data} = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/deleteContact`,
    async function (id, {rejectWithValue}) {
        try {
            const response = await api.delete(`${CONTACTS_SLICE_NAME}/${id}`);
            if (response.status >= 400) {
                throw new Error(`Error status: ${response.status}`);
            }
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.isPending = false;
    state.error = action.payload;
};

const setPending = state => {
    state.isPending = true;
    state.error = null;
};

const contactsSlice = createSlice({
    name: CONTACTS_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addContact.fulfilled, (state, {payload}) => {
                state.contacts.push(payload);
                state.isPending = false;
                state.error = null;
            })
            .addCase(addContact.pending, setPending)
            .addCase(addContact.rejected, setError)
            .addCase(getContacts.fulfilled, (state, {payload}) => {
                state.contacts = [...payload];
                state.isPending = false;
                state.error = null;
            })
            .addCase(getContacts.pending, setPending)
            .addCase(getContacts.rejected, setError)
            .addCase(editContact.fulfilled, (state, {payload}) => {
                state.contacts = state.contacts.map(contact =>
                    contact.id === payload.id ? payload : contact
                );
                state.isPending = false;
                state.error = null;
            })
            .addCase(editContact.pending, setPending)
            .addCase(editContact.rejected, setError)
            .addCase(deleteContact.fulfilled, (state, {payload}) => {
                state.contacts = state.contacts.filter(
                    contact => contact.id !== payload
                );
                state.isPending = false;
                state.error = null;
            })
            .addCase(deleteContact.pending, setPending)
            .addCase(deleteContact.rejected, setError);
    },
});

const {reducer} = contactsSlice;
export default reducer;
