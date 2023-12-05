/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Textarea,
  Input,
} from "@material-tailwind/react";

import { intTask} from "../../../services/interfaces/intProject";
import { enumStatus } from "../../../services/interfaces/Status";

type Props = {
  task: intTask;
  handleOpenM: () => void;
  openM: boolean;
};

export default function StepDisplayTask({ task, handleOpenM, openM }: Props) {
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
            value={task.name}
            size="lg"
            name="name"
            id="name"
            disabled
            crossOrigin={undefined}
          />
          <Textarea
            label="Description"
            value={task.description}
            size="lg"
            disabled
            name="description"
            id="description"
          />
          <Input
            label="Catégorie"
            disabled
            value={task.category.name}
            size="lg"
            name="categorie"
            id="categorie"
            crossOrigin={undefined}
          />
          <Input
            label="Status"
            disabled
            value={enumStatus[task.status].label}
            size="lg"
            name="status"
            id="status"
            crossOrigin={undefined}
          />
          <div className="sm:flex gap-3">
            <Input
              label="Date de début"
              value={task.startDate.toString()}
              size="lg"
              disabled
              name="startDate"
              id="startDate"
              crossOrigin={undefined}
            />
            <Input
              label="Date de fin"
              disabled
              value={task.endDate.toString()}
              size="lg"
              name="endDate"
              id="endDate"
              crossOrigin={undefined}
            />
          </div>
          <p>Participants</p>
          <div className="flex gap-10">
            {task.users.map((user: any) => (
              <Input
                key={user.id}
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
