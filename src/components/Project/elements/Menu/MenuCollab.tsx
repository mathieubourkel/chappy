import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button, Typography, Tooltip,
} from "@material-tailwind/react";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faFolderOpen,
    faList,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import DemandsModal
    from "../../Modals/DemandsModal.tsx";
import RejoinModal
    from "../../Modals/RejoinModal.tsx";

type Props = {
    see: string,
    request: string,
    join:string,
    menu: boolean,
    idProject: string | number | undefined
    setReload: (bool:boolean) => void |undefined
}
export function MenuCollab({see, request, setReload, join, menu, idProject}:Props) {

    return (
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
                    <FontAwesomeIcon icon={faList} className={"text-sm lg:mr-3"}/>
                    <Typography className={"hidden lg:inline font-extrabold"}>
                        Actions
                    </Typography>

                </Button>

            </MenuHandler>
            <MenuList className={"text-marine-300"}>
                <MenuItem className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faFolderOpen} className={"text-sm"}/>
                    <Link to={"/project/" + idProject}>
                        {see}
                    </Link>
                </MenuItem>
                <DemandsModal request={request}/>
                <RejoinModal join={join} menu={menu} setReload={setReload}/>
            </MenuList>
        </Menu>
        </Tooltip>
    );
}