import { Input } from "@/components/ui/input";
import { useContactContext } from "@/projects/contacts/context/contact-context";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { fieldToLabel } from "@/projects/contacts/lib/helpers";
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
    if (setIsOpen) setIsOpen(false)
    navigate(`/contacts/`);
  };

  return (
    <form
      className="grid grid-cols-12 gap-3 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img
        className="col-span-2 justify-self-end"
        src="/user.png"
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
        src="/phone-504.svg"
        alt="Avatar"
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
                  <img src="/plus.svg" height={15} width={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <img
        className="col-span-2 self-start justify-self-end"
        src="/email-svgrepo-com.svg"
        alt="Avatar"
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
                placeholder="Email"
              />
              {index === 0 && (
                <button
                  className="ms-auto hover:cursor-pointer"
                  type="button"
                  onClick={() => {
                    emailAppend({ type: "Home", address: "" });
                  }}
                >
                  <img src="/plus.svg" height={15} width={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <img
        className="col-span-2 self-start justify-self-end"
        src="/notes-minimalistic-svgrepo-com.svg"
        alt="Avatar"
        width={25}
        height={25}
      />
      <div className="col-span-10 space-y-2">
        <textarea
          className="w-full border-b focus:outline-0"
          {...register("notes")}
          placeholder="Notes"
        />
      </div>

      <Button
        variant={"secondary"}
        type="submit"
        className="col-span-10 col-start-3 text-gray-800 hover:cursor-pointer"
      >
        {contact ? "Edit Contact" : "Add Contact"}
      </Button>
    </form>
  );
};

export default ContactForm;
