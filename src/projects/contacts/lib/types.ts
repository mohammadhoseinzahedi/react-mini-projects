// Start of contacts project types

export type Name = {
  namePrefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nameSuffix: string;
};

type Organization = {
  company: string;
  title: string;
};

export type Phone = {
  type: string;
  number: string;
};

export type Email = {
  type: string;
  address: string;
};

type Group = {
  name: string;
};

export type Contact = {
  uuid: string,
  name: Name;
  organization?: Organization;
  phones: Phone[];
  emails: Email[];
  notes: string;
  groups?: Group[];
};

// End of contacts project types
