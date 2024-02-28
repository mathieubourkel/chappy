/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@material-tailwind/react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {Scheduler,MonthView,Appointments,DateNavigator,Toolbar,AppointmentTooltip,Resources} from "@devexpress/dx-react-scheduler-material-ui";
import { useParams } from "react-router-dom";
import { ApiPathEnum } from "../../../services/enums/api.path.enum";
import { DataStatusEnum } from "../../../services/enums/data.status.enum";
import { useFetch } from "../../../hooks/useFetch";
import { resources } from "../../../services/utils/calendar.consts";

export default function CalendarProject({ className }: {className:string}) {
  const { idProject } = useParams();
  const {data, updateData, status, handleErrorAndLoading} = useFetch(`${ApiPathEnum.TASKS}/project/${idProject}`)
  const currentDate = new Date();

  if (status === DataStatusEnum.FIRST_FETCH){
    const tmpTasks:any = []
    data.map((task:any, index:number) => {
      task.title = task.name
      task.jalons = index + 1
      tmpTasks.push(task)
    })
    updateData(tmpTasks)
  }

  return (
    <>
    {handleErrorAndLoading()}
      {data && <Card className={className}>
        <Scheduler data={data}>
          <ViewState defaultCurrentDate={currentDate} />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <Appointments />
          <Resources data={resources} mainResourceName="jalons" />
          <AppointmentTooltip showCloseButton showOpenButton />
        </Scheduler>
      </Card>}
    </>
  );
}
