/* eslint-disable @typescript-eslint/no-explicit-any */
import Paper from "@mui/material/Paper";
import {
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
  DateNavigator,
  Toolbar,
  AppointmentTooltip,
  Resources,

} from "@devexpress/dx-react-scheduler-material-ui";
import { useState, useEffect } from "react";
import { getTasksByUser } from "../../../services/api/tasks";
import { Spinner } from "@material-tailwind/react";
import './calendar.css'

type Task = {
  title: string;
  startDate: Date;
  endDate: Date;
};

const primary = "rgb(47,44,54, 0.8)";
const secondary = "rgb(126,55,47,0.8)";

const resources = [
  {
    fieldName: "owner",
    title: "owner",
    instances: [
      { text: "Suivi de mes projets", id: 1, color: primary },
      { text: "Tâches qui me sont affectées", id: 2, color: secondary },
    ],
  },
];

type Props = {
    className: string
}

// Documentation
// https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/grouping/


export default function Calendar({className}:Props) {
  const idUser:string = localStorage.getItem("id") ||"";
  const [busy, setBusy] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false)
  const currentDate = new Date();
  const [tasks, setTasks] = useState<Array<Task>>([
    { startDate: currentDate, endDate: currentDate, title: "" },
  ]);
  
  useEffect(() => {
    const getFetchData = async () => {
      try {
        const dataOwner = await getTasksByUser();
        const dataCollab = await getTasksByUser();
        const tmpTasks:Array<Task> = []
        dataOwner.map((task: any) => {
          task.title = task.name;
          task.owner = 1;
          tmpTasks.push(task)
        });
        dataCollab.map((task: any) => {
          task.title = task.name;
          task.owner = 2;
          task.id = task.id * 4589647524
          tmpTasks.push(task)
        });
        setTasks(tmpTasks);  
      } catch (e){
        setError(true)
      } finally {
        setBusy(false)
      }  
    }
    getFetchData();
  }, [idUser]);

  if (error) return (<div>Error with fetching data</div>)

  return (
    <>
    {busy ? (
        <div className="flex justify-center items-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300/50" />
        </div>
      ) : (
    <Paper className={className}>
      <Scheduler data={tasks}>
        <ViewState defaultCurrentDate={currentDate} />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <Appointments />
        <Resources data={resources} mainResourceName="owner" />
        <AppointmentTooltip showCloseButton showOpenButton />
      </Scheduler>
    </Paper>)}
    </>
  );
}
