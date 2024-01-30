import { useEffect, useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import {
  intProjectLight, intUserLight,
} from "../../services/interfaces/intProject";
import MembersAdd from "../../components/Project/Modals/MembersAdd";
import MemberCard from "../../components/Project/Cards/MemberCard";
import { useParams } from "react-router-dom";
import { getMembersByProject } from "../../services/api/users";
import {
  Alert,
  Spinner
} from "@material-tailwind/react";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

export default function MembersPage() {
  const { idProject } = useParams();
  const [project, setProject] = useState<intProjectLight>({
    id: undefined,
    name: "",
    code: "",
    owner: { id : 0, lastname: "", firstname: "", email: ""},
    users: []
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(true);
  const idUser = localStorage.getItem("id");
  useEffect(() => {
    async function getMembers() {
      const result = await getMembersByProject(idProject);
      setBusy(false);
      setProject(result);
      result.owner.id.toString() === idUser && setIsOwner(true);
    }
    getMembers();
  }, [idProject, idUser]);

  return (
    <main className="sm:mx-20 mx-5 mt-10">
      <ProjectHeader isOwner={isOwner} project={project} idProject={idProject} />
      <section className="flex justify-between mt-20">
        <div className={"w-full flex justify-between gap-5 items-baseline"}>
          <h2>Les participants</h2>

        {isOwner && (

            <MembersAdd project={project} setProject={setProject} />

        )}
        </div>
      </section>
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <div className="mt-5">
          {project.users && project.users.map((member: intUserLight, index: number) => (
            <MemberCard
              key={index}
              isOwner={isOwner}
              member={member}
              index={index}
            />
          ))}

          {project.users?.length == 0 &&
              <Alert
                  icon={<FontAwesomeIcon icon={faCircleInfo} className={"text-marine-300 text-xl"}/>}
                  className="bg-marine-100/10 text-marine-300 border border-gray-500/30 rounded-lg p-5 mb-5"
              >
                Aucun participant actif sur le projet.
              </Alert>}

        </div>
      )}
    </main>
  );
}
