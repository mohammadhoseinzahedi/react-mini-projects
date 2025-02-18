import { Input } from "@/components/ui/input";
import { useContactContext } from "@/projects/contacts/context/contact-context";
import { useNavigate } from "react-router";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { Phone as PhoneIcon } from "lucide-react";
import { Mail as MailIcon } from "lucide-react";
import { Plus as PlusIcon } from "lucide-react";
import UserImage from "@/assets/user.png";
import { fieldToLabel } from "@/projects/contacts/lib/helpers";
import type { Contact } from "@/projects/contacts/lib/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactForm = ({
  contact,
  setIsOpen,
}: {
  contact?: Contact;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm<Contact>({
    defaultValues: contact,
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
        src={UserImage}
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

      <PhoneIcon className="col-span-2 mt-2 self-start justify-self-end" />
      <div className="col-span-10">
        {phoneFields.map((field, index) => (
          <div key={field.id} className="mb-2 flex gap-1 pb-2 text-sm">
            <Controller
              name={`phones.${index}.type`}
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Work">Work</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Input
              type="tel"
              className="grow text-sm"
              {...register(`phones.${index}.number`)}
              placeholder="Phone Number"
            />
          </div>
        ))}

        <Button
          variant={"outline"}
          className="w-full rounded-full border-blue-100 bg-blue-100 text-blue-600 hover:cursor-pointer"
          type="button"
          onClick={() => {
            phoneAppend({ type: "Mobile", number: "" });
          }}
        >
          <PlusIcon /> Add phone
        </Button>
      </div>

      <MailIcon className="col-span-2 mt-2 self-start justify-self-end" />
      <div className="col-span-10">
        {emailFields.map((field, index) => (
          <div key={field.id} className="mb-2 flex gap-1 border-b pb-2 text-sm">
            <Controller
              name={`emails.${index}.type`}
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Work">Work</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Input
              type="email"
              className="grow text-sm"
              {...register(`emails.${index}.address`)}
              placeholder="Email Address"
            />
          </div>
        ))}
        <Button
          variant={"outline"}
          className="w-full rounded-full border-blue-100 bg-blue-100 text-blue-600 hover:cursor-pointer"
          type="button"
          onClick={() => {
            emailAppend({ type: "Home", address: "" });
          }}
        >
          <PlusIcon /> Add email
        </Button>
      </div>

      <div className="col-span-10 col-start-3">
        <Button
          className="w-full rounded-full bg-blue-600 hover:cursor-pointer"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
