import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';
import './ContactList.css';

function ContactList({selectedId, contacts, enterEditMode, deleteContact}) {
    return (
        <div className="scroll-box">
            <ul>
                {contacts.map(contact => (
                    <ListItem
                        selected={selectedId === contact.id}
                        contact={contact}
                        enterEditMode={enterEditMode}
                        key={contact.id}
                        deleteContact={deleteContact}
                    />
                ))}
            </ul>
        </div>
    );
}

ContactList.defaultProps = {
    contacts: [],
};

ContactList.propTypes = {
    contacts: PropTypes.array,
};

export default ContactList;
