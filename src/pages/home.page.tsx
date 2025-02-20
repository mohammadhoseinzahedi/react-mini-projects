import { PROJECTS, TECH_COLORS } from "@/lib/constants";
import Container from "@/components/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import type { Project } from "@/lib/types";
import { Settings as SettingsIcon } from "lucide-react";

const TechList = (props: { techs: string[] }) => {
  return (
    <div role="list" className="5 space-y-1.5 space-x-1.5">
      {props.techs.map((tech, index) => {
        const { text, bg } = TECH_COLORS[tech] || {
          text: "text-gray-700",
          bg: "bg-gray-100",
        };
        return (
          <Badge role="listitem" key={index} className={`${text} ${bg}`} variant={"outline"}
          >
            {tech}
          </Badge>
        );
      })}
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="flex h-full flex-col hover:bg-gray-50">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="flex gap-2">
          <SettingsIcon /> Tech Stack
        </h3>
        <Separator className="my-3" />
        <TechList techs={project.techs} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

const ProjectList = () => {
  return (
    <ul className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((project, index) => (
        <li key={index}>
          <Link to={project.href}>
            <ProjectCard project={project} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

const HomePage = () => {
  return (
    <Container>
      <ProjectList />
    </Container>
  );
};

export default HomePage;
