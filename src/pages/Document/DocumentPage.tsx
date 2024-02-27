import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { ApiPathEnum } from "../../services/enums/api.path.enum";
import Documents from "../../components/Project/Document/Documents";

export default function DocumentPage() {
  const {idProject} = useParams();
  const {data, handleErrorAndLoading} = useFetch(`${ApiPathEnum.PROJECT}/${idProject}`);

  return (
    <>
    {handleErrorAndLoading()}
    {data && <main className="sm:mx-20 mx-5 mt-10 min-h-[70vh]">
      <ProjectHeader isOwner project={data}/>
      <Documents idProject={idProject ||""}/>
    </main>}
    </>
  );
}
