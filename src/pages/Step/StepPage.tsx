import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { deleteStepFromBDD, getStepById } from "../../services/api/steps";
import {
  intSelect,
  intStepNew,
  intUser,
} from "../../services/interfaces/intProject";
import StepTasks from "../../components/Project/Step/StepTasks";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import StepHeader from "../../components/Project/Step/StepHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import NotFoundPage from "../../services/utils/NotFoundPage";

export default function StepPage() {
  const [busy, setBusy] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { idStep, idProject } = useParams();
  const idUser = localStorage.getItem("id");
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState<intStepNew>({
    name: "",
    description: "",
    estimEndDate: new Date(),
    budget: 0,
    status: 0,
    project: { _id: 0, name:'', owner: { id: 0 }, members: [] },
    tasks: [],
  });

  useEffect(() => {
    const getStep = async () => {
      try {
        const tmpStep = await getStepById(idStep);
        tmpStep.project.owner.toString() === idUser && setIsOwner(true);
        // const emailArray: Array<intSelect> = tmpStep.project.users.map(
        //   (element: intUser) => ({
        //     label: element.email,
        //     value: element.id,
        //   })
        // );
       // tmpStep.project.users = emailArray;
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
    await deleteStepFromBDD(idStep);
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
          <EspaceComment table="step" idParent={idStep || ''} />

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
