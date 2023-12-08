import calendar from "../../../assets/img/calendar.webp";
import CreateButton from "../elements/Buttons/CreateButton";
import {Link, NavLink} from "react-router-dom";
import RejoinModal from "../Modals/RejoinModal";
import {
    Alert,
    Breadcrumbs, Chip,
    Typography
} from "@material-tailwind/react";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faCircleInfo,
    faHouse, faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  nbProj:number
};

export default function DashboardHeader({ nbProj}: Props) {
  console.log("DashBoardHeaderComposant")
  const userName = localStorage.getItem('name')
  return (
    <section className="mt-20 md:flex justify-between gap-x-10">
      <div className="basis-1/2">
        {nbProj > 0 ? (
          <div className="flex items-center mb-5">
              <Typography
                  variant="h1"
                  className={"font-bold text-4xl"}
              >
                  Bienvenue {userName}
              </Typography>
          </div>
        ) : (
            <div className="flex items-center mb-5">
                <Typography
                    variant="h1"
                    className={"font-bold text-4xl"}
                >
                    Bienvenue {userName}
                </Typography>
            </div>
        )}

          <Breadcrumbs className={"p-0 my-5"}>
              <NavLink to={"/"} className="text-marine-100 hover:!text-marine-300">
                  <FontAwesomeIcon icon={faHouse} />
              </NavLink>
              <NavLink to={"/"} className="text-marine-100 hover:!text-marine-300">
                  Dashboard
              </NavLink>

          </Breadcrumbs>

        {nbProj > 0 ? (
          <div className={"flex flex-col gap-4"}>
            <div className="bg-white border border-gray-500/30 rounded-lg p-5 drop-shadow-100">
                <div className={"flex gap-2 items-center"}>
                    <FontAwesomeIcon icon={faNewspaper} className={"text-brick-400 text-xl"}/>
                    <Chip variant="ghost" value="Actualités" className={"w-full bg-marine-100/10 text-marine-300"}/>
                </div>

                <p className={"p-2"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Eius obcaecati, perferendis dignissimos quae veritatis vitae
                  fugiat ratione dolorum similique aspernatur deserunt suscipit
                  quaerat porro iure cumque maiores quibusdam est aliquam?
                </p>
            </div>
              <Alert
                  icon={<FontAwesomeIcon icon={faCircleInfo} className={"text-marine-300 text-xl"}/>}
                  className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 mb-5"
              >
                  Message d'information en cas de besoin.
              </Alert>
          </div>
        ) : (
            <>
                <Alert
                    icon={<FontAwesomeIcon icon={faCircleInfo} className={"text-marine-300 text-xl"}/>}
                    className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 mb-5"
                >
                    Vous n'avez actuellement aucun projet en cours.
                </Alert>

              <div className="flex justify-center items-center gap-10 my-5 lg:mt-[15lvh]">
                <Link to='/create-project'>
                <CreateButton value="Créer un projet"/>
                </Link>
                <RejoinModal join="Rejoindre un projet" />
              </div>
            </>
        )}
      </div>
      <div className="basis-1/2">
        <img src={calendar} />
      </div>
    </section>
  );
}
