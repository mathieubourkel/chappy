import CreateButton from "../elements/Buttons/CreateButton.tsx";
import {Link} from "react-router-dom";
import RejoinModal from "../Modals/RejoinModal.tsx";
import {
    Alert,
    Chip,
    Typography,
} from "@material-tailwind/react";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faCircleInfo,
    faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb
    from "../../Layers/Breadcrumb/Breadcrumb.tsx";
import Calendar from "../Calendar/Calendar.tsx";
import { useState } from "react";
import RejoinButton from "../elements/Buttons/OpenButton.tsx";

type Props = {
  nbProj: number;
};

export default function DashboardHeader({ nbProj }: Props) {
  const userName:string = localStorage.getItem('name') ||""

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);
  return (
    <section className="mt-20 md:flex gap-x-10">
      <div className="basis-[40lvw]">
        {nbProj > 0 ? (
          <div className="flex items-center mb-5">
              <Typography
                  variant="h1"
                  className={"font-bold text-4xl"}
              >
                  Bienvenue <div className='truncate w-[50vw]'>{userName}</div>
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

        <Breadcrumb/>

        {nbProj > 0 ? (
          <div className={"flex flex-col gap-4"}>
            <div className="custom-block p-4">
                <div className={"flex gap-2 items-center"}>
                    <FontAwesomeIcon icon={faNewspaper} className={"text-brick-400 text-xl"}/>
                    <Chip variant="ghost" value="Actualités" className={"w-full bg-marine-100/10 text-marine-300"}/>
                </div>

              <p className="p-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                obcaecati, perferendis dignissimos quae veritatis vitae fugiat
                ratione dolorum similique aspernatur deserunt suscipit quaerat
                porro iure cumque maiores quibusdam est aliquam?
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
                <RejoinButton value="Rejoindre un projet" onClick={handleOpen}/>
                <RejoinModal join="Rejoindre un projet" open={open} handleOpen={handleOpen}/>
              </div>
            </>
        )}
      </div>
        <Calendar className='lg:w-[49.4lvw] lg:h-[50lvh] overflow-x-clip'/>

    </section>
  );
}
