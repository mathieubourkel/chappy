/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { modifyUserToBDD, quitCompany, resetPwd } from "../../services/api/users";
import AddCompanyModal from "../../components/Project/Modals/AddCompanyModal";
import RejoinCompanyModal from "../../components/Project/Modals/RejoinCompanyModal";
import ModifyCompanyModal from "../../components/Project/Modals/ModifyCompanyModal";
import QuitCompanyModal from "../../components/Project/Modals/QuitCompanyModal";
import { intDemand, intProfileUser } from "../../services/interfaces/intUser";
import { FormEvent, InputEvent } from "../../services/interfaces/generique.interface";
import DeleteUser from "../../components/Project/Modals/DeleteMyAccount";
import { ApiPathEnum } from "../../services/enums/api.path.enum";
import { useFetch } from "../../hooks/useFetch";
import { intCompany } from "../../services/interfaces/intCompany";
import { useAlert } from "../../hooks/useAlert";

export default function UserProfilePage() {

  const [displayPwd, setDisplayPwd] = useState<boolean>(false);
  const {data, updateData, handleErrorAndLoading, handleReload} = useFetch(`${ApiPathEnum.USER}`)
  const [renderAlert, newAlert] = useAlert()
  const [passwords, setPasswords] = useState<{oldPwd:string, newPwd:string}>({
    oldPwd: "", newPwd:""
  })
  const [openRejoin, setOpenRejoin] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openQuit, setOpenQuit] = useState<boolean>(false);
  const handleOpenQuit = () => setOpenQuit((bool) => !bool);
  const handleOpenRejoin = () => setOpenRejoin((bool) => !bool);
  const handleOpenAdd = () => setOpenAdd((bool) => !bool);
  const handleOpenDelete = () => setOpenDelete((bool) => !bool);
  
  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
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
      await modifyUserToBDD(data);
      newAlert("Les modifications ont bien été enregistrés.", 'green')
    } catch (error) {
      newAlert("Erreur lors de l'envoie des modifications", 'red')
    } 
  };

  const handlePassword = () => setDisplayPwd(!displayPwd);

  const sendPwd = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await resetPwd(passwords);
      newAlert('Le mot de passe a été mise à jour', 'green')
      setDisplayPwd(false);
    } catch (error) {
      newAlert('Erreur lors de la réinitialisation du mot de passe', 'red')
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
      value={data[name] as string}
      onChange={(e: InputEvent) => handleChange(e)}
    />
  );

  return (
    <>
    {handleErrorAndLoading()}
    {data && <main className={"sm:mx-20 mx-5"}>
      <section className={"flex flex-col justify-center items-center gap-5 mt-10"}>
        <Typography variant="h1" className={"font-bold"}>
          Profil
        </Typography>
        <Avatar src={avatar} alt="avatar" size="xxl" className={"avatar"} />
        <div className={"flex gap-5 justify-center"}>
          <div className={"chip"}>{data.projects.length} projets</div>
          <div className={"chip"}>
            {data.participations.length} collaborations
          </div>
        </div>
      </section>
      {renderAlert}
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
                {openAdd && <AddCompanyModal newAlert={newAlert} open={openAdd} handleOpen={handleOpenAdd} handleReload={handleReload}/> }

              </div>
            </div>

            <div className="mb-5">
              {data.myOwnGroups.length > 0 && data.myOwnGroups.map((group:intCompany) => (
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
               <ModifyCompanyModal newAlert={newAlert} group={group} handleReload={handleReload} /> 
                </div>
                ))
              }
              {data.myOwnGroups.length == 0  && 
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
                {openRejoin && <RejoinCompanyModal newAlert={newAlert} open={openRejoin} handleOpen={handleOpenRejoin} handleReload={handleReload}/> }
                </div>
                </div>
                <div className="mb-5">
              {data.demands && data.demands.map((demand:intDemand) => (
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
                    <QuitCompanyModal idDemand={demand.id || 0} newAlert={newAlert} open={openQuit} handleOpen={handleOpenQuit} handleReload={handleReload}/>
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
              {data.demands.length == 0 && 
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
    </main>}
    </>
  );
}
