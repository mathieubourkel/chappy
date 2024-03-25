import { Link } from "react-router-dom";
import {Typography} from "@material-tailwind/react";
import {  intProjectLight } from "../../services/interfaces/intProject.tsx";
import Breadcrumb from "../layers/Breadcrumb/Breadcrumb.tsx";
import {MenuProject} from "../elements/Menu/MenuProject.tsx";
import MagicButton from "../elements/Buttons/MagicButton.tsx";
import { ButtonTypeEnum } from "../../services/enums/button.type.ts";

type Props = {
  project: intProjectLight
  isOwner: boolean
}

export default function ProjectHeader({project, isOwner} :Props) {
  return (
      <section className="lg:flex justify-between mb-20">
        <div className='lg:w-1/2'>
            <Typography variant="h1" className={"font-bold text-4xl truncate"}>
                {project.name}
            </Typography>
            <Breadcrumb nameProject={project.name} idProject={project._id}/>
        </div>
        {isOwner && 
        <nav className="flex gap-2 items-center justify-center xl:justify-end lg:w-1/2">
          <MenuProject project={project} />
            <Link to={"/project/"+ project._id + "/members"}>
              <MagicButton type={ButtonTypeEnum.MEMBERS} wrap='2xl'/>
            </Link>
            <Link to={"/project/"+ project._id + "/documents"}>
              <MagicButton type={ButtonTypeEnum.DOCUMENTS} wrap='2xl'/>
            </Link>
            <Link to={"/project/"+ project._id + "/comptas"}>
              <MagicButton type={ButtonTypeEnum.PURCHASES} wrap='2xl'/>
            </Link>
        </nav>}
      </section>

  );
}
