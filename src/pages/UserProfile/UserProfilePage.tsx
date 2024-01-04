/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import avatar from "../../assets/img/icon_user.png";
import "./userProfile.css";
import {
  intProfileUser,
  InputEvent,
  FormEvent,
} from "../../services/interfaces/intProject";
import { getUserInfo, modifyUserToBDD } from "../../services/api/users";

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
    phone: "",
    projects: [],
    projects_collab: [],
    companies: [],
  });
  const idUser = localStorage.getItem("id");
  const [displayPwd, setDisplayPwd] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserInfo(idUser);
      setUser(result);
    };
    fetchData();
  }, [idUser]);

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await modifyUserToBDD(idUser, user);
    console.log(user);
    alert("Les modifications ont été enregistré");
  };

  const handlePassword = () => setDisplayPwd(!displayPwd);

  const sendPwd = async (e: any) => {
    const data = { ...user, password: e.target.form.newPassword.value };
    await modifyUserToBDD(idUser, data);
    alert("Votre mot de passe a bien été mis à jour");
    setDisplayPwd(false);
  };

  const renderInput = (label: string, name: keyof intProfileUser, type = "text") => (
    <Input
      label={label}
      className={"bg-light-100"}
      crossOrigin={undefined}
      name={name}
      id={name}
      type={type}
      value={user[name] as string}
      onChange={(e: InputEvent) => handleChange(e)}
    />
  );

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
        <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>
              Informations de connexion
            </Typography>
            <div className="sm:flex sm:gap-x-5">
              <div className={"mb-5 w-full"}>{renderInput("Nom", "lastName")} </div>
              <div className={"mb-5 w-full"}>{renderInput("Prénom", "firstName")}</div>
            </div>
            <div>{renderInput("Email", "email")}</div>
            <div className="flex gap-5 my-5">
              <Input
                label={
                  displayPwd
                    ? "Entrer le nouveau mot de passe"
                    : "*************"
                }
                disabled={!displayPwd}
                className={"!border !border-gray-500-300 !bg-light-100"}
                crossOrigin={undefined}
                name="password"
                type="password"
              />
              <IconButton
                className={"bg-marine-300 text-light-200"}
                onClick={handlePassword}
              >
                <FontAwesomeIcon icon={faRotateRight} />
              </IconButton>
            </div>
            {displayPwd && (
              <div>
                <Input
                  label="Vérifier le nouveau mot de passe"
                  className={"!border !border-gray-500-300 !bg-light-100"}
                  crossOrigin={undefined}
                  name="newPassword"
                  id="newPassword"
                  type="password"
                />
                <Button className="mt-5" onClick={(e: any) => sendPwd(e)}>
                  Envoyer le nouveau pwd
                </Button>
              </div>
            )}
          </article>

          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>
              Informations Personnelles
            </Typography>

            {renderInput("Adresse", "address")}

            <div className="sm:flex sm:gap-x-5 mt-5">
              <div className={"mb-5 w-full"}>{renderInput("Ville", "city")}</div>
              <div className={"mb-5 w-full"}>{renderInput("Code Postal", "zip")} </div>
            </div>
            <div>{renderInput("Téléphone", "phone")}</div>
          </article>

          <article>
            <div className="flex items-center justify-between">
              <Typography
                variant="h2"
                className={"text-xl font-extrabold my-10"}
              >
                Accès professionnel
              </Typography>
              <div className="md:flex gap-3">
                <Button>Rejoindre une entreprise</Button>
                <Button>
                  {user.company ? "Modifier" : "Ajouter"} mon entreprise
                </Button>
              </div>
            </div>

            <div className="mb-5">
              {/* Besoin d'ajouter des modals pour ajouter et rejoindre */}

              {user.company && (
          
                <Input
                  label="Mon entreprise"
                  className={"bg-light-100"}
                  crossOrigin={undefined}
                  name="owner"
                  id="owner"
                  defaultValue={user.company.name}
                />
              )}

              {user.companies.length != 0 && (
                <ul className="flex">
                  {user.companies.map((_company, index) => (
                    <li key={index} className="mt-5">
                      <Input
                        label="Salarié de l'entreprise"
                        className={"bg-light-100"}
                        crossOrigin={undefined}
                        name="member"
                        id={`member ${index}`}
                        defaultValue={user.companies[index].name}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {!user.company && user.companies.length == 0 && (
                <div>
                  <p>Vous n'avez pas d'entreprise</p>
                </div>
              )}
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
              <Button className={"bg-brick-400"} type="submit">
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
