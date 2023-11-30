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
            {errors.lastname && <small>{errors.lastname}</small>}

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
            {errors.firstname && <small>{errors.firstname}</small>}
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
          {errors.email && <small>{errors.email}</small>}

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
          {errors.address && <small>{errors.address}</small>}

          <div className="flex gap-2">
            <Input
              label="Code postal"
              type="text"
              name="postal"
              id="postal"
              value={values.postal !== null ? values.postal : ''}
              onChange={handleChange}
              crossOrigin={undefined}
              aria-required
            />
            {errors.postal && <small>{errors.postal}</small>}

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
            {errors.city && <small>{errors.city}</small>}
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
          {errors.phone && <small>{errors.phone}</small>}
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
            {errors.password && <small>{errors.password}</small>}

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
            {errors.checkPassword && <small>{errors.checkPassword}</small>}
          </div>
        </form>
      </article>
    </>
  );
}
