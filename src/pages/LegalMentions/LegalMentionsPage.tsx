import {
    Typography
} from "@material-tailwind/react";

export default function LegalMentionsPage() {
  return (
      <main className={"flex justify-center"}>
        <article className={"w-2/3 mt-10"}>
            <Typography
                variant="h1"
                className={"font-bold text-center"}
            >
                Mentions légales
            </Typography>

            <section className={"my-5 border"}>
                <h2>Titre de la partie</h2>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci animi, at commodi eos fugit laborum nobis officia possimus quas, quibusdam reiciendis rerum sint ullam voluptatibus. Ad harum libero tempore.</p>
            </section>

            <section className={"my-5"}>
                <h2>Titre de la partie</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci animi, at commodi eos fugit laborum nobis officia possimus quas, quibusdam reiciendis rerum sint ullam voluptatibus. Ad harum libero tempore.</p>
            </section>

        </article>
      </main>
  )
}


