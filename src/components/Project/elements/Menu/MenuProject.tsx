import {
  Menu,
  MenuHandler,
  MenuList,
  Button,
  Typography,
  Tooltip,
  MenuItem,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faList, faXmark } from "@fortawesome/free-solid-svg-icons";
import ProjectDisplayCode from "../../Modals/ProjectDisplayCode.tsx";
import DeleteProject from "../../Modals/DeleteProject.tsx";
import { deleteProjectFromBDD } from "../../../../services/api/projects.ts";
import { intProjectLight } from "../../../../services/interfaces/intProject.tsx";
import { useState } from "react";

type Props = {
  idProject: string | undefined | number;
  project: intProjectLight;
};

export function MenuProject({ project, idProject }: Props) {
  async function handleDelete() {
    await deleteProjectFromBDD(idProject);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);
  const [openD, setOpenD] = useState(false);
  const handleOpenD = () => setOpenD((bool) => !bool);

  return (
    <>
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
              <FontAwesomeIcon icon={faList} className={"text-sm lg:mr-3"} />
              <Typography
                className={"hidden lg:inline font-extrabold text-xl mt-0.5"}
              >
                Gérer mon projet
              </Typography>
            </Button>
          </MenuHandler>
          <MenuList className={"text-marine-300"}>
            <MenuItem className={"flex items-center gap-2"}>
              <FontAwesomeIcon icon={faCode} className="text-sm" />
              <Typography
                variant={"small"}
                className="font-medium"
                onClick={handleOpen}
              >
                Code projet
              </Typography>
            </MenuItem>
            <MenuItem className={"flex justify-between items-center gap-2"}>
              <FontAwesomeIcon
                icon={faXmark}
                className="text-sm text-brick-300"
              />
              <Typography
                variant={"small"}
                className="font-medium text-brick-300"
                onClick={handleOpenD}
              >
                Supprimer le projet
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </Tooltip>
      <ProjectDisplayCode
        code={project.code}
        open={open}
        handleOpen={handleOpen}
      />
      <DeleteProject
        handleDelete={handleDelete}
        openD={openD}
        handleOpenD={handleOpenD}
      />
    </>
  );
}
