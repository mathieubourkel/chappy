import { useFormik } from "formik";
import * as Yup from "yup";
import { intCompany } from "../../services/interfaces/intCompany";
import { Input } from "@material-tailwind/react";

export default function FormCompagny() {

  const validationCompany = Yup.object({
    companyName: Yup.string().min(2, "Le nom de votre entreprise doit contenir au minimum 2 charactère").required("Le nom de votre entreprise est requis"),
    siret: Yup.number().min(14, "Votre SIRET doit contenir 14 chiffres").max(14, "Votre SIRET doit contenir 14 chiffres").required("Ce champ est requis"),
    companySActivity: Yup.string().required("Vous devez décrire vos activités")
  })


  const {handleChange, handleSubmit, values, errors} = useFormik<intCompany>({
    initialValues: {
        companyName: "",
        siret: null,
        companySActivity:"",
    },
   onSubmit: values =>{
    console.log(values)
   },
   validationSchema: validationCompany
  })

  

  return (
    <>
      <article className="flex justify-center">
        <form className="w-96 flex gap-5 flex-col items-center" onSubmit={handleSubmit}>
          <Input
            label="Nom de l'entreprise"
            type="text"
            name="compagnyName"
            id="compagnyName"
            value={values.companyName}
            aria-required
            onChange={handleChange}
            crossOrigin={undefined}
          />
          {errors.companyName && <small>{errors.companyName}</small>}
          <Input 
          label="SIRET"
          type="text"
          name="siret"
          id="siret"
          value={values.siret !== null ? values.siret : ''}
          aria-required
          onChange={handleChange}
          crossOrigin={undefined}
          />
          {errors.siret && <small>{errors.siret}</small>}
          <Input
          label="Décrire vos activités"
          name="companySActivity"
          id="companySActivity"
          value={values.companySActivity}
          aria-required
          onChange={handleChange}
          crossOrigin={undefined}
          />
          {errors.companySActivity && <small>{errors.companySActivity}</small>}
        </form>
      </article>
    </>
  );
}
