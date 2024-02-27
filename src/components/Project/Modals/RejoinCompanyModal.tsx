/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import "./modal.css";
import makeAnimated from "react-select/animated";
import { getAllCompanies, rejoinCompanyDemand } from "../../../services/api/users.ts";
import ReactSelect from "react-select";
import { intSelects } from "../../../services/interfaces/generique.interface.tsx";
import { intCompany, intLightCompany } from "../../../services/interfaces/intCompany.tsx";
import { colors } from "@material-tailwind/react/types/generic";

type Props = {
  open: boolean
  handleOpen: () => void;
  handleReload: () => void;
  newAlert: (message: string, color: colors) => void;
};

const animatedComponents = makeAnimated();

export default function RejoinCompanyModal({ open, handleOpen, handleReload, newAlert}: Props) {
    const [companies, setCompanies] = useState<intSelects>([]);
    const [error, setError] = useState<boolean>(false)
    const [company, setCompany] = useState<intLightCompany>({id:0})

  useEffect(() => {
    const getCompanies = async () => {
        try {
            const {data} = await getAllCompanies()
            const formatArray: intSelects = data.map(
                (element: intCompany) => ({ label: element.name, value: element.id })
              );
            setCompanies(formatArray)
        } catch (error) {
            setError(true)
        }
    }
    getCompanies()
    
  }, [])
  const handleCompany = (value: any) => {
    setCompany({ id: value.value });
  };

  const handleClick = async () => {
    try {
      await rejoinCompanyDemand(company.id || 0);
      newAlert("Votre demande pour rejoindre l'entreprise a été envoyé.", 'green')
      handleOpen()
      handleReload()
    } catch {
      newAlert("Votre demande pour rejoindre l'entreprise a échoué.", 'red')
    }
  };
  if (error) return <div>Error Fetching Companies</div>
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
            <div className="gap-2 mt-5">
            <div className='w-full'>
              <ReactSelect
                options={companies}
                components={animatedComponents}
                placeholder="Sélectionnez une entreprise"
                className={"border-select"}
                onChange={(value: any) => handleCompany(value)}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: 'rgba(126,55,47, 0.2)',
                    primary:'rgba(126,55,47, 0.7)',
                    primary50: 'rgba(126,55,47, 0.3)',
                  },
                })}
              />
            </div>
            <div className='flex justify-center mt-5'>
              <Button onClick={handleClick} size={"sm"} className={"bg-brick-300"}>Envoyer la demande</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Dialog>
  );
}