import {
    Card,
    Input
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { intEmployee } from "../../services/interfaces/intEmployee";

interface FormEmployeeProps{
    handleChange: (e: React.ChangeEvent<any>) => void;
    values: intEmployee;
  }

export default function FormEmployee(props: FormEmployeeProps) {
    const validationEmployee = Yup.object({
        companyName: Yup.string().required("Ce champ est requis")
    })

    const {handleChange, values, errors} = useFormik<intEmployee>({
        initialValues: {
            companyNameEmployee: "",
        },
        onSubmit:values => {
            console.log(values)
        },
        validationSchema: validationEmployee
 
    })

    return (
       <Card className="flex justify-center p-5">
       
        <Input
            label="Nom de l'entreprise"
            type="text"
            name="companyNameEmployee"
            id="companyNameEmployee"
            value={values.companyNameEmployee}
            aria-required
            onChange={handleChange}
            crossOrigin={undefined}
          />
          {errors.companyNameEmployee && <small>{errors.companyNameEmployee}</small>}
     
       </Card>
    )
}