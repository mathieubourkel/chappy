/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Typography } from "@material-tailwind/react";
import {  useState } from "react";
import { FormEvent, InputEvent } from "../../services/interfaces/intProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { sendEmailForReset } from "../../services/api/users";

export default function ResetPwd() {

    const [email, setEmail] = useState<any>('');
    const [mailSent, setMailSent] = useState<boolean>(false)

    const handleChange = (e: InputEvent) => {
        const { value } = e.target;
        setEmail(value);
      };

      const handleSubmit = async (e:any) => {
        e.preventDefault()
        await sendEmailForReset(email)
        setMailSent(true)
      }

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
                <Input
                  label="Entrez votre email"
                  className={"!bg-light-100 border-select placeholder:!text-text-100"}
                  name="email"
                  id="email"
                  crossOrigin={undefined}
                  onChange={(e: InputEvent) => handleChange(e)}
                />
              </div>
              <div className={"flex justify-center my-10"}>
              <Button className={"bg-brick-400"} type="submit" size={"sm"}>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className={"text-sm mr-3"}
                />{" "}
                Envoyer l'email
              </Button>
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
