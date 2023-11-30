import {
    Button,
    Input,Textarea,
    Typography
} from "@material-tailwind/react";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
    faEnvelopesBulk,
} from "@fortawesome/free-solid-svg-icons";


export default function ContactUsPage() {
  return (
      <main className={"flex justify-center"}>
          <article className={"w-2/3 mt-10"}>
              <h1 className={"text-center"}>Contactez-nous</h1>

              <form>
                  <article>
                      <Typography variant="h2" className={"text-xl font-extrabold my-10"}>Le formulaire de contact</Typography>
                      <div className="sm:flex sm:gap-x-5">
                          <div className={"mb-5 w-full"}>
                              <Input label="Nom"
                                     className={"!bg-light-100"}
                                     crossOrigin={undefined}/>
                          </div>

                          <div className={"mb-5 w-full"}>
                              <Input
                                  label="Prénom"
                                  className={"!bg-light-100"}
                                  crossOrigin={undefined} />
                          </div>
                      </div>

                      <Input label="E-mail"
                             className={"!bg-light-100"}
                             crossOrigin={undefined}/>

                      <div className="flex gap-5 my-5">
                          <Textarea label="Votre message.."
                                    className={"!bg-light-100"}/>
                      </div>
                  </article>

                  <div className={"flex justify-center my-10"}>
                      <a href="#buttons-with-link">
                          <Button className={"bg-brick-400"}><FontAwesomeIcon icon={faEnvelopesBulk} className={"text-sm mr-3"} /> Envoyer</Button>
                      </a>
                  </div>
              </form>

          </article>
      </main>
  )
}
