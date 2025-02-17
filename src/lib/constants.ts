import { Project } from "./types";

export const PROJECTS: readonly Project[] = [
  {
    title: "Contacts",
    description: "A simple contact list",
    // image: "https://via.placeholder.com/150",
    href: "/contacts",
    techs: [
      "TypeScript",
      "React",
      "React Context API",
      "TailwindCSS",
      "React Hook Form",
      "Shadcn",
    ],
  },
  {
    title: "Memory Match Game",
    description: "A simple react memory match game",
    // image: "https://via.placeholder.com/150",
    href: "/memory-match-game",
    techs: ["TypeScript", "React", "TailwindCSS", "lodash-es"],
  },
] as const;
