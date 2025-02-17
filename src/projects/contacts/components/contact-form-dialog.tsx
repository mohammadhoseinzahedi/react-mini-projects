import { useState } from "react";
import ContactForm from "@/projects/contacts/components/contact-form";
import { BASE_URL } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ContactFormDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="mx-auto mb-2 flex flex-col items-center rounded-full border px-6 py-1 text-xs hover:cursor-pointer"
        >
          <img src={`${BASE_URL}plus.svg`} alt="Plus Icon" width={14} height={14} />
          <div className="text-gray-800">New contact</div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-svh overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Contact</DialogTitle>
          <DialogDescription>contact</DialogDescription>
        </DialogHeader>
        <ContactForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;