import { Project } from "./types";

export const TECH_COLORS: { [key: string]: { text: string; bg: string } } = {
  TypeScript: { text: "text-blue-700", bg: "bg-blue-100" },
  React: { text: "text-blue-500", bg: "bg-blue-50" },
  "React Context API": { text: "text-green-700", bg: "bg-green-100" },
  TailwindCSS: { text: "text-teal-700", bg: "bg-teal-100" },
  "React Hook Form": { text: "text-red-700", bg: "bg-red-100" },
  Shadcn: { text: "text-purple-700", bg: "bg-purple-100" },
  "lodash-es": { text: "text-yellow-700", bg: "bg-yellow-100" },
  // Add more tech colors as needed
};

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
