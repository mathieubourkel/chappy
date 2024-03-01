/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  IconButton,
  Drawer,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChevronRight,
  faFolderPlus,
  faGear,
  faListCheck,
  faPlay,
  faRightFromBracket,
  faSquarePollHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/img/icon_sidebar.png";
import avatar from "../../../assets/img/icon_user.png";
import { NavLink } from "react-router-dom";
import { getUserInfo } from "../../../services/api/users.ts";
import NestedMenuSidebar from "./NestedMenuSidebar.tsx";
import { intProfileUser } from "../../../services/interfaces/intUser.tsx";
import "./sidebar.css"
import RejoinModalSidebar from "../../modals/RejoinModalSidebar.tsx";

export default function Sidebar(props: any) {
  const { openSidebar, toggleSidebar } = props;
  const [open, setOpen] = React.useState(0);

  const [reload, setReload] = useState<boolean>(false);
  const [user, setUser] = useState<intProfileUser>({
    address: "",
    city: "",
    myOwnGroups: [{ name: "", additionalInfos: "", description: "", id: 0 }],
    company: { name: "", additionalInfos: "", description: "", id: 0 },
    email: "",
    phone: "",
    status: 0,
    zip: '',
    firstname: "",
    lastname: "",
    id: 0,
    projects: [],
    myOwnTasks: [],
    participations: [],
    demands:[]
  });

  const idUser = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await getUserInfo();
      if (idUser == data.id) setUser(data);
    };
    fetchData();
  }, [idUser, reload]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    window.location.reload();
  };

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Drawer
      overlay={false}
      className="w-full sidebar bg-marine-300 text-white flex flex-col justify-between"
      open={openSidebar}
      onClose={toggleSidebar}
    >
      <div>
        <div className={"flex justify-end p-4"}>
          <IconButton
            variant="text"
            size={"lg"}
            className={"bg-marine-100 rounded-2xl hover:bg-marine-100/50 h-5"}
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="h-3 w-3 text-white rotate-180"
            />
          </IconButton>
        </div>

        <div className="mb-5 flex justify-center items-center gap-4">
          <NavLink to={"/dashboard"}>
            <img src={logo} alt="logo chappy" className="w-12" />
          </NavLink>
        </div>

        <Typography className="text-center font-bold uppercase text-marine-100 text-sm">
          Votre espace
        </Typography>

        <List className={"text-light-200"}>
          <ListItem className={"py-1.5 px-3 l-item hover:text-light-200"}>
            <NavLink to={"/create-project"} className={"flex items-center"}>
              <ListItemPrefix>
                <FontAwesomeIcon
                  icon={faFolderPlus}
                  className="h-3 w-3 text-light-200 bg-marine-100 p-2 rounded-lg"
                />
              </ListItemPrefix>
              Créer un projet
            </NavLink>
          </ListItem>

          <RejoinModalSidebar setReload={setReload} />

          <ListItem className={"py-1.5 px-3 l-item hover:text-light-200"}>
            <NavLink to={"/calendar"} className={"flex items-center"}>
              <ListItemPrefix>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="h-3 w-3 text-light-200 bg-marine-100 p-2 rounded-lg"
                />
              </ListItemPrefix>
              Calendrier
            </NavLink>
          </ListItem>
        </List>
      </div>

      <div
        className={
          "custom-scroll h-[65vh] flex flex-col items-center justify-start"
        }
      >
        <Typography className="text-center font-bold uppercase text-marine-100 text-sm mt-2">
          Vos projets
        </Typography>

        <List className={"text-light-200"}>
          {user.projects.map((project: any, index: number) => (
            <Accordion
              key={index}
              open={open === index}
              icon={
                <FontAwesomeIcon
                  icon={faChevronRight}
                  strokeWidth={2.5}
                  className={`mx-auto h-3 w-3 mb-0.5 text-light-200 transition-transform ${
                    open === index ? "rotate-90" : ""
                  }`}
                />
              }
            >
              <ListItem
                className="p-0 l-item hover:text-light-200"
                selected={open === index}
              >
                <AccordionHeader
                  onClick={() => handleOpen(index)}
                  className="border-b-0 px-3 py-0"
                >
                  <NavLink
                    to={"/project/" + project.id}
                    className={"flex items-center"}
                  >
                    <ListItemPrefix>
                      <FontAwesomeIcon
                        icon={faSquarePollHorizontal}
                        className="h-5 w-5 text-marine-100 p-2"
                      />
                    </ListItemPrefix>

                    <Typography color="white" className="mr-auto font-normal">
                      <span className={"text-sm"}>{project.name}</span>
                    </Typography>
                  </NavLink>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1 max-h-[20vh] custom-scroll">
                <NestedMenuSidebar steps={project.steps} />
              </AccordionBody>
            </Accordion>
          ))}

          <hr className={"mt-3 border-marine-100/20"} />
          <Accordion
            open={open === 0.1}
            icon={
              <FontAwesomeIcon
                icon={faChevronRight}
                strokeWidth={2.5}
                className={`mx-auto h-3 w-3 text-light-200 transition-transform ${
                  open === 0.1 ? "rotate-90" : ""
                }`}
              />
            }
          >
            <AccordionHeader
              onClick={() => handleOpen(0.1)}
              className="border-b-0 flex justify-between items-end"
            >
              <Typography className="text-center font-bold uppercase text-light-200">
                <span className={"text-sm"}>Vos participations</span>
              </Typography>
            </AccordionHeader>
            <AccordionBody className="p-0 max-h-[20vh] custom-scroll">
              <List className={"text-light-200"}>
                {user.participations.map((participation: any) => (
                  <ListItem
                    key={participation.id}
                    className={"py-0.5 px-3 hover:pl-2 l-small-item"}
                  >
                    <NavLink
                      to={"/project/" + participation.id}
                      className={"flex items-center"}
                    >
                      <ListItemPrefix>
                        <FontAwesomeIcon
                          icon={faSquarePollHorizontal}
                          className="h-4 w-4 text-marine-100"
                        />
                      </ListItemPrefix>
                      {participation.name}
                    </NavLink>
                  </ListItem>
                ))}
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
            open={open === 0.2}
            icon={
              <FontAwesomeIcon
                icon={faChevronRight}
                strokeWidth={2.5}
                className={`mx-auto h-3 w-3 text-light-200 transition-transform ${
                  open === 0.2 ? "rotate-90" : ""
                }`}
              />
            }
          >
            <AccordionHeader
              onClick={() => handleOpen(0.2)}
              className="border-b-0 flex justify-between items-end"
            >
              <Typography className="text-center font-bold uppercase text-light-200">
                <span className={"text-sm"}>Vos tâches</span>
              </Typography>
            </AccordionHeader>
            <AccordionBody className="p-0 max-h-[20vh] custom-scroll">
              <List className={"text-light-200"}>
                {user.myOwnTasks.map((task: any) => (
                  <ListItem
                    key={task.id}
                    className={
                      "py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2 l-small-item"
                    }
                  >
                    <NavLink
                      to={"/project/step/" + task.id}
                      className={"flex items-center"}
                    >
                      <ListItemPrefix>
                        <FontAwesomeIcon
                          icon={faListCheck}
                          className="h-4 w-4 text-marine-100"
                        />
                      </ListItemPrefix>
                      {task.name}
                    </NavLink>
                  </ListItem>
                ))}
              </List>
            </AccordionBody>
          </Accordion>
        </List>
      </div>

      <div
        className={
          "h-[22vh] flex justify-end flex-col gap-3 user-sidebar bg-marine-300 px-4"
        }
      >
        <div className={"flex items-center justify-start gap-10 my-3"}>
          <Avatar
            src={avatar}
            alt="avatar"
            size="sm"
            className={
              "border border-brick-300 shadow-xl shadow-brick-300/20 ring-8 ring-brick-300"
            }
          />
          <Typography className="text-center font-semibold text-light-200 text-sm">
            {user.firstname} {user.lastname}
          </Typography>
        </div>
        <NavLink to={"/profile"}>
          <Button className="flex items-center justify-between h-3 bg-brick-400 w-full">
            <FontAwesomeIcon icon={faGear} className={"h-4 w-4"} />
            Paramètres
          </Button>
        </NavLink>

        <Button
          onClick={handleLogout}
          className="flex items-center justify-between h-3 bg-brick-300 w-full mb-3"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className={"h-4 w-4"} />
          Se déconnecter
        </Button>
      </div>
    </Drawer>
  );
}
