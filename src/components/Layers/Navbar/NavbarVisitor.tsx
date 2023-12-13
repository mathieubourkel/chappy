import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import logo from "../../../assets/img/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";

export function NavbarVisitor() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const currentURL = useLocation();

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none border-b-text-200">
      <div className="flex items-center justify-between text-blue-gray-900">
        
        <Typography className="mr-4 cursor-pointer m-auto">
        <Link to='/'>
          <img src={logo} alt={"logo de Chappy"} />
          </Link>
        </Typography>
        
        <div className="flex items-center gap-4">
        <NavLink to={"/login"}>
          <div className="flex items-center gap-x-1">
            {currentURL.pathname !== "/login" && (
              <Button
                size="sm"
                className="hidden lg:inline-block bg-marine-300"
              >
                Connexion
              </Button>
            )}
          </div>
          </NavLink>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
      <Link to={"/login"}>
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="gradient" size="sm">
            Connexion
          </Button>
        </div>
        </Link>
      </Collapse>
    </Navbar>
  );
}
