import { useEffect, useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import {intMember,intMembers, intProjectLight,} from "../../services/interfaces/intProject";
import MembersAdd from "../../components/Project/Modals/MembersAdd";
import MemberCard from "../../components/Project/Cards/MemberCard";
import { useParams } from "react-router-dom";
import { getProjectNameById } from "../../services/api/projects";
import { getMembersByProject } from "../../services/api/users";

type Props = {
  isOwner: boolean;
};

export default function MembersPage({ isOwner }: Props) {
  console.log('MembersPage')
  const { idProject } = useParams();
  const [members, setMember] = useState<intMembers>([]);
  const [project, setProject] = useState<intProjectLight>({id:0, name:""})

  useEffect(() => {
    async function getMembers(){
      const tmpProj = await getProjectNameById(idProject)
      const result = await getMembersByProject(idProject)
      setMember(result)
      setProject(tmpProj)
    }
    getMembers();
    
  }, [idProject]);
  console.log(members)
  return (
    <main className="project-page sm:mx-20 mx-5">
      <ProjectHeader project={project} idProject={idProject}/>
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
      <ul className="mt-5">
        {members.map((member: intMember, index: number) => (
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
    </main>
  );
}
