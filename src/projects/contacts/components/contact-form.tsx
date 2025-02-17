import { Input } from "@/components/ui/input";
import { useContactContext } from "@/projects/contacts/context/contact-context";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { fieldToLabel } from "@/projects/contacts/lib/helpers";
import { BASE_URL } from "@/lib/constants";
import type { Contact } from "@/projects/contacts/lib/types";
import { Button } from "@/components/ui/button";

const ContactForm = ({
  contact,
  setIsOpen,
}: {
  contact?: Contact;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm<Contact>({
    defaultValues: {
      name: {
        namePrefix: contact?.name?.namePrefix || "",
        firstName: contact?.name?.firstName || "",
        middleName: contact?.name?.middleName || "",
        lastName: contact?.name?.lastName || "",
        nameSuffix: contact?.name?.nameSuffix || "",
      },
      phones: contact?.phones?.length
        ? contact.phones
        : [{ type: "Mobile", number: "" }],
      emails: contact?.emails?.length
        ? contact.emails
        : [{ type: "Home", address: "" }],
      notes: contact?.notes || "",
    },
  });
  const { fields: phoneFields, append: phoneAppend } = useFieldArray({
    control,
    name: "phones",
  });
  const { fields: emailFields, append: emailAppend } = useFieldArray({
    control,
    name: "emails",
  });
  const { addContact, updateContact } = useContactContext();
  const onSubmit: SubmitHandler<Contact> = (data) => {
    const filteredData = {
      ...data,
      phones: data.phones.filter((phone) => phone.number.trim() !== ""),
      emails: data.emails.filter((email) => email.address.trim() !== ""),
    };
    if (contact) {
      updateContact(contact.uuid, filteredData);
    } else {
      addContact(filteredData);
    }
    if (setIsOpen) setIsOpen(false);
    navigate(`/contacts/`);
  };

  return (
    <form
      className="grid grid-cols-12 gap-3 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img
        className="col-span-2 justify-self-end"
        src={`${BASE_URL}user.png`}
        alt="Avatar"
        width={50}
        height={50}
      />
      <div className="col-span-10 space-y-2">
        {(
          [
            "namePrefix",
            "firstName",
            "middleName",
            "lastName",
            "nameSuffix",
          ] as const
        ).map((field, index) => (
          <Input
            className="rounded-none border-0 border-b ps-0 text-sm shadow-none focus-visible:ring-0"
            key={index}
            {...register(`name.${field}`)}
            placeholder={fieldToLabel(field)}
          />
        ))}
      </div>

      <img
        className="col-span-2 self-start justify-self-end"
        src={`${BASE_URL}phone-504.svg`}
        alt="Phone Icon"
        width={20}
        height={20}
      />
      <div className="col-span-10">
        {phoneFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-2 flex flex-wrap border-b pb-2 text-sm"
          >
            <select className="" {...register(`phones.${index}.type`)}>
              <option value="Mobile">Mobile</option>
              <option value="Work">Work</option>
              <option value="Home">Home</option>
            </select>
            <div className="flex grow">
              <input
                type="tel"
                className="focus:outline-0"
                {...register(`phones.${index}.number`)}
                placeholder="Phone Number"
              />
              {index === 0 && (
                <button
                  className="ms-auto hover:cursor-pointer"
                  type="button"
                  onClick={() => {
                    phoneAppend({ type: "Mobile", number: "" });
                  }}
                >
                  <img src={`${BASE_URL}plus.svg`} height={15} width={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <img
        className="col-span-2 self-start justify-self-end"
        src={`${BASE_URL}email-svgrepo-com.svg`}
        alt="Email Icon"
        width={24}
        height={30}
      />
      <div className="col-span-10">
        {emailFields.map((field, index) => (
          <div
            key={field.id}
            className="mb-2 flex flex-wrap border-b pb-2 text-sm"
          >
            <select className="" {...register(`emails.${index}.type`)}>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>
            <div className="flex grow">
              <input
                type="email"
                className="focus:outline-0"
                {...register(`emails.${index}.address`)}
                placeholder="Email Address"
              />
              {index === 0 && (
                <button
                  className="ms-auto hover:cursor-pointer"
                  type="button"
                  onClick={() => {
                    emailAppend({ type: "Home", address: "" });
                  }}
                >
                  <img src={`${BASE_URL}plus.svg`} height={15} width={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-12">
        <Button type="submit">Save Contact</Button>
      </div>
    </form>
  );
};

export default ContactForm;