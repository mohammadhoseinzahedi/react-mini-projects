import TerminalLinks from "@/projects/fallout-terminal-resume/terminal-links";

const links = [
  {
    id: 1,
    text: "> Visit My Github Profile",
    href: "https://github.com/mohammadhoseinzahedi/",
  },
  {
    id: 2,
    text: "> Visit My LinkedIn Profile",
    href: "https://www.linkedin.com/in/mohammad-hosein-zahedi-582687353/",
  },
  {
    id: 3,
    text: "> Project 1: My React Mini Projects",
    href: "https://mohammadhoseinzahedi.github.io/react-mini-projects/",
  },
  {
    id: 4,
    text: "> Project 2: Football Scoreboard and Standings",
    href: "https://namaball.vercel.app/",
  },
];

export default function ResumePage() {
  return (
    <div className="terminal-wrapper"> {/* Adjust height to account for header */}
      <div className="terminal"> {/* Ensure terminal takes full height */}
        <div className="terminal-output">
          <h1>Mohammad Hosein Zahedi</h1>
          <h2>Junior NextJS Developer</h2>
          <p>
            Hi, I’m a passionate and self-taught developer specializing in
            Next.js and React. Though I’m just starting my journey, I’ve built
            several projects showcasing my skills in responsive design, API
            integration, and dynamic web applications. I’m eager to learn, grow,
            and contribute to real-world projects while delivering clean,
            efficient, and user-friendly solutions.
          </p>

          {/* Links for navigation */}
          <TerminalLinks links={links} />
        </div>
      </div>
    </div>
  );
}