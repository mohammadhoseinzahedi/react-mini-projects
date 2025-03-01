import { Outlet } from "react-router";
import { Link } from "react-router";
import { House as HouseIcon } from "lucide-react";
import GithubIcon from "@/assets/github.svg";
import Container from "@/components/container";

const MainLayout = () => {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <Container className="flex justify-center gap-4 py-2">
          <Link to={"/"}>
            <HouseIcon />
          </Link>
          <Link
            to={"https://github.com/mohammadhoseinzahedi/react-mini-projects"}
          >
            <img src={GithubIcon} alt="Github Icon" height={24} width={24} />
          </Link>
        </Container>
      </header>
      {/* Add padding-top to Outlet to account for the sticky header */}
      <div> {/* Adjust this value based on your header's height */}
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;