/* eslint-disable @typescript-eslint/no-explicit-any */
import {Input} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock,} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ContextIsLogged from "../../../context/ContextIsLogged"
import { useContext } from "react";
import {login} from "../../../services/api/auth"
import { FormEvent,InputEvent } from "../../../services/interfaces/generique.interface";
import MagicButton from "../Buttons/MagicButton";
import { ButtonTypeEnum } from "../../../services/enums/button.type";
import { useMagicForm } from "../../../hooks/useMagicForm";
import { LoginSchema } from "../../../services/schemas/login.schema";

export default function FormLogin({newAlert}:{newAlert:any}) {
  const {setIsLogged}:any = useContext(ContextIsLogged)
  const navigate  = useNavigate()
  const {form, handleChange, validateForm, renderErrors} = useMagicForm()

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    if (!validateForm(LoginSchema)) return;
    await login(form)
    const token = localStorage.getItem('token')
    token && setIsLogged(true)
    token ? navigate('/dashboard') : newAlert('Identifiants incorrects', 'red')
  }

  return (
      <form className="flex flex-col gap-y-5" onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <Input
          label="E-mail"
          name="email"
          id="email"
          className={"!bg-light-100"}
          onChange={(e: InputEvent) => handleChange(e)}
          crossOrigin={undefined}
          icon={<FontAwesomeIcon icon={faEnvelope} className={"text-marine-300 text-xl"}/>}
        />
        {renderErrors('email')}

        <Input
          label="Mot de passe"
          type="password"
          name="password"
          id="password"
          className={"!bg-light-100"}
          onChange={(e: InputEvent) => handleChange(e)}
          crossOrigin={undefined}
          icon={<FontAwesomeIcon icon={faLock} className={"text-marine-300 text-xl"}/>}
        />
        {renderErrors('password')}

        <div className={"m-auto"}>
          <MagicButton type={ButtonTypeEnum.SIGNIN}/>
        </div>
        
      </form>
  );
}
