import {useDispatch} from 'react-redux';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import {resetCurrentContact} from './store/actions/currentContactActions';
import './App.css';

function App() {
    const dispatch = useDispatch();

    return (
        <>
            <header>
                <h1>Contact list</h1>
            </header>

            <ContactList />
            <ContactForm />

            <div className="btn-container">
                <button onClick={() => dispatch(resetCurrentContact())}>
                    New
                </button>
            </div>
        </>
    );
}

export default App;
