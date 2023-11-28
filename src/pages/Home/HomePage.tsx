import {NavLink} from "react-router-dom";
import './home.css';
import {
    Button,
    Typography
} from "@material-tailwind/react";
import planning from "../../assets/img/planning.png";
import blop from "../../assets/img/Blop.svg";

export default function HomePage() {
  return (

          <main className={"flex justify-center gap-11 items-center"}>
              <section className={"w-1/4 flex flex-col gap-10"}>
                  <article className={"flex flex-col gap-5"}>
                      <Typography variant="h1" className={"font-extrabold text-center"}>Bienvenue sur Chappy</Typography>
                      <Typography variant="h3">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
                      <Typography variant="paragraph" className={""}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem commodi facilis magni non possimus, quibusdam repellat velit? </Typography>
                  </article>
                  <article className={"flex gap-5 justify-center"}>
                      <Button
                          size="sm"
                          className="hidden lg:inline-block bg-brick-400"
                      >
                          <NavLink to={"/signup"}>Je suis un particulier</NavLink>
                      </Button>
                      <Button
                          size="sm"
                          className="hidden lg:inline-block bg-brick-400"
                      >
                          <NavLink to={"/signup"}>Je suis un professionnel</NavLink>
                      </Button>
                  </article>

              </section>
              <section className={"w-1/4 animation-section"}>
                  <img src={blop} alt={"fond animé"} className={"scale-in-right"} />
                  <img src={planning} alt={"logo de planning"} className={"planning slide-in-right"}/>

              </section>
          </main>

  )
}
