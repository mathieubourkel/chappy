/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@material-tailwind/react";
import {  useState } from "react";
import { sendEmailForReset } from "../../services/api/users";
import { FormEvent } from "../../services/interfaces/generique.interface";
import MagicButton from "../../components/elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import { ResetPwdSchema } from "../../services/schemas/login.schema";
import { useMagicForm } from "../../hooks/useMagicForm";
import MagicInput from "../../components/elements/Input/MagicInput";

export default function ResetPwd() {

    const [mailSent, setMailSent] = useState<boolean>(false)
    const {form, handleChange, validateForm, renderErrors} = useMagicForm()

    const handleSubmit = async (e:FormEvent) => {
      e.preventDefault()
      if (!validateForm(ResetPwdSchema)) return;
      await sendEmailForReset(form)
      setMailSent(true)
    };

  return (
    <main className={"sm:mx-20 mx-5 flex flex-col justify-center items-center"}>
        {!mailSent ? 
        <section className={"flex flex-col gap-y-3"}>
        <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <article>
            <Typography variant="h2" className={"font-bold text-center mb-10"}>
              Réinitialiser son mot de passe
            </Typography>
            <div>
              <MagicInput name='email' label='Entrez votre email' handleChange={handleChange} renderErrors={renderErrors}/>
            </div>
            <div className={"flex justify-center my-10"}>
              <MagicButton type={ButtonTypeEnum.SEND} />
            </div>
          </article> 
        </form>
        </section>
        : <Typography variant="h3" className={"text-brick-300 text-center mb-10"}>
            Le lien vers le formulaire de réinitialisaiton du mot de passe a été envoyé par email. <br/>
            Veuillez attendre quelques instants et vérifier dans vos spams avant de refaire une demande.
          </Typography>}
    </main>
  )
}
