/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {Dialog,Card,CardBody,Typography,Input,} from "@material-tailwind/react";
import { addCompanyToBDDFromUser } from "../../services/api/users.ts";
import { intCompany } from "../../services/interfaces/intCompany.tsx";
import { FormEvent, InputEvent } from "../../services/interfaces/generique.interface.tsx";
import { colors } from "@material-tailwind/react/types/generic";
import { ButtonTypeEnum } from "../../services/enums/button.type.ts";
import MagicButton from "../elements/Buttons/MagicButton.tsx";

type Props = {
  open: boolean
  handleOpen: () => void;
  handleReload: () => void;
  newAlert: (message: string, color: colors) => void;
};

export default function AddCompanyModal({ open, handleOpen, handleReload, newAlert}: Props) {
  const [company, setCompany] = useState<intCompany>({
    name:'', additionalInfos:'', description: ''
  })
  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addCompanyToBDDFromUser(company);
    newAlert("L'entreprise a été ajouté avec succès.", 'green')
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
       
          <CardBody >
          <Typography variant="h3" className="text-marine-300 text-xl font-extrabold text-center">
              Veuillez renseigner les informations de votre entreprise
            </Typography>
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}
          className="flex flex-col gap-4">
            
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
                id="additionalInfos"
                name="additionalInfos"
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
            <MagicButton type={ButtonTypeEnum.CREATE} value='Ajouter'/>
            </form>
            </CardBody>
            
          
        </Card>
      </Dialog>
  );
}
