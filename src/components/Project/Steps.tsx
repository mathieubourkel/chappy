import { Button, Card, IconButton, CardBody,
    CardFooter,
    Typography, } from '@material-tailwind/react'
import {  intStep, intSteps } from '../../services/interfaces/intProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faFilter, faSquarePlus, faTableList } from '@fortawesome/free-solid-svg-icons'

type Props = {
    steps:intSteps
}

export default function Steps({steps}:Props) {

  return (
    <section className="bloc-2 mb-40">
        <div className="b2-header flex justify-between">
            <div className="b2-header-title">
                <h1>Les jalons</h1>
            </div>
            <div className="b2-header-buttons flex gap-5">
                <Button className="ml-5 bg-brick-300">
                <FontAwesomeIcon icon={faSquarePlus} />
                    <a className="pl-2">Créer</a>
                    </Button>
                <IconButton className="">
                    <FontAwesomeIcon icon={faFilter} />
                </IconButton>
            </div>
        </div>
        <div className="b2-body flex flex-wrap gap-10 mt-10">
            {steps.map((step:intStep, index:number) => (
                <Card className="mt-6 w-96 shadow-xl shadow-gray-500/50" key={index}>
                    
                    <CardBody>
                    <FontAwesomeIcon icon={faTableList} size="2xl" className="mb-5" />
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                    {step.name}
                    </Typography>
                    <Typography>
                        {step.description}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex justify-end">
                    <Button variant="outlined" className="text-brick-300 border-brick-300">
                        <a className="pr-2">Accéder</a>
                    <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                </CardFooter>
                
            </Card>
            ))}
            
        </div>
    </section>
  )
}
