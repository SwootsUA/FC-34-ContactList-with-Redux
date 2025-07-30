import {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ListItem from '../ListItem/ListItem';
import {deleteContact, getContacts} from '../../store/actions/contactActions';
import api from '../../api/contacts-service';
import './ContactList.css';

function ContactList() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts);
    const currentContactId = useSelector(state => state.currentContact.id);

    useEffect(() => {
        api.get('/contacts').then(({data}) => dispatch(getContacts(data)));
    }, [dispatch]);

    const deleteListContact = useCallback(
        id => {
            api.delete(`/contacts/${id}`)
                .then(() => {
                    dispatch(deleteContact(id));
                })
                .catch(error => console.error(error));
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
