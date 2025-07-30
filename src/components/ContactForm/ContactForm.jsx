import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {nanoid} from 'nanoid';
import api from '../../api/contacts-service';
import {
    addContact,
    deleteContact,
    editContact,
} from '../../store/actions/contactActions';
import {resetCurrentContact} from '../../store/actions/currentContactActions';
import './ContactForm.css';

function ContactForm() {
    const dispatch = useDispatch();
    const currentContact = useSelector(state => state.currentContact);

    const [currentFormContact, setCurrentFormContact] = useState({
        ...currentContact,
    });

    useEffect(() => {
        setCurrentFormContact({...currentContact});
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
        const submitContact = {...currentFormContact};
        if (submitContact.id) {
            api.put(`/contacts/${submitContact.id}`, submitContact)
                .then(({data}) => {
                    dispatch(editContact(data));
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            submitContact.id = nanoid();
            api.post('/contacts', submitContact)
                .then(({data}) => {
                    dispatch(addContact(data));
                })
                .catch(error => console.error(error));
            dispatch(resetCurrentContact());
        }
    }

    function deleteCurrentContact() {
        api.delete(`/contacts/${currentFormContact.id}`)
            .then(() => {
                dispatch(deleteContact(currentFormContact.id));
            })
            .catch(error => console.error(error));
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
            {currentContact.id && (
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
