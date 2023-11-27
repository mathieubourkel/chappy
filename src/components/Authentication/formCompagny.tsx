import { useFormik } from "formik";
import * as Yup from "yup";
import { intCompagny } from "../../services/interfaces/intCompagny";
import { Input } from "@material-tailwind/react";

export default function FormCompagny() {

  const validationCompagny = Yup.object({
    compagnyName: Yup.string().min(2, "Le nom de votre entreprise doit contenir au minimum 2 charactère").required("Le nom de votre entreprise est requis"),
    siret: Yup.number().min(14, "Votre SIRET doit contenir 14 chiffres").max(14, "Votre SIRET doit contenir 14 chiffres").required("Ce champ est requis"),
    compagnySActivity: Yup.string().required("Vous devez décrire vos activités")
  })


  const {handleChange, handleSubmit, values, errors} = useFormik<intCompagny>({
    initialValues: {
        compagnyName: "",
        siret: "",
        compagnySActivity:"",
    },
   onSubmit: values =>{
    console.log(values)
   },
   validationSchema: validationCompagny
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
            value={values.compagnyName}
            aria-required
            onChange={handleChange}
            crossOrigin={undefined}
          />
          {errors.compagnyName && <small>{errors.compagnyName}</small>}
          <Input 
          label="SIRET"
          type="text"
          name="siret"
          id="siret"
          value={values.siret}
          aria-required
          onChange={handleChange}
          crossOrigin={undefined}
          />
          {errors.siret && <small>{errors.siret}</small>}
          <Input
          label="Décrire vos activités"
          name="compagnySActivity"
          id="compagnySActivity"
          value={values.compagnySActivity}
          aria-required
          onChange={handleChange}
          crossOrigin={undefined}
          />
          {errors.compagnySActivity && <small>{errors.compagnySActivity}</small>}
        </form>
      </article>
    </>
  );
}
