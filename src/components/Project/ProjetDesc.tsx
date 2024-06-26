/* eslint-disable @typescript-eslint/no-explicit-any */
import {Alert,Card,CardBody,Chip,Typography,} from "@material-tailwind/react";
import ModifiableInput from "../elements/Input/ModifiableInput";
import SelectDate from "../elements/Select/SelectDate";
import { useParams } from "react-router-dom";
import { modifyProjectToBDD } from "../../services/api/projects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faSitemap } from "@fortawesome/free-solid-svg-icons";
import CalendarProject from "../Calendar/CalendarProject";
import { Status } from "../../services/enums/status.enum";
import { intProject } from "../../services/interfaces/intProject";
import MagicSelect from "../elements/Select/MagicSelect";
  
type Props = {
    project: intProject;
    setProject: (project: intProject) => void;
    isOwner: boolean;
};
  
export default function ProjectDesc({ project, setProject, isOwner }: Props) {
    const { idProject } = useParams();
  
    const handleModifyProject = async (data: intProject) => {
      await modifyProjectToBDD(idProject ||"", data);
    }

    const handleDate = async (select:any) => {
      await modifyProjectToBDD(idProject || '',{...project, estimEndDate: select.endDate});
      setProject({...project, estimEndDate: select.endDate})
    }
  
    const handleStatus = async (values: any) => {
      const data = { ...project, status: values.value };
      await modifyProjectToBDD(idProject ||"", data);
      setProject(data);
    };
  
    return (
      <section className="mt-10 mb-20">
        <div className="lg:flex gap-5">
          <div>
            <Alert className={"mb-5 bg-marine-300 p-5"}>
              <FontAwesomeIcon icon={faSitemap} className={"mr-5 text-marine-100"}/>
              <span>
                Vous avez actuellement {project.steps.length} { project.steps.length > 1 ? "jalons " : "jalon " }
                ouvert sur ce projet.
              </span>
            </Alert>
            <Card className="custom-block lg:w-[45lvw]">
              <CardBody className={"custom-project-body custom-scroll"}>
                <div className={"flex gap-2 items-center"}>
                  <FontAwesomeIcon icon={faBookOpen} className={"text-brick-400 text-xl"}/>
                  <Chip
                    variant="ghost"
                    value="Description"
                    className={"w-full bg-marine-100/10 text-marine-300"}
                  />
                </div>
                <Typography type={"p"} className={"truncate pt-3"}>
                  {project.description}
                </Typography>
              </CardBody>
            </Card>
  
            <div className="mt-5">
              Budget : 
              <ModifiableInput
                isOwner={isOwner}
                value={project.budget}
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
                <div className="md:flex gap-5 md:mb-5">
                  <div className="w-full">
                  <MagicSelect options={Status} value={Status[project.status]} label='status'
            disabled={!isOwner} handleSelect={handleStatus} />
                  </div>
                  <div className="w-full my-5 md:my-0">
                  <SelectDate value1={project.estimEndDate} handleDate={handleDate} 
                label='estimEndDate'
                  placeholder='Choisir la durée du jalon.' 
                 disabled={!isOwner}
                />
                  </div>
                </div>
              </>
            ) : (
              <div className="md:flex gap-5">
                <div className="w-full bg-white p-2 rounded-xl">
                  {project.status}
                </div>
                <div className="w-full bg-white p-2 rounded-xl">
                  {project.estimEndDate?.toString()}
                </div>
              </div>
            )}
          </div>
  
          <div className="b1-body-calendar basis-1/2">
            <CalendarProject className="h-[32rem]" />
          </div>
        </div>
      </section>
    );
  }
  