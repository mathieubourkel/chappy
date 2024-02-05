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
import { intLightCompany } from "../../../services/interfaces/intUser.tsx";
import { getAllCompanies, rejoinCompany } from "../../../services/api/users.ts";
import ReactSelect from "react-select";
import { intCompany, intSelect } from "../../../services/interfaces/intProject.tsx";

type Props = {
  open: boolean
  handleOpen: () => void;
  handleReload: () => void;
};

const animatedComponents = makeAnimated();

export default function RejoinCompanyModal({ open, handleOpen, handleReload}: Props) {
    const [companies, setCompanies] = useState<Array<intSelect>>([]);
    const [error, setError] = useState<boolean>(false)
    const [company, setCompany] = useState<intLightCompany>({id:0})

  useEffect(() => {
    const getCompanies = async () => {
        try {
            const result = await getAllCompanies()
            const formatArray: Array<intSelect> = result.map(
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
      await rejoinCompany(company);
      handleOpen()
      handleReload()
    } catch {
      alert("Error pour rejoindre l'entreprise");
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
            <div className="flex gap-2 mt-5">
            <div>
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
              <Button onClick={handleClick} size={"sm"} className={"bg-brick-300"}>Rejoindre</Button>
            </div>
          </CardBody>
        </Card>
      </Dialog>
  );
}