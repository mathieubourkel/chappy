import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-tailwind/react";

export default function AccederButton() {

  return (
    <Button variant="outlined" className="flex text-brick-300 border-brick-300 items-center py-2">
      <Typography className="pr-2">Accéder</Typography>
      <FontAwesomeIcon icon={faArrowRight} />
    </Button>
  );
}
