import robot from "../../assets/img/404.png";
import {
    Button,
    Typography
} from "@material-tailwind/react";
import {NavLink} from "react-router-dom";
export default function NotFoundPage() {
  return (
    <main className={"flex gap-5 justify-center items-center"}>

        <div className={"flex flex-col items-center justify-center"}>
            <Typography variant="h1" className={"font-extrabold text-xxl"}>Oups..</Typography>
            <Typography variant="h1" className={"font-extrabold text-xl"}>Cette page n'existe pas !</Typography>

            <NavLink to={"/"}>
                <Button className={"mt-8 bg-brick-400"} size={"sm"}>Retourner à l'accueil</Button>
            </NavLink>
        </div>

        <img
            className="h-96"
            src={robot}
            alt="message d'erreur"
        />

    </main>
  )
}
