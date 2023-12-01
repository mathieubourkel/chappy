/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Input,
  Textarea,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  FormEvent,
  InputEvent,
  intCompany,
  intMember,
  intProject,
} from "../../services/interfaces/intProject";
import { useEffect, useState } from "react";
import { addProjectToBDD } from "../../services/api/projects";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
import { getAllCompanies, getAllUsers } from "../../services/api/users";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { Status2 } from "../../services/interfaces/Status";

type intSelect = {
  value: number;
  label: string;
};

export default function CreateProjectPage() {
  console.log("CreateProjectPage");

  const animatedComponents = makeAnimated();
  let tmpStatus: number = 0;
  const navigate = useNavigate();
  const [users, setUsers] = useState<Array<intSelect>>([]);
  const [companies, setCompanies] = useState<Array<intSelect>>([]);
  const [form, setForm] = useState<intProject>({
    description: "",
    budget: 0,
    status: 0,
    estimEndDate: null,
    project_steps: [],
    app_user: { id: 1 },
    app_users: [{ id: undefined }],
    companies: [{ id: undefined }],
    name: "",
  });

  useEffect(() => {
    async function getUsers() {
      const result = await getAllUsers();
      const result2 = await getAllCompanies();
      const emailArray: Array<intSelect> = [];
      const nameArray: Array<intSelect> = [];
      result.map((element: intMember) => {
        emailArray.push({ label: element.email, value: element.id });
      });
      result2.map((element: intCompany) => {
        nameArray.push({ label: element.name, value: element.id });
      });
      setUsers(emailArray);
      setCompanies(nameArray);
    }
    getUsers();
  }, []);

  function handleUsers(value: Array<intSelect>) {
    const goodArray: Array<{ id: number }> = [];
    value.map((element: intSelect) => {
      goodArray.push({ id: element.value });
    });
    setForm({ ...form, app_users: goodArray });
  }

  function handleCompanies(value: Array<intSelect>) {
    const goodArray: Array<{ id: number }> = [];
    value.map((element: intSelect) => {
      goodArray.push({ id: element.value });
    });
    setForm({ ...form, companies: goodArray });
  }

  function handleStatus(value: number) {
    tmpStatus = value;
    setForm({ ...form, status: value });
  }

  function handleChange(e: InputEvent) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addProjectToBDD(form);
    navigate("/dashboard");
  }

  const handleDate = (value: any) => {
    setForm({ ...form, estimEndDate: value.startDate });
  };

  return (
    <main className="project-page sm:mx-20 mx-5">
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
                  className={"!bg-light-100"}
                  name="name"
                  id="name"
                  crossOrigin={undefined}
                  onChange={(e: InputEvent) => handleChange(e)}
                />
              </div>
            </div>
            <Textarea
              label="Description du projet"
              className={"!bg-light-100"}
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
                className={"!bg-light-100"}
                name="budget"
                id="budget"
                crossOrigin={undefined}
                onChange={(e: InputEvent) => handleChange(e)}
              />
            </div>
            <div className="sm:flex gap-5 mb-5">
              <Select
                className={"bg-light-100"}
                name="status"
                id="status"
                value={tmpStatus.toString()}
                label="Status"
                onChange={(value: any) => handleStatus(value)}
              >
                {Status2.map(
                  (i: { id: number; name: string }, index: number) => (
                    <Option key={index} value={i.id.toString()}>
                      {i.name}
                    </Option>
                  )
                )}
              </Select>
              <Datepicker
                inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black"
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
            <div className="my-5">
              <ReactSelect
                options={users}
                className="rounded-xl"
                isMulti
                placeholder="Inviter des membres sur votre projet"
                components={animatedComponents}
                onChange={(value: any) => handleUsers(value)}
              />
            </div>
            <div>
              <ReactSelect
                options={companies}
                isMulti
                components={animatedComponents}
                placeholder="Inviter des entreprises sur votre projet"
                onChange={(value: any) => handleCompanies(value)}
              />
            </div>

            <div className={"flex justify-center my-10"}>
              <Button className={"bg-brick-400"} type="submit">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className={"text-sm mr-3"}
                />{" "}
                Envoyer
              </Button>
            </div>
          </article>
        </form>
      </section>
    </main>
  );
}
