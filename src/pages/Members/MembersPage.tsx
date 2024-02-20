/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { intProjectLight } from "../../services/interfaces/intProject";
import MembersAdd from "../../components/Project/Modals/MembersAdd";
import MemberCard from "../../components/Project/Cards/MemberCard";
import { useParams } from "react-router-dom";
import {
  getMembersByProject
} from "../../services/api/users";
import { Alert, Spinner } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import NotFoundPage
  from "../../services/utils/NotFoundPage.tsx";
import { intUserLight } from "../../services/interfaces/intUser.tsx";

export default function MembersPage() {
  const { idProject } = useParams();
  const [project, setProject] = useState<intProjectLight>({
    _id: '',
    name: "",
    code: "",
    owner: { id : 0, lastname: "", firstname: "", email: ""},
    members: [ { id:0, email:"" } ],
  });
  const [busy, setBusy] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getMembers() {
      try {
        const result = await getMembersByProject(idProject ||"");
        setProject(result);
      } catch (e) {
        setError(true)
      } finally {
        setBusy(false)
      }

    }
    getMembers();


  }, [idProject, reload]);

  const handleReload = () => {
    setReload((cur) => !cur);
  };

  if(error) return <NotFoundPage />


  return (
    <main className="sm:mx-20 mx-5 mt-10">
      <ProjectHeader isOwner project={project} idProject={idProject ||''} />
      <section className="flex justify-between mt-20">
        <div className={"w-full flex justify-between gap-5 items-baseline"}>
          <h2>Les participants</h2>

            <MembersAdd project={project} setProject={setProject} />

        </div>
      </section>
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <div className="mt-5">
          {project.members && project.members.map((member: intUserLight, index:number) => (
            <MemberCard
              key={member.id}
              member={member}
              index={index}
              handleReload={handleReload}
              idProject={idProject ||''}
            />
          ))}

          {project.members?.length == 0 &&
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
