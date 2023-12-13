/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  IconButton,
  Input,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { getUserInfo } from "../../services/api/users";
import { useEffect, useState } from "react";
import avatar from "../../assets/img/icon user.png";
import "./userProfile.css";
import {
  intProfileUser,
  InputEvent,
} from "../../services/interfaces/intProject";

export default function UserProfilePage() {
  const [user, setUser] = useState<intProfileUser>({
    firstName: "",
    lastName: "",
    email: "",
    id: 0,
    city: "",
    address: "",
    zip: 0,
    status: 0,
    projects: [],
    projects_collab: [],
  });
  const idUser = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserInfo(idUser);
      setUser(result);
      console.log(result);
      console.log(idUser);
    };
    fetchData();
  }, [idUser]);

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  console.log(user);
  return (
    <main className={"sm:mx-20 mx-5"}>
      <section
        className={"flex flex-col justify-center items-center gap-5 mt-10"}
      >
        <Typography variant="h1" className={"font-bold"}>
          Profil
        </Typography>
        <Avatar src={avatar} alt="avatar" size="xxl" className={"avatar"} />
        <div className={"flex gap-5 justify-center"}>
          <div className={"chip"}>{user.projects.length} projets</div>
          <div className={"chip"}>
            {user.projects_collab.length} collaborations
          </div>
        </div>
      </section>
      <section className={"mt-5 lg:w-[55lvw] m-auto"}>
        <form>
          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>
              Informations de connexion
            </Typography>
            <div className="sm:flex sm:gap-x-5">
              <div className={"mb-5 w-full"}>
                <Input
                  label="Nom"
                  className={"bg-light-100"}
                  crossOrigin={undefined}
                  name="lastName"
                  id="lastName"
                  value={user.lastName}
                  onChange={(e: InputEvent) => handleChange(e)}
                />
              </div>

              <div className={"mb-5 w-full"}>
                <Input
                  label="Prénom"
                  className={"bg-light-100"}
                  crossOrigin={undefined}
                  name="firstName"
                  id="firstName"
                  value={user.firstName}
                  onChange={(e: InputEvent) => handleChange(e)}
                />
              </div>
            </div>

            <Input
              label="E-mail"
              className={"bg-light-100"}
              crossOrigin={undefined}
              name="email"
              id="email"
              value={user.email}
              onChange={(e: InputEvent) => handleChange(e)}
            />

            <div className="flex gap-5 my-5">
              <Input
                label="Mot de passe"
                disabled
                className={"!border !border-gray-500-300 !bg-light-100"}
                crossOrigin={undefined}
                name="password"
              />
              <IconButton className={"bg-marine-300 text-light-200"}>
                <FontAwesomeIcon icon={faRotateRight} />
              </IconButton>
            </div>
          </article>

          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>
              Informations Personnelles
            </Typography>

            <Input
                  label="Adresse"
                  className={"bg-light-100"}
                  crossOrigin={undefined}
                  name="address"
                  id="address"
                  value={user.address}
                  onChange={(e: InputEvent) => handleChange(e)}
                />

            <div className="sm:flex sm:gap-x-5 mt-5">
              <div className={"mb-5 w-full"}>
              <Input
                  label="Ville"
                  className={"bg-light-100"}
                  crossOrigin={undefined}
                  name="city"
                  id="city"
                  value={user.city}
                  onChange={(e: InputEvent) => handleChange(e)}
                />
              </div>

              <div className={"mb-5 w-full"}>
              <Input
                  label="Code Postal"
                  className={"bg-light-100"}
                  crossOrigin={undefined}
                  name="zip"
                  id="zip"
                  value={user.zip}
                  onChange={(e: InputEvent) => handleChange(e)}
                />
              </div>
            </div>
            <Input
                  label="Téléphone"
                  className={"bg-light-100"}
                  crossOrigin={undefined}
                  name="phone"
                  id="phone"
                  value={user.phone}
                  onChange={(e: InputEvent) => handleChange(e)}
                />
          </article>

          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>
              Accès professionnel
            </Typography>

            <div className="flex justify-center my-5">
              <div className={"flex flex-col"}>
                <Radio
                  name="company"
                  label={
                    <Typography className="flex font-medium text-text-100">
                      Je n'ai pas d'entreprise
                    </Typography>
                  }
                  crossOrigin={undefined}
                />
                <Radio
                  name="company"
                  label={
                    <Typography className="flex font-medium text-text-100">
                      Je possède mon entreprise
                    </Typography>
                  }
                  crossOrigin={undefined}
                />
                <Radio
                  name="company"
                  label={
                    <Typography className="flex font-medium text-text-100">
                      Je suis salarié d'une entreprise enregistrée
                    </Typography>
                  }
                  crossOrigin={undefined}
                />
              </div>
            </div>
          </article>

          <article>
            <Typography variant="h2" className={"text-xl font-extrabold"}>
              Supprimer son compte
            </Typography>
            <div className={"flex justify-center mt-10"}>
              <a href="#buttons-with-link">
                <Button
                  variant="outlined"
                  size={"sm"}
                  className={"!border !border-marine-300 !text-marine-300"}
                >
                  Supprimer mon compte
                </Button>
              </a>
            </div>
          </article>

          <div className={"flex justify-center my-10"}>
            <a href="#buttons-with-link">
              <Button className={"bg-brick-400"}>
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  className={"text-sm mr-3"}
                />{" "}
                Enregistrer
              </Button>
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
