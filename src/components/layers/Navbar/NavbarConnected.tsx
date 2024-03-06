import {Navbar,Button,IconButton,Input,Collapse,Menu,MenuHandler,} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBell,faMagnifyingGlass,faMoon,faPlay,} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Notifications from "./Notifications";

export function NavbarConnected({ toggleSidebar}: {toggleSidebar:() => void}) {
  const [openNav, setOpenNav] = useState(false);
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (dark){
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, [dark]);

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none border-b-text-200 navbar">
      <div className="text-blue-gray-900 flex justify-between items-center">
        <IconButton
          variant="text"
          size={"lg"}
          className={"bg-marine-300 rounded-2xl hover:bg-marine-100 h-5"}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faPlay} className="h-3 w-3 text-white" />
        </IconButton>
        <NavLink to={"/dashboard"} className="cursor-pointer lg:ml-[17em]">
          <img src={logo} alt={"logo de Chappy"} />
        </NavLink>

        <div className="flex items-center">
          <div className="hidden lg:flex">
            <IconButton variant="text" type='submit' className={"hover:bg-marine-100/20"} onClick={() => setDark((cur) => !cur)}>
              <FontAwesomeIcon
                icon={faMoon}
                className="h-4 w-4 text-marine-300"
              />
            </IconButton>
            <Menu>
              <MenuHandler>
                <IconButton
                  variant="text"
                  className={"hover:bg-marine-100/20 mx-3"}
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="h-4 w-4 text-marine-300"
                  />
                </IconButton>
              </MenuHandler>
              <Notifications />
            </Menu>
          </div>
          <div className="relative w-full gap-2 md:w-max hidden lg:inline-block">
            <Input
              type="search"
              color="gray"
              label="Rechercher.."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
              crossOrigin={undefined}
            />
            <Button
              size="sm"
              className="!absolute right-1 top-1 rounded bg-marine-300"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </div>
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
        <div className="flex items-center gap-x-1 mt-7">
          <div className="ml-auto flex justify-center gap-1">
            <IconButton variant="text" color="gray">
              <FontAwesomeIcon icon={faMoon} className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="relative flex w-full gap-2">
            <Input
              type="search"
              color="gray"
              label="Rechercher.."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
              crossOrigin={undefined}
            />
            <Button
              size="sm"
              className="!absolute right-1 top-1 rounded bg-marine-300"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
