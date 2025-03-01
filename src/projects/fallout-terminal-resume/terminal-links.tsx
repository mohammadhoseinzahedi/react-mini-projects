import { useEffect, useState } from "react";

type LinkType = {
  id: number;
  text: string;
  href: string;
};
type TerminalLinksProps = {
  links: LinkType[];
};

const TerminalLinks = ({ links }: TerminalLinksProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "ArrowDown":
          setSelectedIndex((prev) =>
            prev < links.length - 1 ? prev + 1 : prev
          );
          break;
        case "Enter":
          window.location.href = links[selectedIndex].href; // Navigate to the selected link
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Cleanup function to remove the event listener
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, links]);

  return (
    <div className="links">
      {links.map((link, index) => (
        <div
          key={link.id}
          className={`link ${index === selectedIndex ? "selected" : ""}`}
          onMouseEnter={() => setSelectedIndex(index)} // Update selected index on hover
        >
          {index === selectedIndex && <span className="terminal-cursor"></span>}
          <a href={link.href}>{link.text}</a>
        </div>
      ))}
    </div>
  );
};

export default TerminalLinks;
