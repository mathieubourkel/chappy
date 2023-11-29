/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Textarea,
  Input,
} from "@material-tailwind/react";

import { intTasks, intUser } from "../../../services/interfaces/intProject";
import { Status } from "../../../services/interfaces/Status";

type Props = {
  tasks: intTasks;
  index: number;
  handleOpenM: any;
  openM: boolean;
};

export default function StepDisplayTask({
  tasks,
  index,
  handleOpenM,
  openM,
}: Props) {
  return (
    <Dialog
      size="lg"
      open={openM}
      handler={handleOpenM}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h2" color="blue-gray">
            Afficher la tâche
          </Typography>
          <Input
            label="Nom de la tâche"
            value={tasks[index].name}
            size="lg"
            name="name"
            id="name"
            disabled
            crossOrigin={undefined}
          />
          <Textarea
            label="Description"
            value={tasks[index].description}
            size="lg"
            disabled
            name="description"
            id="description"
          />
          <Input
            label="Catégorie"
            disabled
            value={tasks[index].category.name}
            size="lg"
            name="categorie"
            id="categorie"
            crossOrigin={undefined}
          />
          <Input
            label="Status"
            disabled
            value={Status[tasks[index].status]}
            size="lg"
            name="status"
            id="status"
            crossOrigin={undefined}
          />
          <div className="sm:flex gap-3">
            <Input
              label="Date de début"
              value={tasks[index].startDate}
              size="lg"
              disabled
              name="startDate"
              id="startDate"
              crossOrigin={undefined}
            />
            <Input
              label="Date de fin"
              disabled
              value={tasks[index].endDate}
              size="lg"
              name="endDate"
              id="endDate"
              crossOrigin={undefined}
            />
          </div>
          <p>Participants</p>
          <div className="flex gap-10">
            {tasks[index].app_users.map((user: intUser, index: number) => (
              <Input
                key={index}
                label="Participants"
                disabled
                value={user.name}
                size="lg"
                name="participants"
                id="participants"
                crossOrigin={undefined}
              />
            ))}
          </div>
          <p>Commentaires</p>
            {/* {tasks[index].comments.map((comment: string, index: number) => (
              <Input
                key={index}
                label="Participants"
                disabled
                value={comment}
                size="lg"
                name="participants"
                id="participants"
                crossOrigin={undefined}
              />
            ))} */}
        </CardBody>
      </Card>
    </Dialog>
  );
}
