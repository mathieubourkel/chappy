import {Typography} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";
import FormLogin from "../../components/elements/Forms/FormLogin"
import { useAlert } from "../../hooks/useAlert";
import { useState } from "react";


export default function LoginPage() {
    const [renderAlert, newAlert] = useAlert()
    const [accountCreated, setAccountCreated] = useState<boolean>(false)
    
    if (accountCreated) {
        newAlert("Votre compte a bien été créé, vous devez activez votre compte via le lien envoyé par email", "green")
        location.hash = ""
        setAccountCreated(false)
    }

    if (location.hash == "#created") {
        setAccountCreated(true)
    }
    
  return (
    <main className={"sm:mx-20 mx-5 flex flex-col justify-center items-center"}>
          {renderAlert}
        <section className={"flex flex-col gap-y-3"}>
            <Typography variant="h1" className={"font-bold text-center"}>
                Se connecter
            </Typography>
            <article className="mt-5 lg:w-[25lvw] m-auto">
                <FormLogin newAlert={newAlert}/>
            </article>
            <div className={"flex gap-x-2 mt-2 m-auto"}>
                <Typography variant="paragraph" className={"text-center text-sm"}>
                    Je n'ai pas de compte ?
                </Typography>

                <Typography variant="paragraph" className={"text-center text-sm text-brick-400 font-bold hover:text-marine-300 underline underline-offset-4 decoration-marine-300 hover:decoration-brick-300 cursor-pointer"}>
                    <NavLink to={"/signup"}>
                        Créer un compte
                    </NavLink>
                </Typography>
            </div>
            <div className={"flex gap-x-2 mt-2 m-auto"}>
                <Typography variant="paragraph" className={"text-center text-sm"}>
                    Mot de passe oublié ?
                </Typography>

                <Typography variant="paragraph" className={"text-center text-sm text-brick-400 font-bold hover:text-marine-300 underline underline-offset-4 decoration-marine-300 hover:decoration-brick-300 cursor-pointer"}>
                    <NavLink to={"/reset-pwd"}>
                        Réinitialiser son mot de passe
                    </NavLink>
                </Typography>
            </div>
        </section>
    </main>
  );
}
