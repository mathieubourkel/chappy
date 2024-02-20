import { Link } from "react-router-dom";
import "./home.css";
import { Button, Typography } from "@material-tailwind/react";
import planning from "../../assets/img/planning.png";
import blop from "../../assets/img/Blop.svg";

export default function HomePage() {
  return (
    <main className={"flex justify-center gap-11 items-center"}>
      <section className={"lg:w-1/4 flex flex-col gap-10 mx-5"}>
        <article className={"flex flex-col gap-5"}>
          <Typography variant="h1" className={"font-extrabold text-center"}>
            Bienvenue sur Chappy
          </Typography>
          <Typography variant="h3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
          <Typography variant="paragraph" className={""}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem
            commodi facilis magni non possimus, quibusdam repellat velit?{" "}
          </Typography>
        </article>
        <article className={"flex flex-wrap gap-5 justify-center"}>
          <Link to={"/signup#0"} className="flex">
            <Button size="sm" className="bg-brick-400">
              Je suis un particulier
            </Button>
          </Link>

          <Link to={"/signup#1"}>
            <Button size="sm" className="bg-brick-400">
              Je suis un professionnel
            </Button>
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
