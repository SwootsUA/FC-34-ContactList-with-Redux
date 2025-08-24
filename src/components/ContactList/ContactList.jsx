import {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SyncLoader} from 'react-spinners';
import {useSpinDelay} from 'spin-delay';
import {List} from '@mui/material';
import {deleteContact, getContacts} from '../../store/slices/contactsSlice';
import ListItem from '../ListItem/ListItem';
import './ContactList.css';

function ContactList() {
    const dispatch = useDispatch();
    const contactsState = useSelector(state => state.contactsState);
    const currentContactId = useSelector(state => state.currentContact);

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    const deleteListContact = useCallback(
        id => {
            dispatch(deleteContact(id));
        },
        [dispatch]
    );

    const showSpinner = useSpinDelay(contactsState.isPending, {
        delay: 200,
        minDuration: 200,
    });

    return (
        <List className="list" disablePadding dense>
            <SyncLoader
                size={10}
                color="#6e6e6e"
                speedMultiplier={0.75}
                loading={showSpinner}
                className="spinner"
            />
            {contactsState.contacts.map(contact => (
                <ListItem
                    selected={currentContactId === contact.id}
                    contact={contact}
                    key={contact.id}
                    deleteContact={deleteListContact}
                />
            ))}
        </List>
    );
}

export default ContactList;
