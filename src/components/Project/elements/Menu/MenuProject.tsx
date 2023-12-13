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
    faList,
} from "@fortawesome/free-solid-svg-icons";
import ProjectDisplayCode
    from "../../Modals/ProjectDisplayCode.tsx";

export function MenuProject() {

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
                    <ProjectDisplayCode />
                <MenuItem>

                </MenuItem>

            </MenuList>
        </Menu>
        </Tooltip>
    );
}