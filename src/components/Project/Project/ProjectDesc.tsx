import { Card, CardBody, Typography } from "@material-tailwind/react";
import ModifiableInput from "../Buttons/ModifiableInput";
import calendar from "../../../assets/img/calendar.webp";
import { intProject } from "../../../services/interfaces/intProject";
import SelectStatus from "../Buttons/SelectStatus";
import SelectDate from "../Buttons/SelectEstimDate";

type Props = {
    project: intProject,
    setProject: (project: intProject) => void;
    isOwner: boolean
}

export default function ProjectDesc({ project, setProject, isOwner }: Props) {

  console.log("ProjectDescComposant")
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
      <div className="b1-body-budget-status md:flex gap-5 mt-5">
        <ModifiableInput
          isOwner={isOwner}
          value={"Budget : " + project.budget + "€"}
          state={project}
          setState={setProject}
          type="number"
          label="budget"
          placeHolder="Entrez le nouveau budget"
        />
        <SelectStatus
          isOwner={isOwner}
          state={project}
          classState="basis-1/2"
        />
      </div>
      <div>
        <SelectDate state={project} setState={setProject}/>
      </div>
    </section>
  );
}
