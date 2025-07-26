import {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import api from './api/contacts-service';
import './App.css';

const EMPTY_CONTACT = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
};

function App() {
    const [currentContact, setCurrentContact] = useState({...EMPTY_CONTACT});
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        api.get('/').then(({data}) => {
            if (data) {
                setContacts(data);
            }
        });
    }, []);

    function saveContact(passedContact) {
        if (passedContact.id) {
            editContact(passedContact);
        } else {
            addContact(passedContact);
        }
    }

    function editContact(passedContact) {
        api.put(`/${passedContact.id}`, passedContact)
            .then(({data}) => {
                setContacts(
                    contacts.map(contact =>
                        contact.id === passedContact.id ? data : contact
                    )
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

    function addContact(passedContact) {
        passedContact.id = nanoid();

        api.post('/', passedContact)
            .then(({data}) => {
                setContacts(prevContacts => [...prevContacts, data]);
            })
            .catch(error => {
                console.error(error);
            });

        exitEditMode();
    }

    function deleteContact(passedId) {
        const deleteId = passedId ? passedId : currentContact.id;
        api.delete(`/${deleteId}`)
            .then(() => {
                setContacts(prevContacts =>
                    prevContacts.filter(contact => contact.id !== deleteId)
                );
                if (deleteId === currentContact.id) {
                    exitEditMode();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    function enterEditMode(passedId) {
        setCurrentContact(contacts.find(contact => contact.id === passedId));
    }

    function exitEditMode() {
        setCurrentContact({...EMPTY_CONTACT});
    }

    return (
        <>
            <header>
                <h1>Contact list</h1>
            </header>

            <ContactList
                contacts={contacts}
                selectedId={currentContact.id}
                enterEditMode={enterEditMode}
                deleteContact={deleteContact}
            />

            <ContactForm
                currentContact={currentContact}
                saveContact={saveContact}
                deleteContact={deleteContact}
                EMPTY_CONTACT={EMPTY_CONTACT}
            />

            <div className="btn-container">
                <button onClick={exitEditMode}>New</button>
            </div>
        </>
    );
}

export default App;
