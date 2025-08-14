import {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {deleteContact, getContacts} from '../../store/slices/contactsSlice';
import ListItem from '../ListItem/ListItem';
import './ContactList.css';

function ContactList() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contactsState.contacts);
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

    return (
        <div className="scroll-box">
            <ul>
                {contacts.map(contact => (
                    <ListItem
                        selected={currentContactId === contact.id}
                        contact={contact}
                        key={contact.id}
                        deleteContact={deleteListContact}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ContactList;
