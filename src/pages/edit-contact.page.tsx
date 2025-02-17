import { useParams } from "react-router";
import { useContactContext } from "@/projects/contacts/context/contact-context";
import ContactForm from "@/projects/contacts/components/contact-form";
import  Container  from "@/components/container";

const EditContactPage = () => {
  const { uuid } = useParams();
  const { contacts } = useContactContext();
  const contact = contacts.find((contact) => contact.uuid === uuid);
  if (!contact) return <>Not found!</>;

  return (
    <Container className="py-8 ">
      <ContactForm contact={contact} />
    </Container>
  );
};

export default EditContactPage;
