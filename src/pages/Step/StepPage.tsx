import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { deleteStepFromBDD, getStepById } from "../../services/api/steps";
import StepTasks from "../../components/Project/Step/StepTasks";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import StepHeader from "../../components/Project/Step/StepHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import NotFoundPage from "../../services/utils/NotFoundPage";
import { intStep } from "../../services/interfaces/intStep";
import { formatDate } from "../../services/utils/FormatDate";
import { RefCommentEnum } from "../../services/enums/comment.ref.enum";
import { intSelects } from "../../services/interfaces/generique.interface";
import { intUser } from "../../services/interfaces/intUser";

export default function StepPage() {
  const [busy, setBusy] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { idStep, idProject } = useParams();
  const idUser:string = localStorage.getItem("id") ||'';
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState<intStep>({
    name: "",
    description: "",
    estimEndDate: formatDate(new Date()),
    budget: 0,
    status: 0,
    project: { _id: '', name:'', owner: { id: 0 }, members: [] },
    tasks: [],
  });

  useEffect(() => {
    const getStep = async () => {
      try {
        const tmpStep = await getStepById(idStep || "");
        tmpStep.project.owner.id.toString() === idUser && setIsOwner(true);
        const emailArray: intSelects = tmpStep.project.members.map(
          (element: intUser) => ({
            label: element.email,
            value: element.id,
          })
       );
        tmpStep.project.members = emailArray;
        setStep(tmpStep);
      } catch (error) {
        setError(true);
      } finally {
        setBusy(false);
      }
    };
    getStep();
  }, [idProject, idStep, idUser, reload]);

  const handleDeleteStep = async () => {
    await deleteStepFromBDD(idStep ||"");
    navigate("/project/" + idProject);
  };

  const handleReload = () => {
    setReload((cur) => !cur);
  };

  if (error) return <NotFoundPage />;

  return (
    <main className="project-page sm:mx-20 mx-5">
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <>
          <StepHeader step={step} isOwner={isOwner} setStep={setStep} />
          <StepTasks
            step={step}
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
        </>
      )}
    </main>
  );
}
