import { useParams, useNavigate, Link } from "react-router";
import { useContactContext } from "@/projects/contacts/context/contact-context";
import { getFullName } from "@/projects/contacts/lib/helpers";
import Container from "@/components/container";
import { BASE_URL } from "@/lib/constants";
import type { Phone, Email, Contact } from "@/projects/contacts/lib/types";

const Header = ({ contact }: { contact: Contact }) => {
  const navigate = useNavigate();
  const { deleteContact } = useContactContext();
  return (
    <header className="bg-indigo-900 text-white">
      <Container className="flex flex-wrap items-center gap-4 py-3">
        <Link to="/contacts">
          <img
            src={`${BASE_URL}white-arrow-svgrepo-com.svg`}
            alt="Back"
            width={24}
            height={24}
          />
        </Link>
        <h1>{getFullName(contact)}</h1>

        <Link to={`/contacts/${contact.uuid}/edit`} className="ms-auto">
          <img
            src={`${BASE_URL}edit-button-svgrepo-com.svg`}
            alt="Edit"
            width={20}
            height={20}
          />
        </Link>
        <button
          className="hover:cursor-pointer"
          type="button"
          onClick={() => {
            deleteContact(contact.uuid);
            navigate("/contacts");
          }}
        >
          <img
            src={`${BASE_URL}delete-svgrepo-com.svg`}
            alt="Delete"
            width={20}
            height={20}
          />
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
        <img
          className=""
          src={`${BASE_URL}phone-504.svg`}
          alt="Phone Icon"
          width={20}
          height={20}
        />
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
        <img
          src={`${BASE_URL}email-svgrepo-com.svg`}
          alt="Email"
          width={24}
          height={30}
        />
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
      <img
        src={`${BASE_URL}notes-minimalistic-svgrepo-com.svg`}
        alt="Notes"
        width={24}
        height={30}
      />
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
