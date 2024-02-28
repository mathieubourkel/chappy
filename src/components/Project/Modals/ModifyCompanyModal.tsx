/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { deleteCompanyToBDD, modifyCompanyToBDD, refuseDemandCompany, validateDemandCompany } from "../../../services/api/users.ts";
import { intCompany } from "../../../services/interfaces/intCompany.tsx";
import { InputEvent } from "../../../services/interfaces/generique.interface";
import { faCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { colors } from "@material-tailwind/react/types/generic";

type Props = {
  group: intCompany
  handleReload: () => void;
  newAlert: (message: string, color: colors) => void;
};

export default function ModifyCompanyModal({ handleReload,group, newAlert}: Props) {
  const [company, setCompany] = useState<intCompany>(group)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((bool) => !bool);
  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleClick = async () => {
    await modifyCompanyToBDD(company.id ||0, company);
    newAlert("La modification a été executé avec succès.", 'green')
    handleOpen()
    handleReload()
  };

  const handleDelete = async () => {
    await deleteCompanyToBDD(company.id || 0);
    newAlert("L'entreprise a été suprimé.",'green')
    handleOpen()
    handleReload()
  };

  const handleValidateUser = async (demandId:number) => {
    await validateDemandCompany(demandId);
    handleReload()
  };

  const handleRefuseUser = async (demandId:number) => {
    await refuseDemandCompany(demandId);
    handleReload()
  };

  return (
    <>
    <IconButton
        variant="outlined"
        className="text-marine-300 border-marine-300"
        size={"sm"}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faPen}
        size={"sm"}/>
      </IconButton>
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
                id="additionalInfos"
                name="additionalInfos"
                size="lg"
                value={company.additionalInfos}
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
            {group.demands && group.demands.map((demand) => (
              <div key={demand.id} className="flex gap-2">
              <Input
              label={(demand.status != 1) ? "Demande en attente de validation" : "Employé de votre entreprise"}
              id={demand.id?.toString()}
              name="demand"
              size="lg"
              value={demand.user?.email}
              crossOrigin={undefined}
              readOnly
            /> 
            {demand.status != 1 && 
                <IconButton
                onClick={() => handleValidateUser(demand.id ||0)}
                    className="text-white bg-brick-300 text-sm"
                    variant="outlined"
                  >
                    <FontAwesomeIcon icon={faCheck} className={"text-sm"} />
                  </IconButton>}
                  <IconButton onClick={() => handleRefuseUser(demand.id ||0)}
                  className="text-white bg-marine-300 text-sm"
                    variant="outlined">
                  <FontAwesomeIcon icon={faXmark} className={"text-sm"}/>
                </IconButton>
                </div>
            ))}
            <div>

            </div>
            <Button type='submit' size={"sm"} className={"bg-brick-300"} onClick={handleClick}>Modifier</Button>
            <Button type='submit' size={"sm"} className={"bg-brick-300"} onClick={handleDelete}>Supprimer mon entreprise</Button>
            </CardBody>
        </Card>
      </Dialog>
      </>
  );
}
