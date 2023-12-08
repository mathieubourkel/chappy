import {
    faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Tooltip
} from "@material-tailwind/react";

type Props = {
    value: string
    onClick?: () => void;
}

export default function RejoinButton({value, onClick}: Props) {

    return (
        <Tooltip
            content={value}
            className="lg:hidden bg-marine-300 px-4"
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
            }}
        >
            <Button className="flex items-center"
                    onClick={onClick}>
                <FontAwesomeIcon icon={faFolderOpen} className={"text-sm"} />
                <span className="pl-2 hidden lg:flex whitespace-nowrap">{value}</span>
            </Button>
        </Tooltip>
    );
}
