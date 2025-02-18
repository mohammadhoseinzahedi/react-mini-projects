import { useParams, useNavigate, Link } from "react-router";
import { useContactContext } from "@/projects/contacts/context/contact-context";
import { Mail as MailIcon } from "lucide-react";
import { Phone as PhoneIcon } from "lucide-react";
import { NotepadText as NotesIcon } from "lucide-react";
import { ArrowLeft as BackIcon } from "lucide-react";
import { FilePenLine as EditIcon } from "lucide-react";
import { Trash2 as DeleteIcon } from "lucide-react";
import { getFullName } from "@/projects/contacts/lib/helpers";
import Container from "@/components/container";
import type { Phone, Email, Contact } from "@/projects/contacts/lib/types";

const Header = ({ contact }: { contact: Contact }) => {
  const navigate = useNavigate();
  const { deleteContact } = useContactContext();
  return (
    <header className="bg-indigo-900 text-white">
      <Container className="flex flex-wrap items-center gap-4 py-3">
        <Link to="/contacts">
          <BackIcon className="self-center" />
        </Link>
        <h1>{getFullName(contact)}</h1>

        <Link to={`/contacts/${contact.uuid}/edit`} className="ms-auto">
          <EditIcon />
        </Link>
        <button
          className="hover:cursor-pointer"
          type="button"
          onClick={() => {
            deleteContact(contact.uuid);
            navigate("/contacts");
          }}
        >
          <DeleteIcon />
        </button>
      </Container>
    </header>
  );
};

const PhoneItem = ({ phone }: { phone: Phone }) => {
  return (
    <li>
      <a
        className="flex gap-4 py-2 hover:text-blue-800"
        href={`tel:${phone.number}`}
      >
        <PhoneIcon className="self-center" />
        <div className="grow border-b pb-2">
          <div>{phone.number}</div>
          <div className="text-gray-700">{phone.type}</div>
        </div>
      </a>
    </li>
  );
};

const EmailItem = ({ email }: { email: Email }) => {
  return (
    <li>
      <a
        className="flex gap-4 py-2 hover:text-blue-800"
        href={`mailto:${email.address}`}
      >
        <MailIcon className="self-center" />
        <div className="grow border-b pb-2">
          <div>{email.address}</div>
          <div className="text-gray-700">{email.type}</div>
        </div>
      </a>
    </li>
  );
};

const NotesItem = ({ notes }: { notes: string }) => {
  if (!notes) return <></>;
  return (
    <div className="flex gap-4 py-2">
      <NotesIcon className="self-center" />
      <div className="grow border-b pb-2">
        <p>{notes}</p>
        <div className="text-gray-700">Notes</div>
      </div>
    </div>
  );
};

const PhoneList = ({ phones }: { phones: Phone[] }) => {
  return (
    <ul>
      {phones.map((phone, index) => (
        <PhoneItem key={index} phone={phone} />
      ))}
    </ul>
  );
};

const EmailList = ({ emails }: { emails: Email[] }) => {
  return (
    <ul>
      {emails.map((email, index) => (
        <EmailItem key={index} email={email} />
      ))}
    </ul>
  );
};

const ContactPage = () => {
  const { uuid } = useParams();
  const { getContact } = useContactContext();
  const contact = getContact(uuid);
  if (!contact) return <>Not found!</>;
  return (
    <section>
      <Header contact={contact} />
      <Container className="py-2">
        <PhoneList phones={contact.phones} />
        <EmailList emails={contact.emails} />
        <NotesItem notes={contact.notes} />
      </Container>
    </section>
  );
};

export default ContactPage;
