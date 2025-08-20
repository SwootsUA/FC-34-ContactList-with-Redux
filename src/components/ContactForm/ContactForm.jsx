import {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {EMPTY_CONTACT, PHONE_REGEX} from '../../constants/constants';
import {
    addContact,
    deleteContact,
    editContact,
} from '../../store/slices/contactsSlice';
import './ContactForm.css';

const contactSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().optional(),
    phone: Yup.string().matches(PHONE_REGEX).optional(),
});

function ClearFieldButton({fieldName, setFieldValue}) {
    return (
        <button
            type="button"
            className="clear-info"
            onClick={() => setFieldValue(fieldName, '')}
        >
            X
        </button>
    );
}

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
            {({isSubmiting, setFieldValue}) => (
                <Form className="contact-info">
                    <div className="form-info">
                        <div className="input-wrapper">
                            <Field
                                type="text"
                                name="firstName"
                                placeholder="First name"
                            />
                            <ClearFieldButton
                                fieldName={'firstName'}
                                setFieldValue={setFieldValue}
                            />
                            <ErrorMessage name="firstName" />
                        </div>
                        <div className="input-wrapper">
                            <Field
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                            />
                            <ClearFieldButton
                                fieldName={'lastName'}
                                setFieldValue={setFieldValue}
                            />
                            <ErrorMessage name="lastName" />
                        </div>
                        <div className="input-wrapper">
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            <ClearFieldButton
                                fieldName={'email'}
                                setFieldValue={setFieldValue}
                            />
                            <ErrorMessage name="email" />
                        </div>
                        <div className="input-wrapper">
                            <Field
                                type="tel"
                                name="phone"
                                placeholder="Phone number"
                            />
                            <ClearFieldButton
                                fieldName={'phone'}
                                setFieldValue={setFieldValue}
                            />
                            <ErrorMessage name="phone" />
                        </div>
                    </div>
                    <div className="btn-container form-submit">
                        <button type="submit" disabled={isSubmiting}>
                            Save
                        </button>
                    </div>
                    {currentContactId && (
                        <div className="btn-container form-delete">
                            <button
                                type="button"
                                onClick={deleteCurrentContact}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    );
}

export default ContactForm;
