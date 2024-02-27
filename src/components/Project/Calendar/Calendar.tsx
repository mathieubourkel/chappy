/* eslint-disable @typescript-eslint/no-explicit-any */
import Paper from "@mui/material/Paper";
import {ViewState,} from "@devexpress/dx-react-scheduler";
import {Scheduler,MonthView,Appointments,DateNavigator,Toolbar,AppointmentTooltip,Resources,} from "@devexpress/dx-react-scheduler-material-ui";
import { useFetch } from "../../../hooks/useFetch";
import { ApiPathEnum } from "../../../services/enums/api.path.enum";
import { intTaskForCalendar, intTasks } from "../../../services/interfaces/intTask";
import { DataStatusEnum } from "../../../services/enums/data.status.enum";
import { resourcesPerso } from "../../../services/utils/calendar.consts";

export default function Calendar({className}:{className:string}) {
    const currentDate = new Date();
    const {data, updateData, status, handleErrorAndLoading} = useFetch(`${ApiPathEnum.MY_TASKS}`)

    const dayDate = document.querySelectorAll('.Cell-today');
    const title = document.querySelectorAll('.css-71a9mb-MuiButtonBase-root-MuiIconButton-root, .css-vnscjq-MuiButtonBase-root-MuiButton-root');
    dayDate.forEach((td:any) => td.style.background = "rgb(126,55,47, 1)")
    title.forEach((td:any) => td.style.color = "rgb(126,55,47, 1)")
  
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
    {data && <Paper className={className} >
      <Scheduler data={data} >
        <ViewState defaultCurrentDate={currentDate} />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <Appointments />
        <Resources data={resourcesPerso} mainResourceName="ownerP" />
        <AppointmentTooltip showCloseButton showOpenButton />
      </Scheduler>
    </Paper>}
    </>
  )
}
