import { intLogin } from "../../services/interfaces/intLogin";
import { Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function FormLogin() {
  const validationLogin = Yup.object({
    email: Yup.string()
      .email(
        "L'adresse email doit contenir '@' et une extension '.com', '.fr' "
      )
      .required("Votre E-mail est requis"),
    password: Yup.string()
      .min(8, "le mot de passe doit contenir au minimum 8 charactères")
      .required("Le mot de passe est obligatoire"),
  });

  const { handleChange, handleSubmit, values, errors } = useFormik<intLogin>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationLogin,
  });

  return (
    <>
      <article className="flex justify-center">
        <form
          className="w-96 flex gap-5 flex-col items-center"
          onSubmit={handleSubmit}
        >
          <Input
            label="E-mail"
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            aria-required
            crossOrigin={undefined}
          />
          {errors.email && <small>{errors.email}</small>}
          <Input
            label="Mot de passe"
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            aria-required
            crossOrigin={undefined}
          />
          {errors.password && <small>{errors.password}</small>}

          <button type="submit" className="bg-marine-300 text-white">
            Se connecter
          </button>
        </form>
      </article>
    </>
  );
}
