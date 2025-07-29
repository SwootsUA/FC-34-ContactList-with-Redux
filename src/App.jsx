import {connect} from 'react-redux';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';
import {resetCurrentContact} from './store/actions/currentContactActions';

function App({resetCurrentContact}) {
    return (
        <>
            <header>
                <h1>Contact list</h1>
            </header>

            <ContactList />
            <ContactForm />

            <div className="btn-container">
                <button onClick={resetCurrentContact}>New</button>
            </div>
        </>
    );
}

const mapDispatchToProps = {
    resetCurrentContact,
};

export default connect(null, mapDispatchToProps)(App);
