/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Button,
  Avatar
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
import logo from "../../../assets/img/icon_sidebar.png";
import avatar from "../../../assets/img/icon user.png";
import {NavLink} from "react-router-dom";
import './sidebar.css'

export function Sidebar(props:any) {
  const {openSidebar, toggleSidebar} = props;
  const [open, setOpen] = React.useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    window.location.reload()

  }

  const handleOpen = (value:any) => {
    setOpen(open === value ? 0 : value);
  };

  // Boucles affichages
  const jalons = [
    {
      key: 0,
      name: "Nom du jalon 1"
    },
    {
      key: 1,
      name: "Nom du jalon 2"
    },
    {
      key: 2,
      name: "Nom du jalon 3"
    },
    {
      key: 3,
      name: "Nom du jalon 4"
    },
    {
      key: 4,
      name: "Nom du jalon 5"
    },
    {
      key: 5,
      name: "Nom du jalon 6"
    },
    {
      key: 6,
      name: "Nom du jalon 7"
    },
    {
      key: 7,
      name: "Nom du jalon 8"
    },
    {
      key: 8,
      name: "Nom du jalon 9"
    },
    {
      key: 9,
      name: "Nom du jalon 10"
    },
    {
      key: 10,
      name: "Nom du jalon 11"
    },
    {
      key: 11,
      name: "Nom du jalon 12"
    }]

  const participations = [
      {
    key: 0,
    name: "Nom du projet 1"
    },
    {
      key: 1,
      name: "Nom du projet 2"
    },
    {
      key: 2,
      name: "Nom du projet 3"
    },
    {
      key: 3,
      name: "Nom du projet 4"
    },
    {
      key: 4,
      name: "Nom du projet 5"
    },
    {
      key: 5,
      name: "Nom du projet 6"
    },
    {
      key: 6,
      name: "Nom du projet 7"
    },
    {
      key: 7,
      name: "Nom du projet 8"
    },
    {
      key: 8,
      name: "Nom du projet 9"
    },
    {
      key: 9,
      name: "Nom du projet 10"
    },
    {
      key: 10,
      name: "Nom du projet 11"
    },
    {
      key: 11,
      name: "Nom du projet 12"
    },]

  const taches = [
    {
      key: 0,
      name: "Nom de la tâche 1"
    },
    {
      key: 1,
      name: "Nom de la tâche 2"
    },
    {
      key: 2,
      name: "Nom de la tâche 3"
    },
    {
      key: 3,
      name: "Nom de la tâche 4"
    },
    {
      key: 4,
      name: "Nom de la tâche 5"
    },
    {
      key: 5,
      name: "Nom de la tâche 6"
    },
    {
      key: 6,
      name: "Nom de la tâche 7"
    },
    {
      key: 7,
      name: "Nom de la tâche 8"
    },
    {
      key: 8,
      name: "Nom de la tâche 9"
    },
    {
      key: 9,
      name: "Nom de la tâche 10"
    }]

  return (
      <Drawer overlay={false} className="w-full sidebar bg-marine-300 text-white flex flex-col justify-between" open={openSidebar} onClose={toggleSidebar}>

        <div>
          <div className={"flex justify-end p-4"}>
            <IconButton variant="text" size={"lg"} className={'bg-marine-100 rounded-2xl hover:bg-marine-100/50 h-5'} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faPlay} className='h-3 w-3 text-white rotate-180' />
            </IconButton>
          </div>

          <div className="mb-5 flex justify-center items-center gap-4">
            <NavLink to={'/dashboard'}><img src={logo} alt="logo chappy" className="w-12" /></NavLink>
          </div>

          <Typography className="text-center font-bold uppercase text-marine-100 text-sm">
            Votre espace
          </Typography>

          <List className={"text-light-200"}>
            <ListItem className={"py-1.5 px-3 l-item hover:text-light-200"}>
              <NavLink to={'/create-project'} className={"flex items-center"}>
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

        </div>

        <div className={"custom-scroll h-[65vh] flex flex-col items-center justify-start"}>

        <Typography className="text-center font-bold uppercase text-marine-100 text-sm mt-2">
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
            <ListItem className="p-0 l-item hover:text-light-200" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 px-3 py-0">
                <ListItemPrefix>
                  <FontAwesomeIcon icon={faSquarePollHorizontal} className="h-5 w-5 text-marine-100 p-2" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                  Nom du projet
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1 max-h-[20vh] custom-scroll">
              <List className="p-0">
                {jalons.map((jalon:any) => (
                    <ListItem key={jalon.key} className={"py-1.5 px-3 hover:bg-marine-300/50 hover:text-marine-100 text-light-200 hover:pl-2 text-sm"}>
                      <NavLink to={'/project/step'} className={"flex items-center"}>
                        <ListItemPrefix>
                          <FontAwesomeIcon icon={faChartPie} strokeWidth={3} className="h-4 w-4 pl-5 text-marine-100" />
                        </ListItemPrefix>
                        {jalon.name}
                      </NavLink>
                    </ListItem>
                ))}
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
            <AccordionBody className="py-1 max-h-[20vh] custom-scroll">
              <List className="p-0">
                {jalons.map((jalon:any) => (
                    <ListItem key={jalon.key} className={"py-1.5 px-3 hover:bg-marine-300/50 hover:text-marine-100 text-light-200 hover:pl-2 text-sm"}>
                      <NavLink to={'/project/step'} className={"flex items-center"}>
                        <ListItemPrefix>
                          <FontAwesomeIcon icon={faChartPie} strokeWidth={3} className="h-4 w-4 pl-5 text-marine-100" />
                        </ListItemPrefix>
                        {jalon.name}
                      </NavLink>
                    </ListItem>
                ))}
              </List>
            </AccordionBody>
          </Accordion>

          <hr className={"mt-3 border-marine-100/20"} />
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
            <AccordionBody className="p-0 max-h-[20vh] custom-scroll">
              <List className={"text-light-200"}>
                {participations.map((participation:any) => (
                    <ListItem key={participation.key} className={"py-0.5 px-3 hover:pl-2 l-small-item"}>
                      <NavLink to={'/project/'} className={"flex items-center"}>
                        <ListItemPrefix>
                          <FontAwesomeIcon icon={faSquarePollHorizontal} className="h-4 w-4 text-marine-100" />
                        </ListItemPrefix>
                        {participation.name}
                      </NavLink>
                    </ListItem>
                ))}
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
            <AccordionBody className="p-0 max-h-[20vh] custom-scroll">
              <List className={"text-light-200"}>
                {taches.map((tache:any) => (
                    <ListItem key={tache.key} className={"py-0.5 px-3 hover:bg-marine-300 hover:text-marine-100 hover:pl-2 l-small-item"}>
                      <NavLink to={'/project/step/task'} className={"flex items-center"}>
                        <ListItemPrefix>
                          <FontAwesomeIcon icon={faListCheck} className="h-4 w-4 text-marine-100" />
                        </ListItemPrefix>
                        {tache.name}
                      </NavLink>
                    </ListItem>
                ))}
              </List>
            </AccordionBody>
          </Accordion>
        </List>

        </div>

          <div className={"h-[22vh] flex justify-end flex-col gap-3 user-sidebar bg-marine-300 px-4"}>
            <div className={"flex items-center justify-start gap-10 my-3"}>
              <Avatar src={avatar} alt="avatar" size="sm" className={"border border-brick-300 shadow-xl shadow-brick-300/20 ring-8 ring-brick-300"} />
              <Typography className="text-center font-semibold text-light-200 text-sm">
                Nom prénom
              </Typography>
            </div>
            <NavLink to={"/profile"} >
              <Button className="flex items-center justify-between h-3 bg-brick-400 w-full">
                <FontAwesomeIcon icon={faGear} className={"h-4 w-4"} />
                Paramètres
              </Button>
            </NavLink>


              <Button 
              onClick={handleLogout}
              className="flex items-center justify-between h-3 bg-brick-300 w-full mb-3">
                <FontAwesomeIcon icon={faRightFromBracket} className={"h-4 w-4"} />
                Se déconnecter
              </Button>
      
          </div>
      </Drawer>
  );
}