import {useEffect} from 'react';
import {connect} from 'react-redux';
import ListItem from '../ListItem/ListItem';
import {deleteContact, getContacts} from '../../store/actions/contactActions';
import api from '../../api/contacts-service';
import './ContactList.css';

function ContactList({contacts, getContacts, currentContact, deleteContact}) {
    useEffect(() => {
        api.get('/contacts').then(({data}) => getContacts(data));
    }, [getContacts]);

    function deleteListContact(id) {
        api.delete(`/contacts/${id}`)
            .then(() => {
                deleteContact(id);
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

const mapStateToProps = ({contacts, currentContact}) => ({
    contacts,
    currentContact,
});

const mapDispatchToProps = {
    getContacts,
    deleteContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
