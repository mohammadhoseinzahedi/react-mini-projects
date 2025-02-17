import { useCallback, useMemo, useState } from "react";
import { filterContacts } from "@/projects/contacts/lib/helpers";
import { useContactContext } from "@/projects/contacts/context/contact-context";
import Container from "@/components/container";
import SearchBar from "@/projects/contacts/components/search-bar";
import ContactItem from "@/projects/contacts/components/contact-item";
import ContactFormDialog from "@/projects/contacts/components/contact-form-dialog";

const ContactsPage = () => {
  const { contacts } = useContactContext();
  const [searchQuery, setSearchQuery] = useState("");
  const contactsLength = contacts.length;

  const handleSearchBarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  const filteredContacts = useMemo(
    () => filterContacts(contacts, searchQuery),
    [contacts, searchQuery],
  );

  return (
    <Container>
      <SearchBar
        contactsLength={contactsLength}
        onSearchBarChange={handleSearchBarChange}
      />
      <ContactFormDialog />
      {filteredContacts.map((contact, index) => (
        <ContactItem key={index} contact={contact} />
      ))}
    </Container>
  );
};

export default ContactsPage;
