import {
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { intTask, intTasks, intUsers } from "../../../services/interfaces/intProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPen,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DeleteButton from "../Buttons/DeleteButton";
import { StepCreateTask } from "../Modals/StepCreateTask";

type Props = {
  tasks: intTasks;
  setTask: (tasks: intTasks) => void;
  users: intUsers;
  setUser: (user:intUsers) => void;
};

export default function Steps({ tasks, setTask, users, setUser }: Props) {

  return (
    <section className="bloc-2 mb-40">
      <div className="b2-header flex justify-between">
        <div className="b2-header-title">
          <h2>Les tâches</h2>
        </div>
        <div className="b2-header-buttons flex">
          <div>
            <StepCreateTask tasks={tasks} setTask={setTask} />
          </div>
          <div>
            <IconButton>
              <FontAwesomeIcon icon={faFilter} />
            </IconButton>
          </div>
        </div>
      </div>
      <ul className="b2-body flex flex-col gap-10 mt-5">
        {tasks.map((task: intTask, index: number) => (
            
            <div>
          <li className="flex justify-between gap-5
          p-5 rounded-xl bg-white border-solid border-4 border-b-brick-200" key={index}>
            <Link to="/project/step/task" className="flex">
            <Typography variant="h5" color="blue-gray"
             className="flex">
                <p className="border p-2 rounded-xl bg-light-200
                ">{task.categorie}</p>
              </Typography>
              <Typography variant="h5" className="p-2 text-brick-300">
                {task.name}
              </Typography>
              <Typography variant="h5" className="p-2 text-brick-300">
                {task.description}
              </Typography>
              </Link>
            <div className="pt-0 flex justify-end gap-10">
            <Typography variant="h5" className="border border-brick-300 rounded-xl p-2 text-brick-300">
                {task.status}
              </Typography>
              
                <div className="flex gap-2">

                
                <IconButton
                  variant="outlined"
                  className="text-brick-300 border-brick-300"
                >
                  <FontAwesomeIcon icon={faPen} />
                </IconButton>
                <IconButton
                  variant="outlined"
                  className="text-brick-300 border-brick-300"
                >
                  <FontAwesomeIcon icon={faStar} />
                </IconButton>
                <DeleteButton index={index} state={tasks} setState={setTask}/>
                </div>
            </div>
          </li>
          <div className="flex gap-10 mt-3">
            {users.map((user:string, index:number) => (
                <div className="flex gap-2">
                <p className="bg-white p-2 rounded-lg">{user}</p>
                <DeleteButton index={index} state={users} setState={setUser}/>
            </div>
            ))}
          </div>
          </div>
        ))}
      </ul>
    </section>
  );
}
