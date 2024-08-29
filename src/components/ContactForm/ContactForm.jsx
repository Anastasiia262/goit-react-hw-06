import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';

const contactFormSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  phone: Yup.string().matches(/^\d{3}-\d{2}-\d{2}$/, 'Phone number must be in the format 777-88-55').required('Required'),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values.name, values.phone));
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '', phone: '' }}
        onSubmit={handleSubmit}
        validationSchema={contactFormSchema}
      >
        <Form className={css.form}>
          <div className={css.inputBox}>
            <label htmlFor="name" className={css.label}>Name</label>
            <Field type="text" name="name" id="name" className={css.nameInput} />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>
          <div className={css.inputBox}>
            <label htmlFor="phone" className={css.label}>Phone number</label>
            <Field type="tel" name="phone" id="phone" className={css.phoneInput} />
            <ErrorMessage name="phone" component="span" className={css.error} />
          </div>
          <button type="submit" className={css.btnAdd}>Add contact</button>
        </Form>
      </Formik>
    </div>
  );
}
