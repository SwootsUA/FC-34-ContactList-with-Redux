import {connect} from 'react-redux';
import {setCurrentContact} from '../../store/actions/currentContactActions';
import './ListItem.css';

function ListItem({selected, contact, setCurrentContact, deleteContact}) {
    return (
        <li
            className={selected ? 'active' : ''}
            onDoubleClick={() => setCurrentContact(contact)}
        >
            {`${contact.firstName} ${contact.lastName}`}
            <button
                className="delete-user-btn"
                onClick={e => {
                    e.stopPropagation();
                    deleteContact(contact.id);
                }}
            >
                X
            </button>
        </li>
    );
}

const mapDispatchToProps = {
    setCurrentContact,
};

export default connect(null, mapDispatchToProps)(ListItem);
