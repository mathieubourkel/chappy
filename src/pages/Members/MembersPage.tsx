import { useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { intMember, intMembers, intProject } from "../../services/interfaces/intProject";
import MembersAdd from "../../components/Project/Modals/MembersAdd";
import MemberCard from "../../components/Project/Cards/MemberCard";

type Props = {
  project: intProject;
  isOwner: boolean;
};

export default function MembersPage({ project, isOwner }: Props) {

  const [members, setMember] = useState<intMembers>([
    { name: "bob", company: "Elec44", tasks: 4 },
    { name: "jean", company: "Elec43", tasks: 98 },
    { name: "paul", company: "Elec42", tasks: 1 },
    { name: "maurice", company: "Elec41", tasks: 0 },
  ]);

  return (
    <main className="project-page sm:mx-20 mx-5">
      <ProjectHeader project={project} />
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
        {members.map((_member:intMember, index:number) => (
          <MemberCard key={index} setMember={setMember} members={members} index={index} isOwner={isOwner}/>
        ))}
      </ul>
    </main>
  );
}
