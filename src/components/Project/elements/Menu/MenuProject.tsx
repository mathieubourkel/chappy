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
import ProjectDisplayCode from "../../Project/ProjectDisplayCode.tsx";
import DeleteProject from "../../Project/DeleteProject.tsx";
import { deleteProjectFromBDD } from "../../../../services/api/projects.ts";
import { intProjectLight } from "../../../../services/interfaces/intProject.tsx";
import { useState } from "react";

type Props = {
  project: intProjectLight
};

export function MenuProject({ project }: Props) {

  async function handleDelete() {
    await deleteProjectFromBDD(project._id || '');
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
        <Menu >
          <MenuHandler>
            <Button
              className="text-light-100 bg-marine-300"
              size={"sm"}
            >
              <FontAwesomeIcon icon={faList} className={"text-sm lg:mr-3"} />
              <Typography
                className={"hidden 2xl:inline font-extrabold whitespace-nowrap"}
              >
                Paramètres
              </Typography>
            </Button>
          </MenuHandler>
          <MenuList className={"text-marine-300"}>
            <MenuItem className={"flex items-center gap-2"} onClick={handleOpen}>
              <FontAwesomeIcon icon={faCode} className="text-sm" />
              <Typography
                variant={"small"}
                className="font-medium"
                
              >
                Code projet
              </Typography>
            </MenuItem>
            <MenuItem className={"flex justify-between items-center gap-2"} onClick={handleOpenD}>
              <FontAwesomeIcon
                icon={faXmark}
                className="text-sm text-brick-300"
              />
              <Typography
                variant={"small"}
                className="font-medium text-brick-300"
                
              >
                Supprimer le projet
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </Tooltip>
      <ProjectDisplayCode
        code={project.code ||""}
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
