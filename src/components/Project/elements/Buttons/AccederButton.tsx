import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-tailwind/react";

export default function AccederButton() {

  return (
    <Button variant="outlined" size={"sm"} className="flex text-brick-300 border-brick-300 items-center">
      <Typography className="pr-2 font-bold text-sm">Accéder</Typography>
      <FontAwesomeIcon icon={faArrowRight} className={"text-sm"} />
    </Button>
  );
}
