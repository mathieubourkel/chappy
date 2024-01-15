/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Textarea,
  Input, Button,
} from "@material-tailwind/react";

import { intTask} from "../../../services/interfaces/intProject";
import { enumStatus } from "../../../services/interfaces/Status";
import './modal.css'

type Props = {
  task: intTask;
  handleOpenM: () => void;
  openM: boolean;
};

export default function StepDisplayTask({ task, handleOpenM, openM }: Props) {
  return (
    <Dialog
      size="sm"
      open={openM}
      handler={handleOpenM}
      className="bg-transparent shadow-none"
    >
      <Card className="custom-modal">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h3" className={"text-marine-300 text-xl font-extrabold text-center mb-5"}>
            {task.name}
          </Typography>
          <Textarea
            label="Description"
            value={task.description}
            size="lg"
            disabled
            name="description"
            id="description"
            className={"bg-select !border !border-marine-100/50"}
          />
          <Input
            label="Catégorie"
            disabled
            value={task.category.name}
            size="lg"
            name="categorie"
            id="categorie"
            className={"bg-select !border !border-marine-100/50"}
            crossOrigin={undefined}
          />
          <Input
            label="Status"
            disabled
            value={enumStatus[task.status].label}
            size="lg"
            name="status"
            id="status"
            className={"bg-select !border !border-marine-100/50"}
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
              className={"bg-select !border !border-marine-100/50"}
              crossOrigin={undefined}
            />
            <Input
              label="Date de fin"
              disabled
              value={task.endDate.toString()}
              size="lg"
              name="endDate"
              id="endDate"
              className={"bg-select !border !border-marine-100/50 mt-5 sm:mt-0"}
              crossOrigin={undefined}
            />
          </div>
          <Typography variant="h4" className={"text-marine-300 text-lg font-extrabold mt-3"}>
            Participants
          </Typography>
          <div className="flex gap-2 flex-wrap justify-center">
            {task.users.map((user: any, indexT: number) => (
                <div key={indexT}>
                    <Button
                        className={"bg-marine-300 disabled:opacity-100"}
                        size={"sm"}>
                      {user.email}
                    </Button>
                </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </Dialog>
  );
}
