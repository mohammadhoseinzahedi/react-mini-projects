import { v4 as uuidv4 } from "uuid";
import { Contact } from "@/projects/contacts/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

type ContactContextType = {
  contacts: Contact[];
  getContact: (uuid: unknown) => Contact | undefined;
  addContact: (contact: Contact) => void;
  updateContact: (uuid: string, updatedContact: Contact) => void;
  deleteContact: (uuid: string) => void;
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContactContext must be used within a ContactProvider");
  }
  return context;
};

export const ContactContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [];
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const getContact = (uuid: unknown) => {
    return contacts.find((contact) => contact.uuid === uuid);
  };

  const addContact = (contact: Contact) => {
    setContacts((prev) => [...prev, { ...contact, uuid: uuidv4() }]);
  };

  const updateContact = (uuid: string, updatedContact: Contact) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.uuid === uuid ? { ...updatedContact, uuid } : contact,
      ),
    );
  };

  const deleteContact = (uuid: string) => {
    setContacts((prev) => prev.filter((contact) => contact.uuid !== uuid));
  };
  return (
    <ContactContext.Provider
      value={{ contacts, getContact, addContact, updateContact, deleteContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};
