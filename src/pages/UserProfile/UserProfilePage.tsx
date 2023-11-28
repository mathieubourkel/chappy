import {
  Avatar, Button, IconButton, Input, Radio,
  Typography
} from "@material-tailwind/react";
import avatar from "../../assets/img/icon user.png";
import './userProfile.css';
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faRotateRight
} from "@fortawesome/free-solid-svg-icons";

export default function UserProfilePage() {
  return (
    <main className={"flex flex-col gap-5 items-center"}>
      <section className={"flex flex-col justify-center items-center gap-5 mt-10"}>
        <Typography variant="h1" className={"font-bold"}>Profil</Typography>
        <Avatar src={avatar} alt="avatar" size="xxl" className={"avatar"} />
        <div className={"flex gap-5 justify-center"}>
          <div className={"chip"}>x projets</div>
          <div className={"chip"}>x collaborations</div>
        </div>
      </section>
      <section className={"w-2/4 mt-5"}>
        <form>
          <article>
            <Typography variant="h2" className={"font-bold text-xl font-extrabold"}>Informations de connexion</Typography>
            <div className="flex gap-5 mt-10 mx-14">
              <Input label="Nom"
                     crossOrigin={undefined}/>
              <Input
                label="Prénom"
                crossOrigin={undefined} />
            </div>
            <div className="mt-5 mx-14">
              <Input label="E-mail"
                     crossOrigin={undefined}/>
            </div>
            <div className="flex gap-5 my-5 mx-14">
              <Input label="Mot de passe"
                     crossOrigin={undefined}/>
              <IconButton className={"bg-marine-300 text-light-200"}>
                <FontAwesomeIcon icon={faRotateRight} />
              </IconButton>
            </div>
          </article>

          <article>
            <Typography variant="h2" className={"font-bold text-xl font-extrabold"}>Informations Personnelles</Typography>

            <div className="mt-10 mx-14">
              <Input label="Adresse"
                     crossOrigin={undefined}/>
            </div>
            <div className="flex gap-5 mt-5 mx-14">
              <Input label="Ville"
                     crossOrigin={undefined}/>
              <Input
                  label="Code postal"
                  crossOrigin={undefined} />
            </div>

            <div className="my-5 mx-14">
              <Input label="Téléphone"
                     crossOrigin={undefined}/>
            </div>
          </article>

          <article>
            <Typography variant="h2" className={"font-bold text-xl font-extrabold"}>Accès professionnel</Typography>

            <div className="flex justify-center my-5">
              <div className={"flex flex-col"}>
                <Radio
                    name="terms"
                    label={<Typography
                        className="flex font-medium text-text-100"
                    >
                      Je n'ai pas d'entreprise
                    </Typography>}
                    crossOrigin={undefined}              />
                <Radio
                    name="terms"
                    label={<Typography
                        className="flex font-medium text-text-100"
                    >
                      Je possède mon entreprise
                    </Typography>}
                    crossOrigin={undefined}              />
                <Radio
                    name="terms"
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
            <Typography variant="h2" className={"font-bold text-xl font-extrabold"}>Supprimer son compte</Typography>
            <div className={"flex justify-center"}>
              <a href="#buttons-with-link">
                <Button variant="outlined">Supprimer mon compte</Button>
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
