/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import avatar from "../../assets/img/icon_user.png";
import "./userProfile.css";
import { getUserInfo, modifyUserToBDD, resetPwd } from "../../services/api/users";
import NotFoundPage from "../../services/utils/NotFoundPage";
import AddCompanyModal from "../../components/Project/Modals/AddCompanyModal";
import RejoinCompanyModal from "../../components/Project/Modals/RejoinCompanyModal";
import ModifyCompanyModal from "../../components/Project/Modals/ModifyCompanyModal";
import QuitCompanyModal from "../../components/Project/Modals/QuitCompanyModal";
import { intProfileUser } from "../../services/interfaces/intUser";
import { FormEvent, InputEvent } from "../../services/interfaces/generique.interface";

export default function UserProfilePage() {
  const [user, setUser] = useState<intProfileUser>({
    firstname: "",
    lastname: "",
    email: "",
    id: 0,
    city: "",
    address: "",
    zip: "",
    status: 0,
    phone: "",
    projects: [],
    participations: [],
    company: {name:'', siret: "", description:'', id:0},
    myCompany: {name:'', siret:'', description:'', id:0},
    myOwnTasks: []
  });
  const idUser = localStorage.getItem("id");
  const [displayPwd, setDisplayPwd] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const [passwords, setPasswords] = useState<{oldPwd:string, newPwd:string}>({
    oldPwd: "", newPwd:""
  })

  const handleReload = () => setReload((bool) => !bool);
  const [openRejoin, setOpenRejoin] = useState(false);
  const handleOpenRejoin = () => setOpenRejoin((bool) => !bool);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd((bool) => !bool);
  const [openModify, setOpenModify] = useState(false);
  const handleOpenModify = () => setOpenModify((bool) => !bool);
  const [openQuit, setOpenQuit] = useState(false);
  const handleOpenQuit = () => setOpenQuit((bool) => !bool);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserInfo();
        setUser(result);
      } catch (error) {
        setError(true)
      } finally {
        setBusy(false)
      }  
    };
    fetchData();
  }, [idUser, reload]);

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswords = (e: InputEvent) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await modifyUserToBDD(user);
      alert("Les modifications ont été enregistré");
    } catch (error) {
      alert(error);
    } 
  };

  const handlePassword = () => setDisplayPwd(!displayPwd);

  const sendPwd = async (e: any) => {
    e.preventDefault();
    try {
      await resetPwd(passwords);
      alert("Votre mot de passe a bien été mis à jour");
      setDisplayPwd(false);
    } catch (error) {
      alert("Erreur lors de la réinitialisation du mot de passe");
    }
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
  if (error) return (<NotFoundPage />)
  return (
    <main className={"sm:mx-20 mx-5"}>
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300" />
        </div>
      ) : (
        <>
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
            {user.participations.length} collaborations
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
              <div className={"mb-5 w-full !bg-light-100"}>{renderInput("Nom", "lastname")} </div>
              <div className={"mb-5 w-full !bg-light-100"}>{renderInput("Prénom", "firstname")}</div>
            </div>
            <div className={"!bg-light-100"}>{renderInput("Email", "email")}</div>
            <div className="flex gap-5 my-5">
              <Input
                label="*************"
                disabled
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
              <div className='gap-5'>
                <div className='mb-5'>
                <Input
                  label="Ancien mot de passe"
                  className={"!border !border-gray-500-300 !bg-light-100"}
                  crossOrigin={undefined}
                  name="oldPassword"
                  id="oldPassword"
                  type="password"
                  onChange={(e: InputEvent) => handlePasswords(e)}
                />
                </div>
                <div className='mb-5'>
                <Input
                label="Entrer le nouveau mot de passe"
                className={"!border !border-gray-500-300 !bg-light-100"}
                crossOrigin={undefined}
                name="password"
                type="password"
              />
              </div>
              <div>
                <Input
                  label="Vérifier le nouveau mot de passe"
                  className={"!border !border-gray-500-300 !bg-light-100"}
                  crossOrigin={undefined}
                  name="newPassword"
                  id="newPassword"
                  type="password"
                  onChange={(e: InputEvent) => handlePasswords(e)}
                />
                </div>

                
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

            <div className={"!bg-light-100"}>{renderInput("Adresse", "address")}</div>

            <div className="sm:flex sm:gap-x-5 mt-5">
              <div className={"mb-5 w-full !bg-light-100"}>{renderInput("Ville", "city")}</div>
              <div className={"mb-5 w-full !bg-light-100"}>{renderInput("Code Postal", "zip")} </div>
            </div>
            <div className={"!bg-light-100"}>{renderInput("Téléphone", "phone")}</div>
          </article>
          </form>
          </section>
          <section className={"mt-5 lg:w-[55lvw] m-auto"}>
          <article>
            <div className="flex items-center justify-between">
              <Typography
                variant="h2"
                className={"text-xl font-extrabold my-10"}
              >
                Accès professionnel
              </Typography>
              <div className="md:flex gap-3">
              {user.myCompany && <Button size={"sm"} onClick={handleOpenModify}>Modifier mon entreprise</Button>}
                {!user.myCompany && <Button size={"sm"} onClick={handleOpenAdd}>Ajouter une entreprise</Button>}
                {user.company && <Button size={"sm"} onClick={handleOpenQuit}>Quitter mon entreprise</Button>}
                {!user.company && <Button size={"sm"} onClick={handleOpenRejoin}>Rejoindre une entreprise</Button>}
                {openRejoin && <RejoinCompanyModal open={openRejoin} handleOpen={handleOpenRejoin} handleReload={handleReload}/> }
                {openAdd && <AddCompanyModal open={openAdd} handleOpen={handleOpenAdd} handleReload={handleReload}/> }
                {openModify && <ModifyCompanyModal user={user} open={openModify} handleOpen={handleOpenModify} handleReload={handleReload} /> }
                {openQuit && <QuitCompanyModal open={openQuit} handleOpen={handleOpenQuit} handleReload={handleReload}/> }
              </div>
            </div>

            <div className="mb-5">
              {/* Besoin d'ajouter des modals pour ajouter et rejoindre */}

              {user.myCompany && (
          <div className={"mb-5 w-full !bg-light-100"}>
                <Input
                  label="Mon entreprise"
                  className={"bg-light-100"}
                  crossOrigin={undefined}
                  name="owner"
                  id="owner"
                  value={user.myCompany.name}
                />
                </div>
              )}

              {/* {user.companies.length != 0 && (
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
              )} */}
              {!user.myCompany && 
                <div>
                  <p>Vous ne gérez pas d'entreprise</p>
                </div>
              }
            </div>
            <div className="mb-5">
              {/* Besoin d'ajouter des modals pour ajouter et rejoindre */}

              {user.company && (
              <div className={"mb-5 w-full !bg-light-100"}>
                <Input
                  label="Entreprise dont je suis salarié"
                  className={"!bg-light-100"}
                  crossOrigin={undefined}
                  name="company"
                  id="company"
                  value={user.company.name}
                />
                </div>
              )}

              {/* {user.companies.length != 0 && (
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
              )} */}
              {!user.company && 
                <div>
                  <p>Vous n'êtes dans aucune entreprise</p>
                </div>
              }
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
          </section>
          <div className={"flex justify-center my-10"}>
            <a href="#buttons-with-link">
              <Button className={"bg-brick-400"}
                      size={"sm"}
                      type="submit">
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  className={"text-sm mr-3"}
                />{" "}
                Enregistrer
              </Button>
            </a>
          </div>
       
      
      </>
      )}
    </main>
  );
}
