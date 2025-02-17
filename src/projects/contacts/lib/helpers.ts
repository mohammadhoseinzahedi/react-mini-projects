import type { Contact } from "@/projects/contacts/lib/types";
import { clsx } from "clsx";

export function getFullName({ name, phones, emails }: Contact) {
  const fullName = clsx(
    name.namePrefix,
    name.firstName,
    name.middleName,
    name.lastName,
    name.nameSuffix,
  );
  if (fullName) return fullName;

  const phoneNumber = phones.find((phone) => phone.number)?.number;
  if (phoneNumber) return phoneNumber;

  const emailAddress = emails.find((email) => email.address)?.address;
  if (emailAddress) return emailAddress;

  return "(No name)";
}

export function fieldToLabel(field: string) {
  let label = field.replace(/[A-Z]/g, (char) => ` ${char.toLowerCase()}`);
  label = label.charAt(0).toUpperCase() + label.slice(1);
  return label;
}

export function filterContacts(contacts: Contact[], searchQuery: string) {
  return contacts
    .filter((contact) => {
      const fullName = getFullName(contact).toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      const fullNameA = getFullName(a).toLowerCase();
      const fullNameb = getFullName(b).toLowerCase();
      if (fullNameA < fullNameb) return -1;
      if (fullNameA > fullNameb) return 1;
      return 0;
    });
}
