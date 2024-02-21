import {
    Alert,
    Typography
} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";
import FormLogin from "../../components/Project/elements/Forms/formLogin"
import { useState } from "react";
import { intAlert } from "../../services/interfaces/generique.interface";


export default function LoginPage() {
    const [alert, setAlert] = useState<intAlert>({open: false, message:'', color:'green', reDisplay: false})
    if (!alert.reDisplay && location.hash == "#created") {
        setAlert({open: true, message:"Le compte a bien été crée, vous trouverez dans votre boite mail un lien d'activation.", color: 'green', reDisplay:true})
    }
  return (
    <main className={"sm:mx-20 mx-5 flex flex-col justify-center items-center"}>
        <Alert color={alert.color} className='m-1 sticky top-0 my-10' open={alert.open} onClose={() => setAlert({...alert, open:false, reDisplay: true})}>
            {alert.message}
          </Alert>
        <section className={"flex flex-col gap-y-3"}>
            <Typography
                variant="h1"
                className={"font-bold text-center"}
            >
                Se connecter
            </Typography>

                <FormLogin setAlert={setAlert}/>

            <div className={"flex gap-x-2 mt-2 m-auto"}>
                <Typography
                    variant="paragraph"
                    className={"text-center text-sm"}
                >
                    Je n'ai pas de compte ?
                </Typography>

                <Typography
                    variant="paragraph"
                    className={"text-center text-sm text-brick-400 font-bold hover:text-marine-300 underline underline-offset-4 decoration-marine-300 hover:decoration-brick-300 cursor-pointer"}
                >
                    <NavLink to={"/signup"}>
                        Créer un compte
                    </NavLink>
                </Typography>
            </div>
            <div className={"flex gap-x-2 mt-2 m-auto"}>
                <Typography
                    variant="paragraph"
                    className={"text-center text-sm"}
                >
                    Mot de passe oublié ?
                </Typography>

                <Typography
                    variant="paragraph"
                    className={"text-center text-sm text-brick-400 font-bold hover:text-marine-300 underline underline-offset-4 decoration-marine-300 hover:decoration-brick-300 cursor-pointer"}
                >
                    <NavLink to={"/reset-pwd"}>
                        Réinitialiser son mot de passe
                    </NavLink>
                </Typography>
            </div>


        </section>
    </main>
  );
}
