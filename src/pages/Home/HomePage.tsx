import {NavLink} from "react-router-dom";
import {Button} from "@material-tailwind/react";

export default function HomePage() {
  return (

          <main>
              <section>
                  <h1>Bienvenue sur Chappy</h1>
                  <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem commodi facilis magni non possimus, quibusdam repellat velit? </p>

                  <article className={"flex gap-5"}>
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
              <section>

              </section>
          </main>

  )
}
