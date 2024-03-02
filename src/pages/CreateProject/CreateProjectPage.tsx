/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Textarea, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { addProjectToBDD } from "../../services/api/projects";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
import { getAllCompanies, getAllUsers } from "../../services/api/users";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { Status } from "../../services/enums/status.enum";
import { FormEvent, InputEvent, intSelects } from "../../services/interfaces/generique.interface";
import { intCompany } from "../../services/interfaces/intCompany";
import { intUser } from "../../services/interfaces/intUser";
import { ManageWebSocket } from "../../services/utils/ManageWebSocket";
import MagicButton from "../../components/elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";
import { ProjectSchema } from "../../services/schemas/projet.schema";
import { useMagicForm } from "../../hooks/useMagicForm";


const animatedComponents = makeAnimated();

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
                <Input
                  label="Nom du projet"
                  className={"!bg-light-100 border-select placeholder:!text-text-100"}
                  name="name"
                  id="name"
                  crossOrigin={undefined}
                  onChange={(e: InputEvent) => handleChange(e)}
                />
                {renderErrors('name')}
              </div>
            </div>

            <Textarea
              label="Description du projet"
              className={"!bg-light-100 border-select placeholder:!text-text-100"}
              name="description"
              id="description"
              onChange={(e: any) => handleChange(e)}
            />
            {renderErrors('description')}
          </article>

          <article>
            <Typography variant="h2" className={"text-xl font-extrabold my-10"}>
              Mise en oeuvre
            </Typography>

            <div className={"mb-5 w-full"}>
              <Input
                label="Budget du projet"
                type="number"
                className={"!bg-light-100 border-select"}
                name="budget"
                id="budget"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
              {renderErrors('budget')}
            </div>
            <div className="flex gap-5 mb-5 flex-wrap">
              <div className="w-full">
                <ReactSelect
                  options={Status}
                  className="rounded-xl border-select"
                  placeholder="Status"
                  defaultValue={Status[0].label}
                  components={animatedComponents}
                  onChange={(value: any) => handleSelect(value, 'status')}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,
                      primary25: 'rgba(126,55,47, 0.2)',
                      primary:'rgba(126,55,47, 0.7)',
                      primary50: 'rgba(126,55,47, 0.3)',
                    },
                  })}
                />
                {renderErrors('status')}
              </div>
              <div className="w-full">
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-text-100 text-text-100 border-select placeholder:!text-sm"
                  onChange={(value:any) => handleDate(value, 'estimEndDate')}
                  value={{
                    startDate: form.estimEndDate,
                    endDate: form.estimEndDate,
                  }}
                  useRange={false}
                  asSingle={true}
                  inputName="rangeDate"
                  placeholder={"Choisir la date de fin estimée du projet"}
                />
                {renderErrors('estimEndDate')}
              </div>
            </div>
            <div className="my-5">
              <ReactSelect
                options={users}
                className="rounded-xl border-select"
                isMulti
                noOptionsMessage={error ? 
                  (obj: { inputValue:string } ) => obj.inputValue = "Error with fetching users data" 
                  : (obj: { inputValue:string } ) => obj.inputValue = "There is no users available" }
                placeholder="Inviter des membres sur votre projet"
                components={animatedComponents}
                onChange={(value: any) => handleMultiple(value, 'members', 'email')}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: 'rgba(126,55,47, 0.2)',
                    primary:'rgba(126,55,47, 0.7)',
                    primary50: 'rgba(126,55,47, 0.3)',
                  },
                })}
              />
            </div>
            <div>
              <ReactSelect
                options={companies}
                isMulti
                components={animatedComponents}
                placeholder="Inviter des entreprises sur votre projet"
                className={"border-select"}
                noOptionsMessage={errorCompanies ? 
                  (obj: { inputValue:string } ) => obj.inputValue = "Error with fetching companies data" 
                  : (obj: { inputValue:string } ) => obj.inputValue = "There is no companies available" }
                onChange={(value: any) => handleMultiple(value, 'companies', 'name')}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: 'rgba(126,55,47, 0.2)',
                    primary:'rgba(126,55,47, 0.7)',
                    primary50: 'rgba(126,55,47, 0.3)',
                  },
                })}
              />
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
