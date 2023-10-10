import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { PhoneBook } from './App.styled';

export const App = () => {
  const [contacts, setContact] = useState(() =>
    JSON.parse(localStorage.getItem('contactsBook'))
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contactsBook', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const { name } = data;
    const newName = name.toLowerCase();

    const isExistingContact = contacts.some(
      ({ name }) => name.toLowerCase() === newName
    );

    if (isExistingContact) {
      toast.error(`${name} is already in contacts`);
      return isExistingContact;
    }

    data.id = nanoid();
    setContact(prevState => [...prevState, data]);
  };

  const deleteContact = deleteId => {
    setContact(contacts.filter(({ id }) => id !== deleteId));
  };

  const filterList = list => {
    return list.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      <PhoneBook>
        <h2>Phonebook</h2>
        <ContactForm addContact={addContact} />
        <h3>Contacts</h3>
        <Filter value={filter} handleFilter={setFilter} />

        {contacts.length ? (
          <ContactList
            contactsBook={filterList(contacts)}
            deleteContact={deleteContact}
          />
        ) : (
          <p>Contacts list is empty</p>
        )}
      </PhoneBook>
      <ToastContainer />
    </>
  );
};
