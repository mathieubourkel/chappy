import { Card, CardBody, Typography } from "@material-tailwind/react";
import ModifiableInput from "../elements/Input/ModifiableInput";
import calendar from "../../../assets/img/calendar.webp";
import { intProject, intSelect } from "../../../services/interfaces/intProject";
import SelectStatus from "../elements/Select/SelectStatus";
import SelectDate from "../elements/Select/SelectDate";
import { useParams } from "react-router-dom";
import { modifyProjectToBDD } from "../../../services/api/projects";
import { enumStatus } from "../../../services/interfaces/Status";

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

  return (
    <section className="b1-body mt-10 mb-20">
      <div className="b1-body-desc-calendar lg:flex gap-5">
        <Card className="b1-body-desc basis-1/2 bg-white">
          <CardBody>
            <Typography variant="h4" className="mb-2">
              Description du projet
            </Typography>
            <Typography>{project.description}</Typography>
          </CardBody>
        </Card>
        <div className="b1-body-calendar basis-1/2">
          <img className="hidden lg:flex" src={calendar} />
        </div>
      </div>
      <div className="mt-5">
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
    </section>
  );
}
