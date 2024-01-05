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

type Task = {
  title: string;
  startDate: Date;
  endDate: Date;
};

type Props = {
  className: string;
};

const blue = "rgba(57,81,159,0.3)";
const orange = "rgba(117,40,10,0.3)";
const red = "rgba(255,0,0,0.3)";
const yellow = "rgba(255,153,0,0.3)";
const green = "rgba(107,138,69,0.3)";
const purple = "rgba(56,34,84,0.3)";

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

  // Documentation
// https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/grouping/


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
      dataOwner.map((task:any, index:number) => {
            task.title = task.name
            task.jalons = index + 1
            tmpTasks.push(task)
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
          <Spinner className="h-16 w-16 text-brick-300" />
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
