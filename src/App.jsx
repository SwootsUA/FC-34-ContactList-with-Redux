import {useDispatch} from 'react-redux';
import {Button} from '@mui/material';
import {ThemeProvider, useMediaQuery} from '@mui/material';
import createTheme from './theme';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import {setCurrentContactId} from './store/slices/currentContactSlice';
import './App.css';

function App() {
    const dispatch = useDispatch();

    const theme = createTheme(
        useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
    );

    return (
        <ThemeProvider theme={theme}>
            <header>
                <h1>Contact list</h1>
            </header>

            <ContactList />
            <ContactForm />

            <div className="btn-container">
                <Button onClick={() => dispatch(setCurrentContactId(null))}>
                    New
                </Button>
            </div>
        </ThemeProvider>
    );
}

export default App;
