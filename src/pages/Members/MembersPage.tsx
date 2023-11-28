import { useEffect, useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { intMember, intMembers, intProject } from "../../services/interfaces/intProject";
import MembersAdd from "../../components/Project/Modals/MembersAdd";
import MemberCard from "../../components/Project/Cards/MemberCard";
import axios from "axios";
import { useParams } from "react-router-dom";

type Props = {
  project: intProject;
  isOwner: boolean;
};

export default function MembersPage({ project, isOwner }: Props) {

  const { idProject } = useParams();
  const [error, setError] = useState(null);
  const [members, setMember] = useState<intMembers>([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:1337/api/Users?populate[0]=project&filters[projects][id][$eq]=" +
          idProject
      )
      .then(({ data }) => setMember(data.data))
      .catch((error) => setError(error));
  }, [idProject]);

  if (error) {
    return <div>Erreur lors de la recupération de la tata</div>;
  }

  console.log(members)

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
        {members.map((member:intMember, index:number) => (
          <MemberCard member={member} key={index} setMember={setMember} members={members} index={index} isOwner={isOwner}/>
        ))}
      </ul>
    </main>
  );
}
