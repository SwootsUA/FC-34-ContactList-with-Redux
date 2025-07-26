import './ListItem.css';

function ListItem({selected, contact, enterEditMode, deleteContact}) {
    return (
        <li
            className={selected ? 'active' : ''}
            onDoubleClick={() => enterEditMode(contact.id)}
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

export default ListItem;
