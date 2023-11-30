import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Input,
  Collapse,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem, Avatar
} from "@material-tailwind/react";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faBell, faClock,
  faMagnifyingGlass,
  faMoon, faPlay,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/img/logo.png";
import iUser from "../../../assets/img/icon user.png";
import {NavLink} from "react-router-dom";

export function NavbarConnected(props:any) {

  const {toggleSidebar} = props;
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none border-b-text-200 navbar">

          <div className="text-blue-gray-900 flex justify-between items-center">

            <IconButton variant="text" size={"lg"} className={"bg-marine-300 rounded-2xl hover:bg-marine-100 h-5"} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faPlay} className="h-3 w-3 text-white" />
            </IconButton>

            <NavLink
                to={"/dashboard"}
                className="cursor-pointer lg:ml-[17em]"
            >
              <img src={logo} alt={"logo de Chappy"} />
            </NavLink>

            <div className="flex items-center">
              <div className="hidden lg:flex">
                <IconButton variant="text" className={"hover:bg-marine-100/50"}>
                  <FontAwesomeIcon icon={faMoon} className="h-4 w-4 text-marine-300" />
                </IconButton>
                <Menu>
                  <MenuHandler>
                  <IconButton variant="text" className={"hover:bg-marine-100/50 mx-3"}>
                    <FontAwesomeIcon icon={faBell} className="h-4 w-4 text-marine-300" />
                  </IconButton>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8 hover:bg-marine-100/75">
                      <Avatar
                          variant="circular"
                          alt="tania andrew"
                          src={iUser}
                      />
                      <div className="flex flex-col gap-1">
                        <Typography variant="small" className="font-semibold text-marine-300">
                          Tania send you a message
                        </Typography>
                        <Typography className="flex items-center gap-1 text-sm font-medium text-brick-300">
                          <FontAwesomeIcon icon={faClock} className={"text-brick-300"}/>
                          13 minutes ago
                        </Typography>
                      </div>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8 hover:bg-marine-100/75">
                      <Avatar
                          variant="circular"
                          alt="tania andrew"
                          src={iUser}
                      />
                      <div className="flex flex-col gap-1">
                        <Typography variant="small" className="font-semibold text-marine-300">
                          Tania send you a message
                        </Typography>
                        <Typography className="flex items-center gap-1 text-sm font-medium text-brick-300">
                          <FontAwesomeIcon icon={faClock} className={"text-brick-300"}/>
                          13 minutes ago
                        </Typography>
                      </div>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8 hover:bg-marine-100/75">
                      <Avatar
                          variant="circular"
                          alt="tania andrew"
                          src={iUser}
                      />
                      <div className="flex flex-col gap-1">
                        <Typography variant="small" className="font-semibold text-marine-300">
                          Tania send you a message
                        </Typography>
                        <Typography className="flex items-center gap-1 text-sm font-medium text-brick-300">
                          <FontAwesomeIcon icon={faClock} className={"text-brick-300"}/>
                          13 minutes ago
                        </Typography>
                      </div>
                    </MenuItem>
                  </MenuList>
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
                    }} crossOrigin={undefined}                />
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
                    }} crossOrigin={undefined}                />
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