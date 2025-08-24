import {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import {Button, TextField, IconButton, InputAdornment} from '@mui/material';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import {EMPTY_CONTACT, PHONE_REGEX} from '../../constants/constants';
import {
    addContact,
    deleteContact,
    editContact,
} from '../../store/slices/contactsSlice';
import './ContactForm.css';

const contactSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Please enter a valid email').optional(),
    phone: Yup.string()
        .matches(
            PHONE_REGEX,
            'Please enter a valid phone number with coutry code'
        )
        .optional(),
});

const FormikMuiTextField = ({
    type,
    name,
    placeholder,
    error,
    setFieldValue,
}) => (
    <>
        <Field
            type={type}
            name={name}
            placeholder={placeholder}
            as={TextField}
            error={error}
            helperText={error}
            sx={{width: '90%'}}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            type="button"
                            onClick={() => setFieldValue(name, '')}
                            edge="end"
                            color="secondary"
                            sx={{'&:focus': {outline: '0'}}}
                        >
                            <DisabledByDefaultRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    </>
);

function ContactForm() {
    const dispatch = useDispatch();
    const contactsState = useSelector(state => state.contactsState);
    const contacts = contactsState.contacts;
    const currentContactId = useSelector(state => state.currentContact);

    const currentContact = useMemo(() => {
        if (!currentContactId) return EMPTY_CONTACT;
        return (
            contacts.find(({id}) => id === currentContactId) || EMPTY_CONTACT
        );
    }, [currentContactId, contacts]);

    function onFormSubmit(values, {resetForm}) {
        if (values.id) {
            dispatch(editContact(values));
        } else {
            dispatch(addContact(values));
            resetForm({values: EMPTY_CONTACT});
        }
    }

    function deleteCurrentContact() {
        dispatch(deleteContact(currentContact.id));
    }

    return (
        <Formik
            initialValues={currentContact}
            onSubmit={onFormSubmit}
            validationSchema={contactSchema}
            enableReinitialize
        >
            {({isSubmitting, setFieldValue, isValid, dirty, errors}) => (
                <Form className="contact-info">
                    <div className="form-info">
                        <FormikMuiTextField
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            error={errors.firstName}
                            setFieldValue={setFieldValue}
                        />

                        <FormikMuiTextField
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            error={errors.lastName}
                            setFieldValue={setFieldValue}
                        />

                        <FormikMuiTextField
                            type="email"
                            name="email"
                            placeholder="Email"
                            error={errors.email}
                            setFieldValue={setFieldValue}
                        />

                        <FormikMuiTextField
                            type="tel"
                            name="phone"
                            placeholder="Phone number"
                            error={errors.phone}
                            setFieldValue={setFieldValue}
                        />
                    </div>
                    <div className="btn-container form-submit">
                        <Button
                            disabled={!isValid || isSubmitting || !dirty}
                            type="submit"
                            endIcon={<SaveSharpIcon />}
                        >
                            Save
                        </Button>
                    </div>
                    {currentContactId && (
                        <div className="btn-container form-delete">
                            <Button
                                onClick={deleteCurrentContact}
                                type="button"
                                color="error"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'error.dark',
                                    },
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    );
}

export default ContactForm;
