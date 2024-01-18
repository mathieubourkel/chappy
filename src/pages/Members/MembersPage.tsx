import { useEffect, useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import {
  intUser,
  intUsers,
  intProjectLight,
} from "../../services/interfaces/intProject";
import MembersAdd from "../../components/Project/Modals/MembersAdd";
import MemberCard from "../../components/Project/Cards/MemberCard";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../services/api/projects";
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
  const [members, setMember] = useState<intUsers>([]);
  const [project, setProject] = useState<intProjectLight>({
    id: undefined,
    name: "", code:''
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(true);
  const idUser = localStorage.getItem("id");
  useEffect(() => {
    async function getMembers() {
      const tmpProj = await getProjectById(idProject);
      const result = await getMembersByProject(idProject);
      setBusy(false);
      setMember(result.users);
      setProject(tmpProj);
      tmpProj.owner.id.toString() === idUser && setIsOwner(true);
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

            <MembersAdd members={members} setMember={setMember} />

        )}
        </div>
      </section>
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <div className="mt-5">
          {members.map((member: intUser, index: number) => (
            <MemberCard
              key={index}
              isOwner={isOwner}
              member={member}
              members={members}
              setMember={setMember}
              index={index}
            />
          ))}

          {members.length == 0 &&
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
