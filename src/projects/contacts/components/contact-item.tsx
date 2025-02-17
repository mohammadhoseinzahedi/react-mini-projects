import { useNavigate } from "react-router";
import { getFullName } from "@/projects/contacts/lib/helpers";
import MoreDropDown from "@/projects/contacts/components/more-dropdown";
import UserImage from "@/assets/user.png";
import type { Contact } from "@/projects/contacts/lib/types";

const ContactItem = ({ contact }: { contact: Contact }) => {
  const navigate = useNavigate();
  const fullName = getFullName(contact);
  const formattedFullName =
    fullName.length >= 20 ? `${fullName.slice(0, 17)}....` : fullName;
  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-3 text-sm text-slate-800 hover:bg-gray-100">
      <div>#</div>
      <img src={UserImage} alt="Avatar" width={40} height={40} />
      <div
        onClick={() => {
          navigate(`/contacts/${contact.uuid}`);
        }}
        className="grow border-b border-gray-200 py-3 hover:cursor-pointer"
      >
        {formattedFullName}
      </div>
      <MoreDropDown contactId={contact.uuid} />
    </div>
  );
};

export default ContactItem;