import { useFormik } from "formik";
import * as Yup from "yup";
import { intUsers } from "../../services/interfaces/intUser";
import { Input } from "@material-tailwind/react";

export default function FormUser() {
  const validationUser = Yup.object({
    lastname: Yup.string().min(2).required(),
    firstname: Yup.string().min(2).required(),
    email: Yup.string().required(),
    address: Yup.string().required(),
    postal: Yup.number().min(5).max(5).required(),
    city: Yup.string().min(2).required(),
    phone: Yup.number().required(),
    password: Yup.string().min(8).required(),
    checkPassword: Yup.string().min(8).required(),
  });

  const {handleChange, handleSubmit, values, errors} = useFormik<intUsers>({
    initialValues: {
      lastname: "",
      firstname: "",
      email: "",
      address: "",
      postal: null,
      city: "",
      phone: null,
      password: "",
      checkPassword: "",
    },
    onSubmit:values =>{
      console.log(values)
     },
     validationSchema: validationUser
  })

  return (
    <>
      <article className="flex justify-center">
        <form
          className="w-96 flex gap-5 flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2">
            <Input
              label="Nom"
              type="text"
              name="lastname"
              id="lastname"
              value={values.lastname}
              onChange={handleChange}
              crossOrigin={undefined}
             
              aria-required
            />

            <Input
              label="Prénom"
              type="text"
              name="firstname"
              id="firstname"
              value={values.firstname}
              onChange={handleChange}
              crossOrigin={undefined}
     
              aria-required
            />
          </div>
          <Input
            label="E-mail"
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            crossOrigin={undefined}
       
            aria-required
          />

          <Input
            label="Adresse"
            type="text"
            name="address"
            id="address"
            value={values.address}
            onChange={handleChange}
            crossOrigin={undefined}
           
            aria-required
          />

          <div className="flex gap-2">
            <Input
              label="Code postal"
              type="number"
              name="postal"
              id="postal"
              value={values.postal !== null ? values.postal : ''}
              onChange={handleChange}
              crossOrigin={undefined}
         
              aria-required
            />

            <Input
              label="Ville"
              type="text"
              name="city"
              id="city"
              value={values.city}
              onChange={handleChange}
              crossOrigin={undefined}
            
              aria-required
            />
          </div>
          <Input
            label="Téléphone"
            type="tel"
            name="phone"
            id="phone"
            value={values.phone !== null ? values.phone : ''}
            onChange={handleChange}
            crossOrigin={undefined}
       
            aria-required
          />
          <div className="flex gap-2">
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              crossOrigin={undefined}
          
              aria-required
            />

            <Input
              label="Confirmer du mot de passe"
              type="password"
              name="checkPassword"
              id="checkPassword"
              value={values.checkPassword}
              onChange={handleChange}
              crossOrigin={undefined}
         
              aria-required
            />
          </div>
        </form>
      </article>
    </>
  );
}
