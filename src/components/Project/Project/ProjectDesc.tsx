import {
  Card,
  CardBody,
  Chip,
  Typography
} from "@material-tailwind/react";
import ModifiableInput from "../elements/Input/ModifiableInput";
import calendar from "../../../assets/img/calendar.webp";
import { intProject, intSelect } from "../../../services/interfaces/intProject";
import SelectStatus from "../elements/Select/SelectStatus";
import SelectDate from "../elements/Select/SelectDate";
import { useParams } from "react-router-dom";
import {
  deleteProjectFromBDD,
  modifyProjectToBDD
} from "../../../services/api/projects";
import { enumStatus } from "../../../services/interfaces/Status";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faBookOpen
} from "@fortawesome/free-solid-svg-icons";
import DeleteProject
  from "../Modals/DeleteProject.tsx";

type Props = {
  project: intProject;
  setProject: (project: intProject) => void;
  isOwner: boolean;
};

export default function ProjectDesc({ project, setProject, isOwner }: Props) {
  console.log("ProjectDescComposant");
  const { idProject } = useParams();

  function handleModifyProject(data: intProject) {
    modifyProjectToBDD(idProject, data);
  }

  const handleStatus = async (values: intSelect) => {
    const data = { ...project, status: values.value };
    await modifyProjectToBDD(idProject, data);
    setProject(data);
  };

  async function handleDelete() {
    await deleteProjectFromBDD(idProject);
  }

  return (
    <section className="mt-5 mb-20">
      <div className="lg:flex gap-5">
        <div>
          <Card className="custom-block lg:w-[45lvw]">
            <CardBody className={"custom-project-body custom-scroll"}>
              <div
                  className={"flex gap-2 items-center"}>
                <FontAwesomeIcon icon={faBookOpen}
                                 className={"text-brick-400 text-xl"}/>
                <Chip variant="ghost"
                      value="Description"
                      className={"w-full bg-marine-100/10 text-marine-300"}/>
              </div>
              <Typography type={"p"} className={"pt-3"}>{project.description}</Typography>

            </CardBody>
          </Card>

          <div className="mt-5">
            <Typography
                variant="h4"
                className={"font-bold my-10"}
            >
              Mise en oeuvre
            </Typography>
            <ModifiableInput
                isOwner={isOwner}
                value={"Budget : " + project.budget + "€"}
                state={project}
                setState={setProject}
                type="number"
                label="budget"
                placeHolder="Entrez le nouveau budget"
                handleBdd={handleModifyProject}
            />
          </div>
          {isOwner ? (
             <>
               <div className="md:flex gap-5">
                <div className="w-full">
                  <SelectStatus
                      handleStatus={handleStatus}
                      value={enumStatus[project.status]}
                  />
                </div>
                <div className="w-full">
                  <SelectDate
                      state={project}
                      setState={setProject}
                      handleBdd={handleModifyProject}
                  />
                </div>
              </div>
              <Typography
                  variant="h4"
                  className={"font-bold my-10"}
              >
                Supprimer le projet
              </Typography>

               <DeleteProject handleDelete={handleDelete} />
             </>
          ) : (
              <div className="md:flex gap-5">
                <div className="w-full bg-white p-2 rounded-xl">
                  {enumStatus[project.status].label}
                </div>
                <div className="w-full bg-white p-2 rounded-xl">
                  {project.estimEndDate?.toString()}
                </div>
              </div>
          )}
        </div>


        <div
            className="basis-1/2">
          <img className="hidden lg:flex"
               src={calendar}/>
        </div>
      </div>

    </section>
  );
}
