import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-tailwind/react";
import './comment.css'

type Props = {
  state: boolean;
  setState: (bool: boolean) => void;
};

export default function DisplayMore({ state, setState }: Props) {
  console.log('DisplayMoreComposant')
  function handleDisplay() {
    state ? setState(false) : setState(true);
  }

  return (
    <Button onClick={handleDisplay} className="bg-brick-300" size={"sm"}>
      {state ? (
        <div className="flex items-center">
          <FontAwesomeIcon icon={faMinus} className="mr-3 text-xl" />
          <Typography className={"font-bold"}>Réduire</Typography>
        </div>
      ) : (
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPlus} className="mr-3 text-xl" />
          <Typography className={"font-bold"}>Afficher plus</Typography>
        </div>
      )}
    </Button>
  );
}
