import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetch } from "../../hooks/useFetch";
import { deleteStepFromBDD } from "../../services/api/steps";
import { RefCommentEnum } from "../../services/enums/comment.ref.enum";
import { intSelects } from "../../services/interfaces/generique.interface";
import { intUser } from "../../services/interfaces/intUser";
import { DataStatusEnum } from "../../services/enums/data.status.enum";
import { ApiPathEnum } from "../../services/enums/api.path.enum";
import StepTasks from "../../components/Project/Step/StepTasks";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import StepHeader from "../../components/Project/Step/StepHeader";

export default function StepPage() {

  const { idStep, idProject } = useParams();
  const idUser:string = localStorage.getItem("id") ||'';

  const {data, updateData, status, handleErrorAndLoading, handleReload} = useFetch(`${ApiPathEnum.STEP}/${idStep}`)
  const navigate = useNavigate();

  if (status === DataStatusEnum.FIRST_FETCH){
    data.project.owner.id.toString() === idUser && (data.isOwner = true)
    const emailArray: intSelects = data.project.members.map(
      (element: intUser) => ({
        label: element.email,
        value: element.id,
      })
    );
    data.project.members = emailArray;
    data.tasks.reverse()
  }

  const handleDeleteStep = async () => {
    await deleteStepFromBDD(idStep ||"");
    navigate("/project/" + idProject);
  };

  return (
    <>
    {handleErrorAndLoading()}
    {data && <main className="project-page sm:mx-20 mx-5">
      <StepHeader step={data} isOwner={data.isOwner} setStep={updateData} />
      <StepTasks
        step={data}
        setStep={updateData}
        handleReload={handleReload}
      />
      <EspaceComment table={RefCommentEnum.jalon} idParent={idStep || ''} />

      <div className={"flex justify-center mb-10"}>
        <Button
          onClick={() => handleDeleteStep()}
          size={"sm"}
          className="bg-marine-100 h-full hover:bg-marine-300"
        >
          <FontAwesomeIcon icon={faXmark} size="xl" />
          <span className={"ml-3 whitespace-nowrap"}>
            Supprimer le jalon
          </span>
        </Button>
      </div>
    </main>}
    </>
  );
}
