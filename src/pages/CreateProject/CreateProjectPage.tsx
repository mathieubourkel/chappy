/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Textarea, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { addProjectToBDD } from "../../services/api/projects";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
import { getAllCompanies, getAllUsers } from "../../services/api/users";
import ReactSelect from "react-select";
import * as Yup from "yup";
import makeAnimated from "react-select/animated";
import { Status } from "../../services/enums/status.enum";
import { formatDate } from "../../services/utils/FormatDate";
import { intProject } from "../../services/interfaces/intProject";
import { FormEvent, InputEvent, intSelect, intSelects } from "../../services/interfaces/generique.interface";
import { intCompany } from "../../services/interfaces/intCompany";
import { intUser } from "../../services/interfaces/intUser";
import { ManageWebSocket } from "../../services/utils/ManageWebSocket";
import MagicButton from "../../components/elements/Buttons/MagicButton";
import { ButtonTypeEnum } from "../../services/enums/button.type";


const animatedComponents = makeAnimated();

export default function CreateProjectPage() {
  const [error, setError] = useState<boolean>(false);
  const [errorCompanies, setErrorCompanies]= useState<boolean>(false)
  const navigate = useNavigate();
  const date = new Date()
  const [users, setUsers] = useState<intSelects>([]);
  const [companies, setCompanies] = useState<intSelects>([]);
  const [form, setForm] = useState<intProject>({
    name: "",
    description: "",
    budget: 0,
    status: Status[0].value,
    estimEndDate: formatDate(date),
    steps: [],
    owner: {id:0},
    members: [],
    companies: [],
    code: '',
  });

  const projectSchema = Yup.object().shape({
    name: Yup.string().max(50, "Pas plus de 50 charac").required("Le nom du projet est requis"),
    description: Yup.string().max(300, "pas plus de 300").required("La description du projet est requise"),
    budget: Yup.number().required("Le budget du projet est requis"),
    status: Yup.number().required("Le statut du projet est requis")
  });

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

  const handleUsers = (value: intSelects) => {
    console.log(value)
    const goodArray: any = value.map((element: intSelect) => ({id:element.value, email: element.label}));
    setForm({ ...form, members: goodArray });
  };

  const handleCompanies = (value: intSelects) => {
    const goodArray: any = value.map((element: intSelect) => (element.value));
    setForm({ ...form, companies: goodArray });
  };

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value.value });
  };

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    projectSchema
      .validate(form)
      .then(async () => {
        await addProjectToBDD(form);
        const tmpArray:any = []
        form.members?.map((member:any) => {
          tmpArray.push(member.id.toString())
        })

        new ManageWebSocket().sendMessage(`Vous avez été invité à rejoindre le projet ${form.name}`, tmpArray) 
        navigate("/dashboard");
      })
      .catch((validationError) => {
        alert(validationError.errors);
      });
  };

  const handleDate = (value: any) => {
    console.log(value)
    setForm({ ...form, estimEndDate: value.startDate });
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
              </div>
            </div>

            <Textarea
              label="Description du projet"
              className={"!bg-light-100 border-select placeholder:!text-text-100"}
              name="description"
              id="description"
              onChange={(e: any) => handleChange(e)}
            />
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
            </div>
            <div className="flex gap-5 mb-5 flex-wrap">
              <div className="w-full">
                <ReactSelect
                  options={Status}
                  className="rounded-xl border-select"
                  placeholder="Status"
                  defaultValue={Status[0].label}
                  components={animatedComponents}
                  onChange={(value: any) => handleStatus(value)}
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
              <div className="w-full">
                <Datepicker
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-text-100 text-text-100 border-select placeholder:!text-sm"
                  onChange={handleDate}
                  value={{
                    startDate: form.estimEndDate,
                    endDate: form.estimEndDate,
                  }}
                  useRange={false}
                  asSingle={true}
                  inputName="rangeDate"
                  placeholder={"Choisir la date de fin estimée du projet"}
                />
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
                onChange={(value: any) => handleUsers(value)}
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
                onChange={(value: any) => handleCompanies(value)}
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
