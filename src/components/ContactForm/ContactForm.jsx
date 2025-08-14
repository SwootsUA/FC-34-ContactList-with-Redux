import {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {EMPTY_CONTACT} from '../../constants/constants';
import './ContactForm.css';
import {
    addContact,
    deleteContact,
    editContact,
} from '../../store/slices/contactsSlice';

function ContactForm() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contactsState.contacts);
    const currentContactId = useSelector(state => state.currentContact);

    const currentContact = useMemo(() => {
        if (!currentContactId) return EMPTY_CONTACT;
        return (
            contacts.find(({id}) => id === currentContactId) || EMPTY_CONTACT
        );
    }, [currentContactId, contacts]);

    const [currentFormContact, setCurrentFormContact] =
        useState(currentContact);

    useEffect(() => {
        setCurrentFormContact(currentContact);
    }, [currentContact]);

    function onInputChange(e) {
        setCurrentFormContact(prevFormContact => {
            return {
                ...prevFormContact,
                [e.target.name]: e.target.value,
            };
        });
    }

    function clearContactField(e) {
        setCurrentFormContact(prevFormContact => {
            return {
                ...prevFormContact,
                [e.target.parentElement.querySelector('input').name]: '',
            };
        });
    }

    function onFormSubmit(e) {
        e.preventDefault();
        if (currentFormContact.id) {
            dispatch(editContact(currentFormContact));
        } else {
            dispatch(addContact(currentFormContact));
            setCurrentFormContact(EMPTY_CONTACT);
        }
    }

    function deleteCurrentContact() {
        dispatch(deleteContact(currentFormContact.id));
    }

    return (
        <form onSubmit={onFormSubmit} className="contact-info">
            <div className="form-info">
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        onChange={onInputChange}
                        value={currentFormContact.firstName}
                        required
                    />
                    <button
                        type="button"
                        className="clear-info"
                        onClick={clearContactField}
                    >
                        X
                    </button>
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        onChange={onInputChange}
                        value={currentFormContact.lastName}
                        required
                    />
                    <button
                        type="button"
                        className="clear-info"
                        onClick={clearContactField}
                    >
                        X
                    </button>
                </div>
                <div className="input-wrapper">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={onInputChange}
                        value={currentFormContact.email}
                    />
                    <button
                        type="button"
                        className="clear-info"
                        onClick={clearContactField}
                    >
                        X
                    </button>
                </div>
                <div className="input-wrapper">
                    <input
                        type="tel"
                        placeholder="Phone number"
                        maxLength={20}
                        name="phone"
                        onChange={onInputChange}
                        value={currentFormContact.phone}
                    />
                    <button
                        type="button"
                        className="clear-info"
                        onClick={clearContactField}
                    >
                        X
                    </button>
                </div>
            </div>
            <div className="btn-container form-submit">
                <button type="submit">Save</button>
            </div>
            {currentContactId && (
                <div className="btn-container form-delete">
                    <button type="button" onClick={deleteCurrentContact}>
                        Delete
                    </button>
                </div>
            )}
        </form>
    );
}

export default ContactForm;
