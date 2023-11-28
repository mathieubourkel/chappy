import { Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { intEmployee } from "../../services/interfaces/intEmployee";

export default function FormEmployee() {
    const validationEmployee = Yup.object({
        compagnyName: Yup.string().required("Ce champ est requis")
    })

    const {handleChange, handleSubmit, values, errors} = useFormik<intEmployee>({
        initialValues: {
            compagnyName: "",
        },
        onSubmit:values => {
            console.log(values)
        }
    })

    return (
        <>
       <article className="flex justify-center">
        <form className="w-96 flex gap-5 flex-col items-center" onSubmit={handleSubmit}>
        <Input
            label="Nom de l'entreprise"
            type="text"
            name="compagnyNameEmployee"
            id="compagnyNameEmployee"
            value={values.compagnyName}
            aria-required
            onChange={handleChange}
            crossOrigin={undefined}
          />
        </form>
       </article>
        </>
    )
}