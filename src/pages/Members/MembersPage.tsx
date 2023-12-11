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
import { Spinner } from "@material-tailwind/react";

export default function MembersPage() {
  console.log("MembersPage");
  const { idProject } = useParams();
  const [members, setMember] = useState<intUsers>([]);
  const [project, setProject] = useState<intProjectLight>({
    id: undefined,
    name: "",
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
      tmpProj.user.id.toString() === idUser && setIsOwner(true);
    }
    getMembers();
  }, [idProject, idUser]);
  console.log(members)
  return (
    <main className="project-page sm:mx-20 mx-5 mt-10">
      <ProjectHeader isOwner={isOwner} project={project} idProject={idProject} />
      <section className="b2-header flex justify-between mt-20">
        <div>
          <h2>Les participants</h2>
        </div>
        {isOwner && (
          <div className="b2-header-buttons flex">
            <MembersAdd members={members} setMember={setMember} />
          </div>
        )}
      </section>
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
      ) : (
        <ul className="mt-5">
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
        </ul>
      )}
    </main>
  );
}
