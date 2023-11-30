import {
  Card,
  CardBody,
  Input,
  Select,
  Textarea,
  Typography,
  Option,
} from "@material-tailwind/react";

export default function CreateProjectPage() {

  const status = ["En cours", "En attente", "Terminé"];
  console.log('CreateProjectPage')
  
  return (
    <main className="project-page sm:mx-20 mx-5">
      <Card className="mx-auto w-full">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h2" color="blue-gray">
            Créer un projet
          </Typography>
          <Input
            label="Nom de la tâche"
            size="lg"
            name="name"
            id="name"
            crossOrigin={undefined}
          />
          <Textarea
            label="Description"
            size="lg"
            name="description"
            id="description"
          />
          <Input
            label="Budget"
            type="number"
            size="lg"
            name="budget"
            id="budget"
            crossOrigin={undefined}
          />
          <Select
            label="Status"
            size="lg"
            name="status"
            id="status"
          >
            {status.map((i: string, index: number) => (
              <Option key={index} value={i}>
                {i}
              </Option>
            ))}
          </Select>
        </CardBody>
      </Card>
    </main>
  );
}
