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
    InputEvent,
    intProfileUser,
  } from "../../../services/interfaces/intProject";
import { intCompany} from "../../../services/interfaces/intUser.tsx";
import { deleteCompanyToBDD, modifyCompanyToBDD } from "../../../services/api/users.ts";

type Props = {
  open: boolean
  handleOpen: () => void;
  user: intProfileUser
  handleReload: () => void;
};

export default function ModifyCompanyModal({ handleReload, user,open, handleOpen}: Props) {
  const [company, setCompany] = useState<intCompany>({
     name:user.myCompany.name, siret:user.myCompany.siret, description: user.myCompany.description
  })
  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleClick = async () => {
    await modifyCompanyToBDD(user.myCompany.id, company);
    handleOpen()
    handleReload()
  };

  const handleDelete = async () => {
    await deleteCompanyToBDD(user.myCompany.id);
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
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h3" className="text-marine-300 text-xl font-extrabold text-center">
              Veuillez renseigner le nom de l'entreprise que vous voulez rejoindre
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
                value={company.name}
              />
              </div>
              <div className='mb-5'>
              <Input
                label="Siret l'entreprise"
                id="siret"
                name="siret"
                size="lg"
                value={company.siret}
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
                value={company.description}
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              /> 
              </div>    
            </div>
            <Button type='submit' size={"sm"} className={"bg-brick-300"} onClick={handleClick}>Modifier</Button>
            <Button type='submit' size={"sm"} className={"bg-brick-300"} onClick={handleDelete}>Supprimer mon entreprise</Button>
            </CardBody>
        </Card>
      </Dialog>
  );
}
