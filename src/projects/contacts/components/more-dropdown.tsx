import { useNavigate } from "react-router";
import { useContactContext } from "@/projects/contacts/context/contact-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MoreDropDown = ({ contactId }: { contactId: string }) => {
  const { deleteContact } = useContactContext();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          className="hover:cursor-pointer"
          src="/three-dots-vertical.svg"
          alt="More"
          width={20}
          height={20}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigate(`/contacts/${contactId}/edit`);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigate(`/contacts/${contactId}`);
          }}
        >
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteContact(contactId)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreDropDown;