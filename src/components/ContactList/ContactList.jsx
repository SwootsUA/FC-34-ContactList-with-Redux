import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ListItem from '../ListItem/ListItem';
import {deleteContact, getContacts} from '../../store/actions/contactActions';
import api from '../../api/contacts-service';
import './ContactList.css';

function ContactList() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts);
    const currentContact = useSelector(state => state.currentContact);

    useEffect(() => {
        api.get('/contacts').then(({data}) => dispatch(getContacts(data)));
    }, [dispatch]);

    function deleteListContact(id) {
        api.delete(`/contacts/${id}`)
            .then(() => {
                dispatch(deleteContact(id));
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="scroll-box">
            <ul>
                {contacts.map(contact => (
                    <ListItem
                        selected={currentContact.id === contact.id}
                        contact={contact}
                        key={contact.id}
                        deleteContact={() => deleteListContact(contact.id)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ContactList;
