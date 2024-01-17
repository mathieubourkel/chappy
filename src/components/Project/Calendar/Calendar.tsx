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
import { getTasksByUser, getTasksByUsers } from "../../../services/api/tasks";
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

// const grouping = [{resourceName: "owner"}]
type Props = {
    className: string
}

// Documentation
// https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/grouping/


export default function Calendar({className}:Props) {
  const idUser = localStorage.getItem("id");
  const [busy, setBusy] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Array<Task>>([
    { startDate: new Date(), endDate: new Date(), title: "" },
  ]);
  const currentDate = new Date();
  useEffect(() => {
    const getFetchData = async () => {
      try {
        const dataOwner = await getTasksByUser(idUser);
        const dataCollab = await getTasksByUsers(idUser);
        const tmpTasks:Array<Task> = []
        dataOwner.map((_elem: any, index: number) => {
          dataOwner[index].title = dataOwner[index].name;
          dataOwner[index].owner = 1;
          tmpTasks.push(dataOwner[index])
        });
        dataCollab.map((_elem: any, index: number) => {
          dataCollab[index].title = dataCollab[index].name;
          dataCollab[index].owner = 2;
          dataCollab[index].id = dataCollab[index].id * 4589647524
          tmpTasks.push(dataCollab[index])
        });
  
        setTasks(tmpTasks);
        
      } catch (e){
        console.log("error fetching")
      } finally {
        setBusy(false)
      }  
    }
    getFetchData();
  }, [idUser]);

  return (
    <>
    {busy ? (
        <div className="flex justify-center items-center mt-20">
          <Spinner className="h-16 w-16 text-brick-300/50" />
        </div>
      ) : (
    <Paper className={className}>
      <Scheduler
        data={tasks}
      >
        <ViewState defaultCurrentDate={currentDate} />
        {/* <GroupingState
          grouping={grouping}
          // groupOrientation={() => "Vertical"}
        /> */}
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <Appointments />
        <Resources data={resources} mainResourceName="owner" />
        {/* <IntegratedGrouping /> */}
        <AppointmentTooltip showCloseButton showOpenButton />
        {/* <GroupingPanel /> */}
      </Scheduler>
    </Paper>)}
    </>
  );
}
