/* eslint-disable @typescript-eslint/no-explicit-any */
import ProjectHeader from "../../components/Project/ProjectHeader";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.tsx";
import Members from "../../components/Member/Members.tsx";
import { ApiPathEnum } from "../../services/enums/api.path.enum.ts";

export default function MembersPage() {
  const { idProject } = useParams();
  const {data, updateData, handleErrorAndLoading} = useFetch(`${ApiPathEnum.PROJECT}/${idProject}`);

  return (
    <>
    {handleErrorAndLoading()}
    {data && <main className="sm:mx-20 mx-5 mt-10 min-h-[70vh]">
      <ProjectHeader isOwner project={data} />
      <Members project={data} setProject={updateData}/>
    </main>}
    </>
  );
}
