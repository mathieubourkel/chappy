/* eslint-disable @typescript-eslint/no-explicit-any */
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
  DateNavigator,
  Toolbar,
  AppointmentTooltip,
  Resources
} from "@devexpress/dx-react-scheduler-material-ui";
import { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import { getTasksByProjectId } from "../../../services/api/tasks";
import { useParams } from "react-router-dom";
import { blue, orange, red, yellow, green, purple} from "@mui/material/colors";

type Task = {
  title: string;
  startDate: Date;
  endDate: Date;
};

type Props = {
  className: string;
};

const resources = [
    {
      fieldName: "jalons",
      title: "Jalons",
      instances: [
        { text: "Jalon1", id: 1, color: blue },
        { text: "Jalon2", id: 2, color: orange },
        { text: "Jalon3", id: 3, color: red },
        { text: "Jalon4", id: 4, color: yellow },
        { text: "Jalon5", id: 5, color: green },
        { text: "Jalon6", id: 6, color: purple },
      ],
    },
  ];

export default function CalendarProject({ className }: Props) {
  const { idProject } = useParams();
  const [busy, setBusy] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Array<Task>>([
    { startDate: new Date(), endDate: new Date(), title: "" },
  ]);
  const currentDate = new Date();
  useEffect(() => {
    async function getFetchData() {
      const dataOwner = await getTasksByProjectId(idProject);
      const tmpTasks:any = []
      dataOwner.map((_jalon:any, index:number) => {
        dataOwner[index].step_tasks.map((task:any) => {
            task.title = task.name
            task.jalons = index + 1
            tmpTasks.push(task)
        })
      })
      setTasks(tmpTasks);
      setBusy(false);
    }
    getFetchData();
  }, [idProject]);

  return (
    <>
      {busy ? (
        <div className="flex justify-center mt-20">
          <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
      ) : (
        <Paper className={className}>
          <Scheduler data={tasks}>
            <ViewState defaultCurrentDate={currentDate} />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <Appointments />
            <Resources data={resources} mainResourceName="jalons" />
            <AppointmentTooltip showCloseButton showOpenButton />
          </Scheduler>
        </Paper>
      )}
    </>
  );
}
