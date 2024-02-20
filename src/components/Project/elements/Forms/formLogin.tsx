/* eslint-disable @typescript-eslint/no-explicit-any */
import { intLogin } from "../../services/interfaces/intLogin";
import {
  Button,
  Input
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faEnvelope, faLock,
  faRightToBracket
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ContextIsLogged from "../../../../context/ContextIsLogged"
import { useContext } from "react";
import {login} from "../../../../services/api/auth"

export default function FormLogin() {
  const {setIsLogged}:any = useContext(ContextIsLogged)
  const navigate  = useNavigate()
  const validationLogin = yup.object({
    email: yup.string()
      .email(
        "Il manque un '@' ou alors un suffixe en .fr, .com"
      )
      .required("Votre E-mail est requis"),
    password: yup.string()
      .min(8, "Mot de passe avec 8 charactères minimum.")
      .required("Le mot de passe est obligatoire."),
  });

  const formik = useFormik<intLogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange:false,
    validationSchema: validationLogin,
   onSubmit: async (values) => {
      if (formik.errors.length >0) return;
      await login(values)
      const token = localStorage.getItem('token')
      token && setIsLogged(true)
      token ? navigate('/dashboard') : alert('Rentre les bons logins !!!')  
    },
    
  });

  return (
      <article className="mt-5 lg:w-[25lvw] m-auto">
        <form
          noValidate
          className="flex flex-col gap-y-5"
          onSubmit={formik.handleSubmit}
        >
          <Input
            label="E-mail"
            type="email"
            name="email"
            id="email"
            className={"!bg-light-100"}
            value={formik.values.email}
            onChange={formik.handleChange}
            aria-required
            crossOrigin={undefined}
            icon={<FontAwesomeIcon icon={faEnvelope} className={"text-marine-300 text-xl"}/>}
          />
          {formik.errors.email &&
          <small className={"text-brick-400 font-bold"}>{formik.errors.email}</small>}
          

          <Input
            label="Mot de passe"
            type="password"
            name="password"
            id="password"
            className={"!bg-light-100"}
            value={formik.values.password}
            onChange={formik.handleChange}
            aria-required
            crossOrigin={undefined}
            icon={<FontAwesomeIcon icon={faLock} className={"text-marine-300 text-xl"}/>}
          />
          {formik.errors.password &&
          <small className={"text-brick-400 font-bold"}>{formik.errors.password}</small>}

          <div className={"m-auto"}>
            <Button className={"bg-brick-400"} type="submit"><FontAwesomeIcon icon={faRightToBracket} className={"text-sm mr-3"}  />
              Se connecter
            </Button>
          </div>

        </form>
      </article>
  );
}
