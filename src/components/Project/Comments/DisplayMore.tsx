import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Typography } from '@material-tailwind/react'

type Props = {
    state: boolean,
    setState: (bool:boolean) => void;
}

export default function DisplayMore({state, setState}:Props) {

  function handleDisplay() {
    state ? setState(false) : setState(true);
  }

  return (
    <Button onClick={handleDisplay} className="bg-brick-300">
          {state ? (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMinus} className="mr-3" />
              <Typography>Réduire</Typography>
            </div>
          ) : (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-3" />
              <Typography>Afficher plus</Typography>
            </div>
          )}
        </Button>
  )
}
