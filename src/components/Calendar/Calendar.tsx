/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@material-tailwind/react";
import {ViewState,} from "@devexpress/dx-react-scheduler";
import {Scheduler,MonthView,Appointments,DateNavigator,Toolbar,AppointmentTooltip,Resources,} from "@devexpress/dx-react-scheduler-material-ui";
import { useFetch } from "../../hooks/useFetch";
import { ApiPathEnum } from "../../services/enums/api.path.enum";
import { intTaskForCalendar, intTasks } from "../../services/interfaces/intTask";
import { DataStatusEnum } from "../../services/enums/data.status.enum";
import { resourcesPerso } from "../../services/utils/calendar.consts";

export default function Calendar({className}:{className:string}) {
    const currentDate = new Date();
    const {data, updateData, status, handleErrorAndLoading} = useFetch(`${ApiPathEnum.MY_TASKS}`)
  
    if (status === DataStatusEnum.FIRST_FETCH){
        const tmpTasks:intTasks = []
        data.map((task:intTaskForCalendar) => {
        task.title = task.name
        task.ownerP = 1;
        tmpTasks.push(task)
        })
        
        updateData(tmpTasks)
    }
  return (
    <>
    {handleErrorAndLoading()}
    {data && <Card className={className} >
      <Scheduler data={data} >
        <ViewState defaultCurrentDate={currentDate} />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <Appointments />
        <Resources data={resourcesPerso} mainResourceName="ownerP" />
        <AppointmentTooltip showCloseButton showOpenButton />
      </Scheduler>
    </Card>}
    </>
  )
}
