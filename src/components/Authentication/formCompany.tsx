import { useFormik } from "formik";
import * as Yup from "yup";
import { intCompany } from "../../services/interfaces/intCompany";
import {
    Card,
    Input
} from "@material-tailwind/react";

interface FormCompanyProps{
  handleChange: (e: React.ChangeEvent<any>) => void;
  values: intCompany;
}

export default function FormCompany(props: FormCompanyProps) {

  const validationCompany = Yup.object({
    companyName: Yup.string().min(2, "Le nom de votre entreprise doit contenir au minimum 2 charactères").required("Le nom de votre entreprise est requis"),
    siret: Yup.string().min(14, "Votre SIRET doit contenir 14 chiffres").max(14, "Votre SIRET doit contenir 14 chiffres").required("Ce champ est requis"),
    companySActivity: Yup.string().required("Vous devez décrire vos activités")
  })


  const {handleChange, values, errors} = useFormik<intCompany>({
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
      <Card className="flex justify-center p-5">
          <Input
            label="Nom de l'entreprise"
            type="text"
            name="companyName"
            id="companyName"
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
      </Card>
  );
}
