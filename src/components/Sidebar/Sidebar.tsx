import React from "react";
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
  Button, Avatar,
} from "@material-tailwind/react";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faCalendarDays, faChartPie,
  faChevronRight,
  faFolderPlus, faGear, faListCheck,
  faPlay,
  faPlus, faRightFromBracket,
  faSquarePollHorizontal,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./../../assets/img/icon_sidebar.png";
import avatar from "./../../assets/img/icon user.png";
import {NavLink} from "react-router-dom";

export function Sidebar(props:any) {

  const {openSidebar, toggleSidebar} = props;
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value:any) => {
    setOpen(open === value ? 0 : value);
  };

  return (
      <Drawer className="w-full max-w-[20rem] p-4 sidebar bg-marine-300 text-white" open={openSidebar} onClose={toggleSidebar}>
        <div className={"flex justify-end"}>
          <IconButton variant="text" size={"lg"} className={'bg-marine-100 rounded-2xl hover:bg-marine-100/50 h-5'} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faPlay} className='h-3 w-3 text-white rotate-180' />
          </IconButton>
        </div>

        <div className="mb-2 flex justify-center items-center gap-4 p-4">
          <NavLink to={'/dashboard'}><img src={logo} alt="logo chappy" className="w-12" /></NavLink>
        </div>

        <Typography className="text-center font-bold uppercase text-marine-100 text-sm">
          Votre espace
        </Typography>

        <List className={"text-light-200"}>
          <ListItem className={"py-1.5 px-3 l-item hover:text-light-200"}>
            <NavLink to={'/project'} className={"flex items-center"}>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faFolderPlus} className="h-3 w-3 text-light-200 bg-marine-100 p-2 rounded-lg" />
              </ListItemPrefix>
              Créer un projet
            </NavLink>
          </ListItem>
          <ListItem className={"py-1.5 px-3 l-item hover:text-light-200"}>
            <NavLink to={'/project'} className={"flex items-center"}>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faPlus} className="h-3 w-3 text-light-200 bg-marine-100 p-2 rounded-lg" />
              </ListItemPrefix>
              Rejoindre un projet
            </NavLink>
          </ListItem>
          <ListItem className={"py-1.5 px-3 l-item hover:text-light-200"}>
            <NavLink to={'/calendar'} className={"flex items-center"}>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faCalendarDays} className="h-3 w-3 text-light-200 bg-marine-100 p-2 rounded-lg" />
              </ListItemPrefix>
              Calendrier
            </NavLink>
          </ListItem>
        </List>

        <Typography className="text-center font-bold uppercase text-marine-100 text-sm mt-3">
          Vos projets
        </Typography>

        <List className={"text-light-200"}>
          <Accordion
              open={open === 1}
              icon={
                <FontAwesomeIcon icon={faChevronRight}
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 mb-0.5 text-light-200 transition-transform ${open === 1 ? "rotate-90" : ""}`}
                />
              }
          >
            <ListItem className="p-0  l-item hover:text-light-200" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 px-3 py-0">
                <ListItemPrefix>
                  <FontAwesomeIcon icon={faSquarePollHorizontal} className="h-5 w-5 text-marine-100 p-2" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                  Nom du projet
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem className={"py-1.5 px-3 hover:bg-marine-300/50 hover:text-marine-100 text-light-200 hover:pl-2 text-sm"}>
                  <NavLink to={'/project/step'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faChartPie} strokeWidth={3} className="h-4 w-4 pl-5 text-marine-100" />
                    </ListItemPrefix>
                    Nom du jalon
                  </NavLink>
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
              open={open === 2}
              icon={
                <FontAwesomeIcon icon={faChevronRight}
                                 strokeWidth={2.5}
                                 className={`mx-auto mb-0.5 h-3 w-3 text-light-200 transition-transform ${open === 2 ? "rotate-90" : ""}`}
                />
              }
          >
            <ListItem className="p-0  l-item hover:text-light-200" selected={open === 2}>
              <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 px-3 py-0">
                <ListItemPrefix>
                  <FontAwesomeIcon icon={faSquarePollHorizontal} className="h-5 w-5 text-marine-100 p-2" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                  Nom du projet
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem className={"py-1.5 px-3 hover:bg-marine-300/50 hover:text-marine-100 text-light-200 hover:pl-2 text-sm"}>
                  <NavLink to={'/project/step'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faChartPie} strokeWidth={3} className="h-4 w-4 pl-5 text-marine-100" />
                    </ListItemPrefix>
                    Nom du jalon
                  </NavLink>
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          <hr className={"my-5 border-marine-100/20"} />
          <Accordion
              open={open === 11}
              icon={
                <FontAwesomeIcon icon={faChevronRight}
                                 strokeWidth={2.5}
                                 className={`mx-auto h-3 w-3 text-light-200 transition-transform ${open === 11 ? "rotate-90" : ""}`}
                />
              }
          >
            <AccordionHeader onClick={() => handleOpen(11)} className="border-b-0 flex justify-between items-end">
              <Typography className="text-center font-bold uppercase text-light-200 text-sm">
                Vos participations
              </Typography>
            </AccordionHeader>
            <AccordionBody className="p-0">
              <List className={"text-light-200"}>
                <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                  <NavLink to={'/project/'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faSquarePollHorizontal} className="h-4 w-4 text-light-200" />
                    </ListItemPrefix>
                    Nom du projet
                  </NavLink>
                </ListItem>
                <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                  <NavLink to={'/project/'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faSquarePollHorizontal} className="h-4 w-4 text-light-200" />
                    </ListItemPrefix>
                    Nom du projet
                  </NavLink>
                </ListItem>
                <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                  <NavLink to={'/project/'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faSquarePollHorizontal} className="h-4 w-4 text-light-200" />
                    </ListItemPrefix>
                    Nom du projet
                  </NavLink>
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          <Accordion
              open={open === 21}
              icon={
                <FontAwesomeIcon icon={faChevronRight}
                                 strokeWidth={2.5}
                                 className={`mx-auto h-3 w-3 text-light-200 transition-transform ${open === 21 ? "rotate-90" : ""}`}
                />
              }
          >
            <AccordionHeader onClick={() => handleOpen(21)} className="border-b-0 flex justify-between items-end">
              <Typography className="text-center font-bold uppercase text-light-200 text-sm">
                Vos tâches
              </Typography>
            </AccordionHeader>
            <AccordionBody className="p-0">
              <List className={"text-light-200"}>
                  <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                    <NavLink to={'/project/step/task'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faListCheck} className="h-4 w-4 text-marine-100" />
                    </ListItemPrefix>
                    Nom de la tâche
                    </NavLink>
                  </ListItem>
                  <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                    <NavLink to={'/project/step/task'} className={"flex items-center"}>
                      <ListItemPrefix>
                        <FontAwesomeIcon icon={faListCheck} className="h-4 w-4 text-marine-100" />
                      </ListItemPrefix>
                      Nom de la tâche
                    </NavLink>
                  </ListItem>
                  <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                    <NavLink to={'/project/step/task'} className={"flex items-center"}>
                      <ListItemPrefix>
                        <FontAwesomeIcon icon={faListCheck} className="h-4 w-4 text-marine-100" />
                      </ListItemPrefix>
                      Nom de la tâche
                    </NavLink>
                  </ListItem>
                <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                  <NavLink to={'/project/step/task'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faListCheck} className="h-4 w-4 text-marine-100" />
                    </ListItemPrefix>
                    Nom de la tâche
                  </NavLink>
                </ListItem>
                <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                  <NavLink to={'/project/step/task'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faListCheck} className="h-4 w-4 text-marine-100" />
                    </ListItemPrefix>
                    Nom de la tâche
                  </NavLink>
                </ListItem>
                <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                  <NavLink to={'/project/step/task'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faListCheck} className="h-4 w-4 text-marine-100" />
                    </ListItemPrefix>
                    Nom de la tâche
                  </NavLink>
                </ListItem>
                <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                  <NavLink to={'/project/step/task'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faListCheck} className="h-4 w-4 text-marine-100" />
                    </ListItemPrefix>
                    Nom de la tâche
                  </NavLink>
                </ListItem>
                <ListItem className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2"}>
                  <NavLink to={'/project/step/task'} className={"flex items-center"}>
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faListCheck} className="h-4 w-4 text-marine-100" />
                    </ListItemPrefix>
                    Nom de la tâche
                  </NavLink>
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
        </List>

          <div className={"w-full max-w-[17rem] flex flex-col gap-3 user-sidebar bg-marine-300"}>
            <div className={"flex items-center justify-start gap-10 my-3"}>
              <Avatar src={avatar} alt="avatar" size="sm" className={"border border-brick-300 shadow-xl shadow-brick-300/20 ring-8 ring-brick-300"} />
              <Typography className="text-center font-semibold text-light-200 text-sm">
                Nom prénom
              </Typography>
            </div>
            <Button className="flex items-center justify-between h-3 bg-brick-400 w-full">
              <FontAwesomeIcon icon={faGear} className={"h-4 w-4"} />
              Paramètres
            </Button>

            <Button className="flex items-center justify-between h-3 bg-brick-300 w-full mb-3">
              <FontAwesomeIcon icon={faRightFromBracket} className={"h-4 w-4"} />
              Se déconnecter
            </Button>
          </div>
      </Drawer>
  );
}