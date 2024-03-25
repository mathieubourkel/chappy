import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Alert } from "@material-tailwind/react";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import MemberCard from "./CardMember";
import MembersAdd from "./ModalAddMember";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import MagicButton from "../elements/Buttons/MagicButton";
import { intProject } from "../../services/interfaces/intProject";
import { intUserLight } from "../../services/interfaces/intUser";

type Props = {
    project:intProject,
    setProject: (project:intProject) => void;
}

export default function Members({project, setProject}:Props) {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen((cur) => !cur);
  return (
    <section>
        <article className="flex justify-between mt-20">
            <div className={"w-full flex justify-between gap-5 items-baseline"}>
                <h2>Les participants</h2>
                <MagicButton type={ButtonTypeEnum.ADD} handleClick={handleOpen}/>
                <MembersAdd project={project} setProject={setProject} open={open} handleOpen={handleOpen}/>
            </div>
        </article>
        <article className="mt-5">
            {project.members && project.members.map((member: intUserLight) => (
            <MemberCard
                key={member.id}
                member={member}
                project={project}
                setProject={setProject}
            />
            ))}
            {project.members && project.members.length == 0 &&
                <Alert
                    icon={<FontAwesomeIcon icon={faCircleInfo} className={"text-marine-300 text-xl"}/>}
                    className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 mb-5">
                    Aucun participant actif sur le projet.
                </Alert>}
        </article>
    </section>
  )
}
