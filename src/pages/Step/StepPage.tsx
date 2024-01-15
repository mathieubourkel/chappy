import {
  useNavigate,
  useParams
} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Spinner,
} from "@material-tailwind/react";
import {
  deleteStepFromBDD,
  getStepById
} from "../../services/api/steps";
import { getProjectById } from "../../services/api/projects";
import { intStep } from "../../services/interfaces/intProject";
import StepTasks from "../../components/Project/Step/StepTasks";
import EspaceComment from "../../components/Project/Comments/EspaceComment";
import StepHeader from "../../components/Project/Step/StepHeader";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";

export default function StepPage() {
  console.log("StepPage");
  const [busy, setBusy] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const {idStep, idProject} = useParams();
  const idUser = localStorage.getItem("id");
  const [step, setStep] = useState<intStep>({
    name: "",
    description: "",
    estimEndDate: new Date(),
    budget: 0,
    status:0,
    project: {id:idProject, name: ''},
    tasks: []
  });

  useEffect(() => {
    async function getInfoStep() {
      const tmpStep = await getStepById(idStep);
      const tmpProject = await getProjectById(idProject);
      setBusy(false);
      setStep(tmpStep);
      tmpProject.owner.id.toString() === idUser && setIsOwner(true);
    }
    getInfoStep();

  }, [idProject, idStep, idUser]);
  const navigate = useNavigate();

  const handleDeleteStep = async () => {
    await deleteStepFromBDD(idStep);
    navigate("/project/" + idProject);
  };

  return (
    <main className="project-page sm:mx-20 mx-5">
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
          <>
            <StepHeader step={step}
                        isOwner={isOwner}
                        setStep={setStep}/>
            <StepTasks step={step}/>
            <EspaceComment table="project_step"
                           idParent={idStep}/>

            <div className={"flex justify-center mb-10"}>
                <Button
                    onClick={() => handleDeleteStep()}
                    size={"sm"}
                    className="bg-marine-100 h-full hover:bg-marine-300">
                  <FontAwesomeIcon icon={faXmark}
                                   size="xl"/>
                  <span className={"ml-3 whitespace-nowrap"}>Supprimer le jalon</span>

                </Button>
            </div>
          </>
      )}
    </main>
  );
}
