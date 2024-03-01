import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { deleteStepFromBDD } from "../../services/api/steps";
import { RefCommentEnum } from "../../services/enums/comment.ref.enum";
import { intSelects } from "../../services/interfaces/generique.interface";
import { intUser } from "../../services/interfaces/intUser";
import { DataStatusEnum } from "../../services/enums/data.status.enum";
import { ApiPathEnum } from "../../services/enums/api.path.enum";
import StepTasks from "../../components/Step/StepTasks";
import EspaceComment from "../../components/Comments/EspaceComment";
import StepHeader from "../../components/Step/StepHeader";
import MagicButton from "../../components/elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";

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
        <MagicButton type={ButtonTypeEnum.DELETE} value='Supprimer le jalon' handleClick={handleDeleteStep}/>
      </div>
    </main>}
    </>
  );
}
