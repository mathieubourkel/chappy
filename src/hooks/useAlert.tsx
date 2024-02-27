/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState  } from "react";
import { intAlert } from "../services/interfaces/generique.interface";
import { Alert } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";

type Props = [
  ReactNode,
(message: string, color: colors) => void
]

export const useAlert = ():Props =>{

  const [alert, setAlert] = useState<intAlert>({open: false, message:'', color:'green'})

  const renderAlert = () => {
    return (
    <Alert 
      color={alert.color} 
      className='m-1 sticky top-0 my-10' 
      open={alert.open} 
      onClose={() => setAlert({...alert, open:false})}>
      {alert.message}
    </Alert>
)
  }

    const newAlert = (message: string, color: colors) => {
      setAlert({open: true, message, color})
    }

  return [renderAlert(), newAlert]
}
