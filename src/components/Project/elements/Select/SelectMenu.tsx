import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button, Typography,
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
    idProject: any;
}
export function SelectMenu({see, request, join, idProject}:Props) {

    return (
        <Menu>
            <MenuHandler>
                <Button
                    className="flex items-center justify-center text-marine-300 border-marine-300"
                    variant="outlined"
                >
                    <FontAwesomeIcon icon={faList} className={"text-sm md:mr-3"}/>
                    <Typography className={"hidden md:inline font-extrabold text-xl mt-0.5"}>
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
                <RejoinModal join={join}/>
            </MenuList>
        </Menu>
    );
}