/* eslint-disable @typescript-eslint/no-explicit-any */
import { intLogin } from "../../services/interfaces/intLogin";
import {
  Button,
  Input
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faEnvelope, faLock,
  faRightToBracket
} from "@fortawesome/free-solid-svg-icons";
import { login } from "../../services/api/auth";
import { useNavigate } from "react-router-dom";
import ContextIsLogged from "../../context/ContextIsLogged";
import { useContext } from "react";

export default function FormLogin() {
  const {setIsLogged}:any = useContext(ContextIsLogged)
  const navigate  = useNavigate()
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
   onSubmit: async (values) => {
      await login(values)
      const token = localStorage.getItem('token')
      token && setIsLogged(true)
      token ? navigate('/dashboard') : alert('Rentre les bons logins !!!')  
    },
    validationSchema: validationLogin,
  });


  return (
      <article className="mt-5 lg:w-[25lvw] m-auto">
        <form
          className="flex flex-col gap-y-5"
          onSubmit={handleSubmit}
        >
          <Input
            label="E-mail"
            type="email"
            name="email"
            id="email"
            className={"!bg-light-100"}
            value={values.email}
            onChange={handleChange}
            aria-required
            crossOrigin={undefined}
            icon={<FontAwesomeIcon icon={faEnvelope} className={"text-marine-300 text-xl"}/>}
          />
          {errors.email && <small>{errors.email}</small>}
          <Input
            label="Mot de passe"
            type="password"
            name="password"
            id="password"
            className={"!bg-light-100"}
            value={values.password}
            onChange={handleChange}
            aria-required
            crossOrigin={undefined}
            icon={<FontAwesomeIcon icon={faLock} className={"text-marine-300 text-xl"}/>}
          />
          {errors.password && <small>{errors.password}</small>}

          <div className={"m-auto"}>
            <Button className={"bg-brick-400"} type="submit"><FontAwesomeIcon icon={faRightToBracket} className={"text-sm mr-3"}  />
              Se connecter
            </Button>
          </div>

        </form>
      </article>
  );
}
