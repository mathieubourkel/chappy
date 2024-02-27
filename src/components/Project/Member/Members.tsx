import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { intProject } from "../../../services/interfaces/intProject";
import { intUserLight } from "../../../services/interfaces/intUser";
import MembersAdd from "./MembersAdd";
import { Alert } from "@material-tailwind/react";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import MemberCard from "./MemberCard";

type Props = {
    project:intProject,
    setProject: (project:intProject) => void;
}

export default function Members({project, setProject}:Props) {
  return (
    <>
        <section className="flex justify-between mt-20">
            <div className={"w-full flex justify-between gap-5 items-baseline"}>
                <h2>Les participants</h2>
                <MembersAdd project={project} setProject={setProject} />
            </div>
        </section>
        <section className="mt-5">
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
        </section>
    </>
  )
}
