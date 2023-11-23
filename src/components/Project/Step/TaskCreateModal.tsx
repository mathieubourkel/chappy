/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { intTask, intTasks } from "../../../services/interfaces/intProject";
 
type Props = {
  tasks: intTasks,
  setTask: (tasks:intTasks) => void;
}

export function TaskCreateModal({tasks, setTask}:Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [form, setForm] = useState<intTask>({
    name: "", description: "", categorie: "", startDate: "", endDate: "", status: "En cours"
})

  function handleChange(e:any){
    const { name, value } = e.target;
    setForm({...form, [name] : value})
  
  }

  function handleSubmit(e:any){
    e.preventDefault(); 
    setTask([...tasks, form])
    setForm({name: "", description: "", categorie: "", startDate: "", endDate: "", status: "En cours"})
  }
 
  return (
    <div>
      <Button className="mr-5 bg-brick-300 flex items-center"
      onClick={handleOpen}>
              <FontAwesomeIcon icon={faSquarePlus} />
              <a className="pl-2 hidden md:flex">Créer</a>
            </Button>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
        <form onSubmit={(e:any) => handleSubmit(e)}>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
            <FontAwesomeIcon icon={faSquarePlus} className="mr-3" />
              Créer une tâche
            </Typography>
            <Input label="Nom de la tâche" size="lg" name="name" id="name" crossOrigin={undefined} 
            onChange={(e:any) => handleChange(e)}/>
            <Textarea label="Description" size="lg" name="description" id="description" 
            onChange={(e:any) => handleChange(e)}/>
            <Textarea label="Catégorie" size="lg" name="categorie" id="categorie" 
            onChange={(e:any) => handleChange(e)}/>
            <div className="md: flex gap-3">
            <Input label="Date de début" size="lg" crossOrigin={undefined} name="startDate" id="startDate"
            onChange={(e:any) => handleChange(e)}/>
            <Input label="Date de fin" size="lg" crossOrigin={undefined} name="endDate" id="endDate"
            onChange={(e:any) => handleChange(e)}/>
            </div>
            
          </CardBody>
          <CardFooter className="pt-0 flex justify-center">
            <Button variant="gradient" onClick={handleOpen} type="submit">
            Créer
            </Button>
          </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}