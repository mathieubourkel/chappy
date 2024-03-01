import { Link } from "react-router-dom";
import "../../css/home.css";
import { Typography } from "@material-tailwind/react";
import planning from "../../assets/img/planning.png";
import blop from "../../assets/img/Blop.svg";
import MagicButton from "../../components/elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";

export default function HomePage() {
  return (
    <main className={"flex justify-center gap-11 items-center"}>
      <section className={"lg:w-1/4 flex flex-col gap-10 mx-5"}>
        <article className={"flex flex-col gap-5"}>
          <Typography variant="h1" className={"font-extrabold text-center"}>
            Bienvenue sur Chappy
          </Typography>
          <Typography variant="h3">
            Une application de suivi de chantier pour particulier.
          </Typography>
          <Typography variant="paragraph" className={""}>
            Vous pouvez créer un compte sur l'application et/ou ajouter une entreprise
            si vous en avez une.
            Vous aurez ensuite accès à un tableau de bord ou vous pourrez créer vos 
            projets de rénovation ou de construction.
          </Typography>
        </article>
        <article className={"flex flex-wrap gap-5 justify-center"}>
          <Link to={"/signup#0"} className="flex">
            <MagicButton type={ButtonTypeEnum.BRICK_300} value='Je suis un particulier'/>
          </Link>
          <Link to={"/signup#1"}>
            <MagicButton type={ButtonTypeEnum.BRICK_300} value='Je suis un professionnel'/>
          </Link>
        </article>
      </section>
      <section className={"hidden lg:flex lg:w-1/4 lg:animation-section"}>
        <img src={blop} alt={"fond animé"} className={"scale-in-right"} />
        <img
          src={planning}
          alt={"logo de planning"}
          className={"planning slide-in-right"}
        />
      </section>
    </main>
  );
}
