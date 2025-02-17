import { PROJECTS } from "@/lib/constants";
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
import { Link } from "react-router";
import type { Project } from "@/lib/types";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="hover:bg-gray-50 flex flex-col h-full">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          <h3>Technologies and Libraries</h3>
          <div className="5 space-y-1.5 space-x-1.5">
            {project.techs.map((tech, index) => (
              <Badge key={index} variant={"outline"}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
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
