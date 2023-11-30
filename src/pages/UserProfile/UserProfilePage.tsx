import { Avatar, Button, IconButton, Input, Radio, Typography } from "@material-tailwind/react";
import avatar from "../../assets/img/icon user.png";
import './userProfile.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faRotateRight } from "@fortawesome/free-solid-svg-icons";

export default function UserProfilePage() {

  return (
    <main className={"sm:mx-20 mx-5"}>
      <section className={"flex flex-col justify-center items-center gap-5 mt-10"}>
        <Typography variant="h1" className={"font-bold"}>Profil</Typography>
        <Avatar src={avatar} alt="avatar" size="xxl" className={"avatar"} />
        <div className={"flex gap-5 justify-center"}>
          <div className={"chip"}>x projets</div>
          <div className={"chip"}>x collaborations</div>
        </div>
      </section>
      <section className={"mt-5 lg:w-[55lvw] m-auto"}>
        <form>
          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>Informations de connexion</Typography>
            <div className="sm:flex sm:gap-x-5">
              <div className={"mb-5 w-full"}>
                <Input label="Nom"
                       color={"gray"}
                       className={""}
                       crossOrigin={undefined}/>
              </div>

              <div className={"mb-5 w-full"}>
                <Input
                  label="Prénom"
                  color={"gray"}
                  crossOrigin={undefined} />
              </div>
            </div>

              <Input label="E-mail"
                     color={"gray"}
                     crossOrigin={undefined}/>

            <div className="flex gap-5 my-5">
              <Input label="Mot de passe"
                     color={"gray"}
                     disabled
                     className={"!border !border-gray-500-300"}
                     crossOrigin={undefined}/>
              <IconButton className={"bg-marine-300 text-light-200"}>
                <FontAwesomeIcon icon={faRotateRight} />
              </IconButton>
            </div>
          </article>

          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>Informations Personnelles</Typography>

              <Input label="Adresse"
                     color={"gray"}
                     crossOrigin={undefined}/>

            <div className="sm:flex sm:gap-x-5 mt-5">
              <div className={"mb-5 w-full"}>
                <Input label="Ville"
                       color={"gray"}
                       crossOrigin={undefined}/>
              </div>

              <div className={"mb-5 w-full"}>
                <Input
                    label="Code postal"
                    color={"gray"}
                    crossOrigin={undefined} />
              </div>
            </div>
              <Input label="Téléphone"
                     color={"gray"}
                     crossOrigin={undefined}/>
          </article>

          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>Accès professionnel</Typography>

            <div className="flex justify-center my-5">
              <div className={"flex flex-col"}>
                <Radio
                    name="company"
                    label={<Typography
                        className="flex font-medium text-text-100"
                    >
                      Je n'ai pas d'entreprise
                    </Typography>}
                    crossOrigin={undefined}              />
                <Radio
                    name="company"
                    label={<Typography
                        className="flex font-medium text-text-100"
                    >
                      Je possède mon entreprise
                    </Typography>}
                    crossOrigin={undefined}              />
                <Radio
                    name="company"
                    label={<Typography
                        className="flex font-medium text-text-100"
                    >
                      Je suis salarié d'une entreprise enregistrée
                    </Typography>}
                    crossOrigin={undefined}              />
              </div>

            </div>
          </article>

          <article>
            <Typography variant="h2" className={"text-xl font-extrabold"}>Supprimer son compte</Typography>
            <div className={"flex justify-center mt-10"}>
              <a href="#buttons-with-link">
                <Button variant="outlined" size={"sm"} className={"!border !border-marine-300 !text-marine-300"}>Supprimer mon compte</Button>
              </a>
            </div>
          </article>

          <div className={"flex justify-center my-10"}>
            <a href="#buttons-with-link">
              <Button className={"bg-brick-400"}><FontAwesomeIcon icon={faFloppyDisk} className={"text-sm mr-3"} /> Enregistrer</Button>
            </a>
          </div>
        </form>
      </section>


    </main>
  )
}
