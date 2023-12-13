import {
    Menu,
    MenuHandler,
    MenuList,
    Button, Typography, Tooltip,
} from "@material-tailwind/react";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faList,
} from "@fortawesome/free-solid-svg-icons";
import ProjectDisplayCode
    from "../../Modals/ProjectDisplayCode.tsx";
import DeleteProject
    from "../../Modals/DeleteProject.tsx";
import {
    deleteProjectFromBDD
} from "../../../../services/api/projects.ts";
import { intProject } from "../../../../services/interfaces/intProject.tsx";

type Props = {
    idProject: string | undefined | number
    project:intProject
}



export function MenuProject({project, idProject}:Props) {

    async function handleDelete() {
        await deleteProjectFromBDD(idProject);
    }

    return (
        <Tooltip
        content={"Gérer mon projet"}
        className="lg:hidden bg-marine-300 px-4"
        animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
        }}
    >
        <Menu>
            <MenuHandler>

                <Button
                    className="flex items-center justify-center text-light-100 bg-marine-300"
                    size={"sm"}
                >
                    <FontAwesomeIcon icon={faList} className={"text-sm lg:mr-3"}/>
                    <Typography className={"hidden lg:inline font-extrabold text-xl mt-0.5"}>
                        Gérer mon projet
                    </Typography>

                </Button>

            </MenuHandler>
            <MenuList className={"text-marine-300"}>
                    
 
                <ProjectDisplayCode code={project.code}/>
                    <DeleteProject handleDelete={handleDelete}/>


            </MenuList>
        </Menu>
        </Tooltip>
    );
}