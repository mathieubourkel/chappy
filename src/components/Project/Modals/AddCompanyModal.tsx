/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import "./modal.css";
import {
    FormEvent,
    InputEvent,
  } from "../../../services/interfaces/intProject";
import { intCompany} from "../../../services/interfaces/intUser.tsx";
import { addCompanyToBDDFromUser } from "../../../services/api/users.ts";

type Props = {
  open: boolean
  handleOpen: () => void;
  handleReload: () => void;
};

export default function AddCompanyModal({ open, handleOpen, handleReload}: Props) {
  const [company, setCompany] = useState<intCompany>({
    name:'', siret:'', description: ''
  })
  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addCompanyToBDDFromUser(company);
    handleOpen()
    handleReload()
  };

  return (
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="custom-modal">
        <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h3" className="text-marine-300 text-xl font-extrabold text-center">
              Veuillez renseigner les informations de votre entreprise
            </Typography>
            <div className="mt-5">
                <div className='mb-5'>
              <Input
                label="Nom de l'entreprise"
                id="name"
                name="name"
                size="lg"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              </div>
              <div className='mb-5'>
              <Input
                label="Siret l'entreprise"
                id="siret"
                name="siret"
                size="lg"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              /> 
              </div>
              <div>  
              <Input
                label="Description de l'entreprise"
                id="description"
                name="description"
                size="lg"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              /> 
              </div>    
            </div>
            <Button type='submit' size={"sm"} className={"bg-brick-300"}>Ajouter</Button>
            </CardBody>
            </form>
          
        </Card>
      </Dialog>
  );
}