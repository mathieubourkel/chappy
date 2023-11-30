import { Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { intEmployee } from "../../services/interfaces/intEmployee";

export default function FormEmployee() {
    const validationEmployee = Yup.object({
        companyName: Yup.string().required("Ce champ est requis")
    })

    const {handleChange, handleSubmit, values, errors} = useFormik<intEmployee>({
        initialValues: {
            companyNameEmployee: "",
        },
        onSubmit:values => {
            console.log(values)
        },
        validationSchema: validationEmployee
 
    })

    return (
        <>
       <article className="flex justify-center">
        <form className="w-96 flex gap-5 flex-col items-center" onSubmit={handleSubmit}>
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
        </form>
       </article>
        </>
    )
}