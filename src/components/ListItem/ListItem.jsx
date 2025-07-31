import {memo} from 'react';
import {useDispatch} from 'react-redux';
import {setCurrentContactId} from '../../store/actions/currentContactActions';
import './ListItem.css';

function ListItem({selected, contact, deleteContact}) {
    const dispatch = useDispatch();

    return (
        <li
            className={selected ? 'active' : ''}
            onDoubleClick={() => dispatch(setCurrentContactId(contact.id))}
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

export default memo(ListItem);
