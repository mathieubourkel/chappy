/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { addProjectToBDD } from "../../services/api/projects";
import { useNavigate } from "react-router-dom";
import { getAllCompanies, getAllUsers } from "../../services/api/users";
import { Status } from "../../services/enums/status.enum";
import { FormEvent, intSelects } from "../../services/interfaces/generique.interface";
import { intCompany } from "../../services/interfaces/intCompany";
import { intUser } from "../../services/interfaces/intUser";
import { ManageWebSocket } from "../../services/utils/ManageWebSocket";
import MagicButton from "../../components/elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import { ProjectSchema } from "../../services/schemas/projet.schema";
import { useMagicForm } from "../../hooks/useMagicForm";
import SelectDate from "../../components/elements/Select/SelectDate";
import MagicInput from "../../components/elements/Input/MagicInput";
import MagicSelect from "../../components/elements/Select/MagicSelect";
import MagicMultipleSelect from "../../components/elements/Select/MagicMultipleSelect";


export default function CreateProjectPage() {
  const [error, setError] = useState<boolean>(false);
  const [errorCompanies, setErrorCompanies]= useState<boolean>(false)
  const navigate = useNavigate();
  const [users, setUsers] = useState<intSelects>([]);
  const [companies, setCompanies] = useState<intSelects>([]);
  const {form, handleChange, handleSelect, handleDate, handleMultiple, validateForm, renderErrors} = useMagicForm()

  useEffect(() => {
    const getUsers = async () =>  {
      try {
      const result = await getAllUsers();
      const emailArray:intSelects = result.data.map((element: intUser) => ({
        label: element.email,
        value: element.id,
      }));
      setUsers(emailArray);
      } catch (error) {
        setError(true)
      }
    }
    const getCompanies = async () =>  {
      try {
        const result = await getAllCompanies();
        const nameArray:intSelects = result.data.map(
          (element: intCompany) => ({ label: element.name, value: element.id })
        );
      setCompanies(nameArray);
      } catch (error) {
        setErrorCompanies(true)
      }
    }
    getCompanies()
    getUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm(ProjectSchema)) return;
    await addProjectToBDD(form);
    const tmpArray:any = []
    form.members?.map((member:any) => {
      tmpArray.push(member.id.toString())
    })
    new ManageWebSocket().sendMessage(`Vous avez été invité à rejoindre le projet ${form.name}`, tmpArray) 
    navigate("/dashboard");
  };


  return (
    <main className="sm:mx-20 mx-5 mt-10">
      <Typography variant="h1" className={"font-bold text-center"}>
        Créer un projet
      </Typography>

      <section className={"mt-5 lg:w-[55lvw] m-auto"}>
        <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>
              Détails du projet
            </Typography>
            <div className="sm:flex sm:gap-x-5">
              <div className={"mb-5 w-full"}>
                <MagicInput name="name" label="Nom du projet" handleChange={handleChange} renderErrors={renderErrors}/>
              </div>
            </div>
            <MagicInput name="description" label="Description" handleChange={handleChange} renderErrors={renderErrors} type='text' />
          </article>
          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>
              Mise en oeuvre
            </Typography>

            <div className={"mb-5 w-full"}>
            <MagicInput name='budget' label='Budget' type='number' handleChange={handleChange} renderErrors={renderErrors}/>
            </div>
            <div className="flex gap-5 mb-5 flex-wrap">
              <div className="w-full">
              <MagicSelect options={Status} handleSelect={handleSelect} label='status' placeholder='Status' renderErrors={renderErrors}/>
              </div>
              <div className="w-full">
                <SelectDate 
                value1={form.estimEndDate} handleDate={handleDate} label='estimEndDate'
                placeholder='Choisir la date de fin estimée du projet' 
                renderErrors={renderErrors}
                />
              </div>
            </div>
            <div className="my-5">
            <MagicMultipleSelect options={users} handleMultiple={handleMultiple} label='members' 
                  error={error} placeholder='Ajouter des membres à votre projet' alias='email'/>
            
            </div>
            <div>
            <MagicMultipleSelect options={companies} handleMultiple={handleMultiple} label='companies' 
                  error={errorCompanies} placeholder='Ajouter des entreprises à votre projet' alias='name' />
            </div>
            <div className={"flex justify-center my-10"}>
              <MagicButton type={ButtonTypeEnum.CREATE} />
            </div>
          </article>
        </form>
      </section>
    </main>
  );
}
