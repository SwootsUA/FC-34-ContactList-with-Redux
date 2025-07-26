import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './ContactForm.css';

function ContactForm({
    currentContact,
    EMPTY_CONTACT,
    saveContact,
    deleteContact,
}) {
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

    function clearContact() {
        setCurrentFormContact({...EMPTY_CONTACT});
    }

    function onFormSubmit(e) {
        e.preventDefault();
        saveContact(currentFormContact);

        if (!currentFormContact.id) {
            clearContact();
        }
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
                    <button
                        type="button"
                        // to make sure arguments are empty and event aren't passed through
                        onClick={() => {
                            deleteContact();
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </form>
    );
}

ContactForm.propTypes = {
    saveContact: PropTypes.func.isRequired,
};

export default ContactForm;
