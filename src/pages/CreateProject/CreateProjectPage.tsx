/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Textarea, Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  InputEvent,
  intCompany,
  intUser,
  intProject,
  intSelect,
  intUsersLight,
  intCompanies,
} from "../../services/interfaces/intProject";
import { useEffect, useState } from "react";
import { addProjectToBDD } from "../../services/api/projects";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
import { getAllCompanies, getAllUsers } from "../../services/api/users";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { enumStatus } from "../../services/interfaces/Status";
import "./CreateProject.css"
import { useFormik } from "formik";
import * as Yup from "yup";

const animatedComponents = makeAnimated();

export default function CreateProjectPage() {
  console.log("CreateProjectPage");
  const userId = localStorage.getItem("id");

  const navigate = useNavigate();
  const [users, setUsers] = useState<Array<intSelect>>([]);
  const [companies, setCompanies] = useState<Array<intSelect>>([]);
  const [form, setForm] = useState<intProject>({
    description: "a",
    budget: 0,
    status: 0,
    estimEndDate: null,
    project_steps: [],
    owner: { id: userId },
    users: [{ id: null }],
    companies: [{ id: null }],
    name: "a",
    code: randomCode(),
  });

  const ProjectSchema = Yup.object({
    description: Yup.string()
      .min(2,"too short")
      .max(50, "Votre description contient plus de 50 caractères.")
      .required("Champ requis"),
    name: Yup.string()
      .min(2,"too short")
      .max(50, "Votre nom contient plus de 50 caractères.")
      .required("Votre projet doit avoir un nom."),
  });

  const formik = useFormik({
    initialValues: {
      description: "aaa",
      budget: 0,
      status: 0,
      estimEndDate: null,
      project_steps: [],
      owner: { id: userId },
      users: [{ id: null }],
      companies: [{ id: null }],
      name: "aaa",
      code: randomCode(),
    },
    onSubmit: async (values) => {
      console.log(values);
      await addProjectToBDD(values);
      navigate("/dashboard");
    },
    validationSchema: ProjectSchema,
  });

  useEffect(() => {
    async function getUsers() {
      const result2 = await getAllCompanies();
      const result = await getAllUsers();
      const nameArray: Array<intSelect> = result2.map(
        (element: intCompany) => ({ label: element.name, value: element.id })
      );
      setCompanies(nameArray);

      const emailArray: Array<intSelect> = result.map((element: intUser) => ({
        label: element.email,
        value: element.id,
      }));
      setUsers(emailArray);
    }
    getUsers();
  }, []);

  function randomCode() {
    let nombre = "";
    const longueurNombre = 16;

    for (let i = 0; i < longueurNombre; i++) {
      const chiffreAleatoire = Math.floor(Math.random() * 10);
      nombre += chiffreAleatoire.toString();
    }

    return nombre;
  }

  const handleUsers = (value: Array<intSelect>) => {
    const goodArray: intUsersLight = value.map((element: intSelect) => ({
      id: element.value,
    }));
    setForm({ ...form, users: goodArray });
  };

  const handleCompanies = (value: Array<intSelect>) => {
    const goodArray: intCompanies = value.map((element: intSelect) => ({
      id: element.value,
    }));
    setForm({ ...form, companies: goodArray });
  };

  const handleStatus = (value: any) => {
    setForm({ ...form, status: value.value });
  };

  const handleChange = (e: InputEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   console.log(form)
  //   await addProjectToBDD(form);
  //   navigate("/dashboard");

  // }

  const handleDate = (value: any) => {
    setForm({ ...form, estimEndDate: value.startDate });
  };

  return (
    <main className="project-page sm:mx-20 mx-5 mt-10">
      <Typography variant="h1" className={"font-bold text-center"}>
        Créer un projet
      </Typography>

      <section className={"mt-5 lg:w-[55lvw] m-auto"}>
        <form onSubmit={formik.handleSubmit}>
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
            <div className="sm:flex gap-5 mb-5">
              <div className="w-full">
                <ReactSelect
                  options={enumStatus}
                  className="rounded-xl border-select"
                  placeholder="Status"
                  defaultValue={enumStatus[0]}
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
                  inputClassName="w-full p-2 rounded-md font-normal focus:ring-0 placeholder:text-black text-black border-select"
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
              <Button className={"bg-brick-400"} type="submit" size={"sm"}>
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
