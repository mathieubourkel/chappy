import FormLogin from "../../components/Authentication/formLogin";
import {
    Typography
} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LoginPage() {
  return (
    <main className={"sm:mx-20 mx-5 flex flex-col justify-center items-center"}>
        <section className={"flex flex-col gap-y-3"}>
            <Typography
                variant="h1"
                className={"font-bold text-center"}
            >
                Se connecter
            </Typography>

                <FormLogin />

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


        </section>
    </main>
  );
}
