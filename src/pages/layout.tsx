import { Outlet } from "react-router";
import { Link } from "react-router";
import { House as HouseIcon } from "lucide-react";
import Container from "@/components/container";

const MainLayout = () => {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <Container className="flex gap-4 py-2 justify-center">
          <Link to={"/"}>
            <HouseIcon />
          </Link>
        </Container>
      </header>
      <Outlet />
    </>
  );
};

export default MainLayout;
