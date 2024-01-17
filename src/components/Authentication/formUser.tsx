import { useFormik } from "formik";
import * as Yup from "yup";
import { intUsers } from "../../services/interfaces/intUser";
import { Input } from "@material-tailwind/react";


export default function FormUser() {
  const validationUser = Yup.object({
    lastname: Yup.string().min(2, "Votre nom doit contenir au minimum 2 charactères").required("Ce champ est requis"),
    firstname: Yup.string().min(2).required("Ce champ est requis"),
    email: Yup.string().email("L'adresse email doit contenir '@' et une extension '.com', '.fr' ").required("Ce champ est requis"),
    address: Yup.string().required("Ce champ est requis"),
    postal: Yup.string().min(5, "Le code postal doit contenir 5 charactères").max(5, "Le code postal doit contenir 5 charactères").required("Ce champ est requis"),
    city: Yup.string().min(2, "Ce champ doit contenir au minimum 2 charactères").required("Ce champ est requis"),
    phone: Yup.string().required("Ce champ est requis"),
    password: Yup.string().min(8, "Le mot de passe doit contenir au minimum 8 charactères").required("Ce champ est requis"),
    checkPassword: Yup.string().oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas.').required("Ce champ est requis"),
  });

  const {handleChange, values, errors} = useFormik<intUsers>({
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
      <article className="mt-5 m-auto">
        
          <div className="sm:flex sm:gap-x-5">
            <div className={"mb-5 w-full"}>
            <Input
              label="Nom"
              type="text"
              name="lastname"
              id="lastname"
              className={"!bg-light-100"}
              value={values.lastname}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
              {errors.lastname && <small className={"text-brick-400 font-bold"}>{errors.lastname}</small>}
            </div>

            <div className={"mb-5 w-full"}>
            <Input
              label="Prénom"
              type="text"
              name="firstname"
              id="firstname"
              className={"!bg-light-100"}
              value={values.firstname}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.firstname && <small className={"text-brick-400 font-bold"}>{errors.firstname}</small>}
            </div>
          </div>
          <div className={"mb-5 w-full"}>
          <Input
            label="E-mail"
            type="email"
            name="email"
            id="email"
            className={"!bg-light-100"}
            value={values.email}
            onChange={handleChange}
            crossOrigin={undefined}
            aria-required
          />
          {errors.email && <small className={"text-brick-400 font-bold"}>{errors.email}</small>}
          </div>
          <div className={"mb-5 w-full"}>
          <Input
            label="Adresse"
            type="text"
            name="address"
            id="address"
            className={"!bg-light-100"}
            value={values.address}
            onChange={handleChange}
            crossOrigin={undefined}
            aria-required
          />
          {errors.address && <small className={"text-brick-400 font-bold"}>{errors.address}</small>}
          </div>

          <div className="sm:flex sm:gap-x-5">
            <div className={"mb-5 w-full"}>
            <Input
              label="Code postal"
              type="text"
              name="postal"
              id="postal"
              className={"!bg-light-100"}
              value={values.postal !== null ? values.postal : ''}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.postal && <small className={"text-brick-400 font-bold"}>{errors.postal}</small>}
            </div>
            <div className={"mb-5 w-full"}>
            <Input
              label="Ville"
              type="text"
              name="city"
              id="city"
              className={"!bg-light-100"}
              value={values.city}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.city && <small className={"text-brick-400 font-bold"}>{errors.city}</small>}
            </div>
          </div>
          <div className={"mb-5 w-full"}>
          <Input
            label="Téléphone"
            type="tel"
            name="phone"
            id="phone"
            className={"!bg-light-100"}
            value={values.phone !== null ? values.phone : ''}
            onChange={handleChange}
            crossOrigin={undefined}
            aria-required
          />
          {errors.phone && <small className={"text-brick-400 font-bold"}>{errors.phone}</small>}
          </div>
          <div className="sm:flex sm:gap-x-5">
            <div className={"mb-5 w-full"}>
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              id="password"
              className={"!bg-light-100"}
              value={values.password}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.password && <small className={"text-brick-400 font-bold"}>{errors.password}</small>}
            </div>
            <div className={"mb-5 w-full"}>
            <Input
              label="Confirmer du mot de passe"
              type="password"
              name="checkPassword"
              id="checkPassword"
              className={"!bg-light-100"}
              value={values.checkPassword}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.checkPassword && <small className={"text-brick-400 font-bold"}>{errors.checkPassword}</small>}
            </div>
          </div>
    
      </article>
  );
}
