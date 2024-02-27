import { useParams } from "react-router-dom";
import ProjectHeader from "../../components/Project/Project/ProjectHeader";
import { ApiPathEnum } from "../../services/enums/api.path.enum";
import { useFetch } from "../../hooks/useFetch";
import Comptas from "../../components/Project/Compta/Comptas";

export default function ComptaPage() {
  const { idProject } = useParams();
  const {data, handleErrorAndLoading} = useFetch(`${ApiPathEnum.PROJECT}/${idProject}`);

  return (
    <>
    {handleErrorAndLoading()}
    {data && <main className="sm:mx-20 mx-5 mt-10 min-h-[70vh]">
      <ProjectHeader isOwner project={data} />
      <Comptas idProject={data._id}/>
    </main>}
    </>
  );
}
