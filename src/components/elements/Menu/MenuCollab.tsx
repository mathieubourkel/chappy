import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopesBulk,
  faFolderOpen,
  faHandHoldingHand,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DemandsModal from "../../modals/DemandsModal.tsx";
import { useState } from "react";
import MagicButton from "../Buttons/MagicButton.tsx";
import { ButtonTypeEnum } from "../../../services/enums/button.type.ts";

type Props = {
  see: string;
  request: string;
  join: string;
  menu: boolean;
  handleOpenD: () => void;
  idProject: string
};
export function MenuCollab({ handleOpenD, see, request, join, menu, idProject }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);


  return (
    <>
      <Tooltip
        content={"Actions"}
        className="lg:hidden bg-marine-300 px-4"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <Menu>
          <MenuHandler>
            <Button
              className="text-marine-300 border-marine-300"
              variant="outlined"
            >
              <FontAwesomeIcon icon={faList} className={"text-sm lg:mr-3"} />
              <Typography className={"hidden lg:inline font-extrabold"}>
                Actions
              </Typography>
            </Button>
          </MenuHandler>
          <MenuList className={"text-marine-300"}>
            
            <Link to={"/project/" + idProject}>
            <MenuItem className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFolderOpen} className={"text-sm"} />
              {see}
              </MenuItem>
              </Link>
            
            {menu ? (
              <MenuItem className="flex items-center gap-2"
                onClick={handleOpenD}
              >
                <FontAwesomeIcon
                  icon={faHandHoldingHand}
                  className={"text-sm"}
                />
                <Typography
                  variant="small"
                  className="font-medium"
                >
                  {join}
                </Typography>
              </MenuItem>
            ) : (
              <MagicButton type={ButtonTypeEnum.REJOIN} value='Rejoindre un projet' handleClick={handleOpenD}/>
            )}
            <MenuItem className="flex items-center gap-2"
                onClick={handleOpen}
            >
              <FontAwesomeIcon icon={faEnvelopesBulk} className={"text-sm"} />

              <Typography
                variant="small"
                className="font-medium"
              >
                {request}
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </Tooltip>
      <DemandsModal open={open} handleOpen={handleOpen} /> 
    </>
  );
}
