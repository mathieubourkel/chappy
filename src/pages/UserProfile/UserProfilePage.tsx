/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Alert,
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
import { getUserInfo, modifyUserToBDD, quitCompany, resetPwd } from "../../services/api/users";
import NotFoundPage from "../../services/utils/NotFoundPage";
import AddCompanyModal from "../../components/Project/Modals/AddCompanyModal";
import RejoinCompanyModal from "../../components/Project/Modals/RejoinCompanyModal";
import ModifyCompanyModal from "../../components/Project/Modals/ModifyCompanyModal";
import QuitCompanyModal from "../../components/Project/Modals/QuitCompanyModal";
import { intProfileUser } from "../../services/interfaces/intUser";
import { FormEvent, InputEvent, intAlert } from "../../services/interfaces/generique.interface";
import DeleteUser from "../../components/Project/Modals/DeleteUser";

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
    myOwnGroups: [{name:'', additionalInfos:'', description:'', id:0, demands:[]}],
    myOwnTasks: [],
    demands: []
  });
  const idUser:string = localStorage.getItem("id") ||'';
  const [displayPwd, setDisplayPwd] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [alert, setAlert] = useState<intAlert>({open: false, message:'', color:'green'})
  const [passwords, setPasswords] = useState<{oldPwd:string, newPwd:string}>({
    oldPwd: "", newPwd:""
  })
  const [openRejoin, setOpenRejoin] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openQuit, setOpenQuit] = useState<boolean>(false);
  const handleOpenQuit = () => setOpenQuit((bool) => !bool);
  const handleReload = () => setReload((bool) => !bool);
  const handleOpenRejoin = () => setOpenRejoin((bool) => !bool);
  const handleOpenAdd = () => setOpenAdd((bool) => !bool);
  const handleOpenDelete = () => setOpenDelete((bool) => !bool);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await getUserInfo();
        setUser(data);
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

  const handleCancelDemand = async (demandId:number) => {
    await quitCompany(demandId);
    handleReload()
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await modifyUserToBDD(user);
      setAlert({open: true, message:"Les modifications ont bien été enregistrés.", color: 'green'})
    } catch (error) {
      setAlert({open: true, message:"Erreur lors de l'envoie des modifications", color: 'red'})
    } 
  };

  const handlePassword = () => setDisplayPwd(!displayPwd);

  const sendPwd = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await resetPwd(passwords);
      setAlert({open: true, message:'Le mot de passe a été mise à jour', color: 'green'})
      setDisplayPwd(false);
    } catch (error) {
      setAlert({open: true, message:'Erreur lors de la réinitialisation du mot de passe', color: 'red'})
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
      <Alert color={alert.color} className='m-1 sticky top-0 my-10' open={alert.open} onClose={() => setAlert({...alert, open:false})}>
            {alert.message}
          </Alert>
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
          </form>
          </section>
          <section className={"mt-5 lg:w-[55lvw] m-auto"}>
          <article>
            <div className="flex items-center justify-between">
              <Typography
                variant="h2"
                className={"text-xl font-extrabold my-10"}
              >
                Mes entreprises
              </Typography>
              <div className="md:flex gap-3">
                <Button size={"sm"} onClick={handleOpenAdd}>Ajouter une entreprise</Button>
                {openAdd && <AddCompanyModal setAlert={setAlert} open={openAdd} handleOpen={handleOpenAdd} handleReload={handleReload}/> }

              </div>
            </div>

            <div className="mb-5">
              {user.myOwnGroups.length > 0 && user.myOwnGroups.map((group) => (
                <div key={group.id} className={"mb-5 w-full flex gap-5 items-center"}>
                <Input
                  label="Mon entreprise"
                  className={"!bg-light-100"}
                  crossOrigin={undefined}
                  name="owner"
                  id={`owner${group.id?.toString()}`}
                  readOnly
                  value={group.name}
                />
               <ModifyCompanyModal setAlert={setAlert} group={group} handleReload={handleReload} /> 
                </div>
                ))
              }
              {user.myOwnGroups.length == 0  && 
                <div>
                  <p>Vous ne gérez pas d'entreprise</p>
                </div>
              }
            </div>
            
          </article>
          <article>
          <div className="flex items-center justify-between">
              <Typography
                variant="h2"
                className={"text-xl font-extrabold my-10"}
              >
                Salarié
              </Typography>
              <div className="md:flex gap-3">
              
                <Button size={"sm"} onClick={handleOpenRejoin}>Rejoindre une entreprise</Button>
                {openRejoin && <RejoinCompanyModal setAlert={setAlert} open={openRejoin} handleOpen={handleOpenRejoin} handleReload={handleReload}/> }
                </div>
                </div>
                <div className="mb-5">
              {user.demands && user.demands.map((demand) => (
                <div key={demand.id}>
                  {demand.status == 1 ? 
                    <div className={"mb-5 w-full flex gap-5 items-center"}>
                      <Input
                        label="Entreprise dont je suis salarié"
                        className={"!bg-light-100"}
                        crossOrigin={undefined}
                        name="company"
                        id={`companyto${demand.id?.toString()}`}
                        readOnly
                        value={demand.group.name}
                      />
                    <Button size={"sm"} onClick={handleOpenQuit}>Quitter mon entreprise</Button>
                    <QuitCompanyModal idDemand={demand.id || 0} setAlert={setAlert} open={openQuit} handleOpen={handleOpenQuit} handleReload={handleReload}/>
                      </div> : 
                      <div className={"mb-5 w-full flex gap-5 items-center"}>
                       <Input
                        label="Demande en attente"
                        crossOrigin={undefined}
                        name="company"
                        id={`company${demand.id?.toString()}`}
                        readOnly
                        value={demand.group.name}
                      />
                    <Button size={"sm"} onClick={() => handleCancelDemand(demand.id ||0)}>Annuler la demande</Button>
                        </div>}
                      </div>
                      )) }
              {user.demands.length == 0 && 
                <div>
                  <p>Vous n'êtes dans aucune entreprise</p>
                </div>
              }
            </div>
          </article>

          <article className='mt-10'>
            <div className={"flex justify-center my-10"}>
              <a href="#buttons-with-link">
                <Button
                onClick={() => handleOpenDelete()}
                  variant="outlined"
                  size={"sm"}
                  className={"!border !border-marine-300 !text-marine-300"}
                >
                  Supprimer mon compte
                </Button>
                <DeleteUser open={openDelete} handleOpen={handleOpenDelete}/>
              </a>
            </div>
          </article>
          </section>
      </>
      )}
    </main>
  );
}
