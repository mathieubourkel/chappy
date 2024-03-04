/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MagicButton from "../../components/elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import { FormEvent } from "../../services/interfaces/generique.interface";
import { useMagicForm } from "../../hooks/useMagicForm";
import MagicInput from "../../components/elements/Input/MagicInput";
import { ForgotPasswordSchema } from "../../services/schemas/password.schema";
import { useFetch } from "../../hooks/useFetch";
import { ApiPathEnum } from "../../services/enums/api.path.enum";
import { resetPwdWithEmail } from "../../services/api/users";

export default function ForgotPwd() {
  const navigate  = useNavigate()
    const { emailToken } = useParams();
    const {form, handleChange, validateForm, renderErrors} = useMagicForm()
    const {data, handleErrorAndLoading} = useFetch(`${ApiPathEnum.EMAIL_TOKEN}/${emailToken}`)

    const handleSubmit = async (e:FormEvent) => {
      e.preventDefault()
      if (!validateForm(ForgotPasswordSchema)) return;
      await resetPwdWithEmail({newPwd: form.newPwd, emailToken: data.emailToken})
      navigate('/')
    }

  return (
    <main className={"sm:mx-20 mx-5 flex flex-col justify-center items-center"}>
        {handleErrorAndLoading()}
        {data && <section className={"flex flex-col gap-y-3"}>
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <article>
              <Typography variant="h2" className={"font-bold text-center mb-10"}>
                Réinitialisation du mot de passe
              </Typography>
              <div >
                <div className={"mb-5 w-full"}>
                  <MagicInput name='newPwd' label='Nouveau mot de passe' handleChange={handleChange} renderErrors={renderErrors} type='password'/>
                </div>
                  <div>
                  <MagicInput name='confirmNewPwd' label='Confirmer le nouveau mot de passe' handleChange={handleChange} renderErrors={renderErrors} type='password'/>
                </div>
                <div className={"flex justify-center my-10"}>
                  <MagicButton type={ButtonTypeEnum.SEND}/>
                </div>
              </div>
            </article>
          </form>
        </section>}
    </main>
  )
}
