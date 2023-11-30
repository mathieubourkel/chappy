import {
    Input,
    Select,
    Textarea,
    Typography,
    Option, Button,
} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

export default function CreateProjectPage() {

  const status = ["En cours", "En attente", "Terminé"];

  return (
    <main className="project-page sm:mx-20 mx-5">
      <Typography variant="h1" className={"font-bold text-center"}>Créer un projet</Typography>

        <section className={"mt-5 lg:w-[55lvw] m-auto"}>
            <article>
                <Typography variant="h2" className={"text-xl font-extrabold my-10"}>Détails du projet</Typography>
                <div className="sm:flex sm:gap-x-5">
                    <div className={"mb-5 w-full"}>
                      <Input
                        label="Nom de la tâche"
                        className={"!bg-light-100"}
                        name="name"
                        id="name"
                        crossOrigin={undefined}
                      />
                    </div>
                </div>
                      <Textarea
                        label="Description"
                        className={"!bg-light-100"}
                        name="description"
                        id="description"
                      />
            </article>

            <article>
                <Typography variant="h2" className={"text-xl font-extrabold my-10"}>Mise en oeuvre</Typography>

                <div className={"mb-5 w-full"}>
                    <Input
                    label="Budget"
                    type="number"
                    className={"!bg-light-100"}
                    name="budget"
                    id="budget"
                    crossOrigin={undefined}
                  />
                </div>

                  <Select
                    label="Status"
                    className={"bg-light-100"}
                    name="status"
                    id="status"
                  >
                    {status.map((i: string, index: number) => (
                      <Option key={index} value={i}>
                        {i}
                      </Option>
                    ))}
                  </Select>

                <div className={"flex justify-center my-10"}>
                        <Button className={"bg-brick-400"}><FontAwesomeIcon icon={faPaperPlane} className={"text-sm mr-3"} /> Envoyer</Button>
                </div>
            </article>
        </section>
    </main>
  );
}
